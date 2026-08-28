import { JWT_ALGORITHMS, JwtAlgorithm } from '../enums/tools.enums';
import { SelectOption } from '../types/tools.types';

/** HMAC is the only family here — RSA/EC signing needs a private key, which this app never holds. */
export const JWT_ALGORITHM_OPTIONS: SelectOption<JwtAlgorithm>[] = [
  { value: JWT_ALGORITHMS.HS256, label: 'HS256', hint: 'HMAC with SHA-256. The common default.' },
  { value: JWT_ALGORITHMS.HS384, label: 'HS384', hint: 'HMAC with SHA-384.' },
  { value: JWT_ALGORITHMS.HS512, label: 'HS512', hint: 'HMAC with SHA-512.' },
];

/** Claims rendered as a human date next to their raw value */
export const JWT_DATE_CLAIMS = ['exp', 'iat', 'nbf', 'auth_time', 'updated_at'];

export const DEFAULT_JWT_HEADER = JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2);

export const DEFAULT_JWT_PAYLOAD = JSON.stringify(
  { sub: '1234567890', name: 'John Doe', admin: false, iat: 1700000000, exp: 1900000000 },
  null,
  2,
);

export const DEFAULT_JWT_SECRET = 'your-256-bit-secret';
