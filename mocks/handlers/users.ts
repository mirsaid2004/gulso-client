import { http, HttpResponse } from "msw";
import { baseUrl } from "../instance";
import { db } from "../db";

const CURRENT_USER_ID = 123;

function currentUser() {
  return db.users.find((u) => u.id === CURRENT_USER_ID);
}

export const userHandlers = [
  // GET /api/v1/users/me
  http.get(`${baseUrl}/users/me`, () => {
    return HttpResponse.json({ success: true, data: currentUser() });
  }),

  // PATCH /api/v1/users/me
  http.patch(`${baseUrl}/users/me`, async ({ request }) => {
    const updates = (await request.json()) as Record<string, unknown>;
    const user = Object.assign(currentUser(), updates);
    return HttpResponse.json({ success: true, data: user });
  }),
];
