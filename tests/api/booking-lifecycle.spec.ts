import { test, expect } from '../../src/fixtures/api.fixture';
import { buildBooking } from '../../src/data/booking.data';

// A single serial lifecycle test: each step depends on the previous one (token, bookingid).
// At most 2 expects: each step's result is recorded and asserted at the end (status and data).
test.describe('Booking lifecycle', () => {
  test('create -> read -> update -> delete -> 404', async ({ authClient, bookingClient, credentials }) => {
    const booking = buildBooking();
    const newCheckout = '2026-12-10';

    const authRes = await authClient.createToken(credentials);
    const { token } = await authRes.json();

    const createRes = await bookingClient.create(booking);
    const { bookingid } = await createRes.json();

    let deleted = false;
    try {
      const readRes = await bookingClient.get(bookingid);
      const readBody = await readRes.json();

      const updateRes = await bookingClient.update(
        bookingid,
        { ...booking, bookingdates: { checkin: booking.bookingdates.checkin, checkout: newCheckout } },
        token,
      );
      const afterUpdateBody = await (await bookingClient.get(bookingid)).json();

      const deleteRes = await bookingClient.delete(bookingid, token);
      deleted = deleteRes.status() === 201;
      const afterDeleteRes = await bookingClient.get(bookingid);

      expect(
        {
          auth: authRes.status(),
          create: createRes.status(),
          read: readRes.status(),
          update: updateRes.status(),
          delete: deleteRes.status(),
          afterDelete: afterDeleteRes.status(),
        },
        'status of each lifecycle step',
      ).toEqual({ auth: 200, create: 200, read: 200, update: 200, delete: 201, afterDelete: 404 });

      expect(
        { token, bookingid, readBody, checkoutAfterUpdate: afterUpdateBody.bookingdates.checkout },
        'data returned at each step',
      ).toMatchObject({
        token: expect.any(String),
        bookingid: expect.any(Number),
        readBody: { ...booking },
        checkoutAfterUpdate: newCheckout,
      });
    } finally {
      // Best-effort cleanup; does not hide the original failure (the try error propagates).
      if (!deleted) await bookingClient.delete(bookingid, token).catch(() => {});
    }
  });
});
