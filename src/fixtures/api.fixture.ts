import { test as base, expect } from '@playwright/test';
import { AuthClient } from '../adapters/api/auth.client';
import { BookingClient } from '../adapters/api/booking.client';
import { getApiCredentials } from '../data/booking.data';
import type { Credentials } from '../types/booking.types';

type ApiFixtures = {
  credentials: Credentials;
  authClient: AuthClient;
  bookingClient: BookingClient;
};

/**
 * `test`-scoped fixtures (default): each test gets fresh instances,
 * with no shared state. `request` already carries the baseURL of the 'api' project.
 */
export const test = base.extend<ApiFixtures>({
  credentials: async ({}, use) => {
    await use(getApiCredentials());
  },
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },
  bookingClient: async ({ request }, use) => {
    await use(new BookingClient(request));
  },
});

export { expect };
