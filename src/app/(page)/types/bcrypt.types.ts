interface BcryptRequestBase {
  /** Correlates a response with its request, so a stale reply is ignored. */
  id: number;
}

interface BcryptHashRequest extends BcryptRequestBase {
  action: 'hash';
  text: string;
  rounds: number;
}

interface BcryptVerifyRequest extends BcryptRequestBase {
  action: 'verify';
  text: string;
  hash: string;
}

export type BcryptRequest = BcryptHashRequest | BcryptVerifyRequest;

export interface BcryptResponse {
  /** `0` marks the worker's startup handshake, which belongs to no request. */
  id: number;
  ready?: boolean;
  hash?: string;
  matches?: boolean;
  error?: string;
}
