// Bcrypt off the main thread. Plain JS: a bundled worker needs a runtime it never gets here.
// Sync API on purpose — the async one yields via `setTimeout` and pays the timer clamp.
// Message contract: `src/app/(page)/types/bcrypt.types.ts`.

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
