'use client';

import { JWT_DATE_CLAIMS } from '../../../data/jwt.data';
import { formatDateTime, formatRelative } from '../../../helpers/time.helpers';

interface Props {
  payload: Record<string, unknown>;
  /** The reader's time zone, once the client has resolved it. */
  timeZone: string;
}

interface DateClaim {
  name: string;
  seconds: number;
  date: Date;
}

/**
 * Function to collect the claims that carry a Unix timestamp
 **/
const getDateClaims = (payload: Record<string, unknown>): DateClaim[] =>
  JWT_DATE_CLAIMS.filter((name) => typeof payload[name] === 'number').map((name) => {
    const seconds = payload[name] as number;

    return { name, seconds, date: new Date(seconds * 1000) };
  });

/**
 * Component representing a token's timestamp claims as readable dates
 **/
export default function JwtClaimDates({ payload, timeZone }: Props) {
  const claims = getDateClaims(payload);

  if (!claims.length) return null;

  return (
    <div className='space-y-3 text-left'>
      <span className='block text-sm font-medium text-zinc-600 dark:text-zinc-400'>Timestamps</span>

      {claims.map((claim) => (
        <div
          key={claim.name}
          className='rounded-xl border border-zinc-200 px-3.5 py-3 dark:border-zinc-800'>
          <div className='flex items-baseline justify-between gap-2'>
            <span className='font-mono text-sm font-semibold text-amber-700 dark:text-amber-500'>
              {claim.name}
            </span>
            <span className='font-mono text-xs text-zinc-400 dark:text-zinc-500'>
              {claim.seconds}
            </span>
          </div>
          <p className='mt-1 font-mono text-sm text-zinc-900 dark:text-zinc-100'>
            {formatDateTime(claim.date, 'UTC')} UTC
          </p>
          <p className='text-xs text-zinc-500 dark:text-zinc-400'>
            {formatDateTime(claim.date)}
            {timeZone && ` · ${timeZone}`} · {formatRelative(claim.date)}
          </p>
        </div>
      ))}
    </div>
  );
}
