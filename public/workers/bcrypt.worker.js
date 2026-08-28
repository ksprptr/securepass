/**
 * Bcrypt off the main thread. Plain JS on purpose — the bundler never touches this file.
 *
 * Two reasons it lives here instead of in `src/`:
 *  - Turbopack compiles `new Worker(new URL('./x.ts', import.meta.url))` into a chunk that needs
 *    its runtime to bootstrap, so the worker loaded without error and then ignored every message.
 *  - The synchronous bcrypt API is the fast one: the async variant yields between chunks through
 *    `setTimeout`, which on the main thread costs the timer clamp (a cost-12 hash measured 1.1 s
 *    that way against ~200 ms of real work). A worker may block, so it runs at full speed.
 *
 * Message contract: `src/app/(page)/types/bcrypt.types.ts`.
 */

importScripts('/vendor/bcrypt.umd.js');

self.onmessage = ({ data }) => {
  try {
    if (data.action === 'hash') {
      self.postMessage({ id: data.id, hash: self.bcrypt.hashSync(data.text, data.rounds) });
    } else {
      self.postMessage({ id: data.id, matches: self.bcrypt.compareSync(data.text, data.hash) });
    }
  } catch (exception) {
    self.postMessage({ id: data.id, error: exception.message || 'Bcrypt failed.' });
  }
};

// Requests posted before this script has run are dropped, so the hook waits for this handshake.
self.postMessage({ id: 0, ready: true });
