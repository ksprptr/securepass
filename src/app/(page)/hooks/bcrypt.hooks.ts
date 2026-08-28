'use client';

import { BcryptRequest, BcryptResponse } from '../types/bcrypt.types';
import { useCallback, useEffect, useRef } from 'react';

interface BcryptHashInput {
  action: 'hash';
  text: string;
  rounds: number;
}

interface BcryptVerifyInput {
  action: 'verify';
  text: string;
  hash: string;
}

type Request = BcryptHashInput | BcryptVerifyInput;

/** Static worker, so the URL is a plain path — see `public/workers/bcrypt.worker.js`. */
const WORKER_URL = '/workers/bcrypt.worker.js';

/** How long to wait for the worker's handshake before giving up on it. */
const STARTUP_TIMEOUT_MS = 5000;

/**
 * Function to run bcrypt on the main thread when the worker is unavailable
 **/
// Imported on demand, so the fallback costs nothing unless a browser actually blocks workers.
const runOnMainThread = async (id: number, request: Request): Promise<BcryptResponse> => {
  const { compareSync, hashSync } = await import('bcryptjs');

  try {
    return request.action === 'hash'
      ? { id, hash: hashSync(request.text, request.rounds) }
      : { id, matches: compareSync(request.text, request.hash) };
  } catch (exception) {
    return { id, error: exception instanceof Error ? exception.message : 'Bcrypt failed.' };
  }
};

/**
 * Hook that runs bcrypt in a worker, so a high cost factor never freezes the page
 **/
export function useBcrypt() {
  const ready = useRef<Promise<Worker | null> | null>(null);
  const nextId = useRef(0);

  useEffect(() => {
    // Spun up once and kept warm: loading the module costs more than a cost-10 hash takes.
    // Served straight from `public/`, not bundled: Turbopack compiles a `new URL(…, import.meta
    // .url)` worker into a chunk that needs its runtime, which never boots inside the worker.
    const instance = new Worker(WORKER_URL);

    let timeout: ReturnType<typeof setTimeout> | undefined;

    // Resolves to null on failure rather than rejecting: React's development double-mount
    // terminates the first worker before it can answer, and a rejection nobody awaits reaches
    // the user as an unhandled promise rejection in the dev overlay.
    ready.current = new Promise<Worker | null>((resolve) => {
      timeout = setTimeout(() => resolve(null), STARTUP_TIMEOUT_MS);

      instance.addEventListener('message', ({ data }: MessageEvent<BcryptResponse>) => {
        if (!data?.ready) return;

        clearTimeout(timeout);
        resolve(instance);
      });

      instance.addEventListener('error', () => {
        clearTimeout(timeout);
        resolve(null);
      });
    });

    return () => {
      clearTimeout(timeout);
      ready.current = null;
      instance.terminate();
    };
  }, []);

  return useCallback(async (request: Request): Promise<BcryptResponse> => {
    nextId.current += 1;
    const id = nextId.current;
    const instance = ready.current ? await ready.current : null;

    // No worker (blocked, still booting on an unmounted instance, or too slow to start).
    if (!instance) {
      return runOnMainThread(id, request);
    }

    return new Promise((resolve, reject) => {
      // Aborting drops both listeners at once, so neither has to name the other.
      const settled = new AbortController();
      const { signal } = settled;

      instance.addEventListener(
        'message',
        ({ data }: MessageEvent<BcryptResponse>) => {
          // Responses from an earlier request are stale — the caller already moved on.
          if (data.id !== id) return;

          settled.abort();
          resolve(data);
        },
        { signal },
      );

      instance.addEventListener(
        'error',
        () => {
          settled.abort();
          reject(new Error('The bcrypt worker crashed.'));
        },
        { signal },
      );

      instance.postMessage({ id, ...request } as BcryptRequest);
    });
  }, []);
}
