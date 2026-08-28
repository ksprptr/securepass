import { toBase64, toHex } from '@/common/utils/bytes.functions';

export interface GeneratedSecret {
  hex: string;
  base64: string;
  bytes: number;
}

/**
 * Function to generate a random secret of the requested bit length
 **/
export const generateSecret = (bits: number): GeneratedSecret => {
  const bytes = crypto.getRandomValues(new Uint8Array(bits / 8));

  return { hex: toHex(bytes), base64: toBase64(bytes), bytes: bytes.length };
};
