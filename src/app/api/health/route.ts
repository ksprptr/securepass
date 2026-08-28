import { NextResponse } from 'next/server';

/**
 * Liveness endpoint (`GET /api/health`) — the app is client-side, so there is nothing to probe
 **/
export function GET(): NextResponse {
  return NextResponse.json({ status: 'ok' }, { headers: { 'Cache-Control': 'no-store' } });
}
