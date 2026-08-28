'use client';

import { COPIED_RESET_MS } from '../data/tools.data';
import { useEffect, useRef, useState } from 'react';

interface Clipboard {
  copied: boolean;
  copy: (value: string) => Promise<void>;
}

/**
 * Hook that copies text and reports the short-lived "Copied" confirmation
 **/
export function useClipboard(): Clipboard {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => clearTimeout(timeout.current ?? undefined), []);

  const copy = async (value: string) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API unavailable or blocked — nothing else to fall back to.
      return;
    }

    setCopied(true);
    clearTimeout(timeout.current ?? undefined);
    timeout.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
  };

  return { copied, copy };
}
