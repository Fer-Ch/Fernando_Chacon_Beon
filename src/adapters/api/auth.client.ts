import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { Credentials } from '../../types/booking.types';

/** HTTP adapter for /auth. Returns the raw response; does NOT extract the token (candidate TODO in the test). */
export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  createToken(credentials: Credentials): Promise<APIResponse> {
    return this.request.post('/auth', { data: credentials });
  }
}
