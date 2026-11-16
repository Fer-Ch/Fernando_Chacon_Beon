import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { Booking } from '../../types/booking.types';

/**
 * HTTP adapter for /booking. Each method = one request, returns the raw APIResponse.
 * It neither validates nor extracts data: that (status, bookingid, chaining) lives in the test.
 * The token is received as a parameter; the client keeps no state between calls.
 */
export class BookingClient {
  constructor(private readonly request: APIRequestContext) {}

  create(booking: Booking): Promise<APIResponse> {
    return this.request.post('/booking', { data: booking });
  }

  get(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  update(id: number, booking: Booking, token: string): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      data: booking,
      headers: { Cookie: `token=${token}` },
    });
  }

  delete(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, {
      headers: { Cookie: `token=${token}` },
    });
  }
}
