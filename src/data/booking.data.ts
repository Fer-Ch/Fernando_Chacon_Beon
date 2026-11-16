import type { Booking, Credentials } from '../types/booking.types';

/**
 * Booking payload with values unique per call, so tests are repeatable
 * and don't collide across parallel runs.
 * `overrides` lets each test change only what matters to it.
 */
export function buildBooking(overrides: Partial<Booking> = {}): Booking {
  const suffix = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  return {
    firstname: `Test-${suffix}`,
    lastname: 'Candidate',
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
    additionalneeds: 'Breakfast',
    ...overrides,
  };
}

/** Credentials from .env; fails fast and clearly if missing (nothing hardcoded in tests). */
export function getApiCredentials(): Credentials {
  const { API_USERNAME, API_PASSWORD } = process.env;
  if (!API_USERNAME || !API_PASSWORD) {
    throw new Error('Missing API_USERNAME / API_PASSWORD. Copy .env.example to .env and fill it in.');
  }
  return { username: API_USERNAME, password: API_PASSWORD };
}
