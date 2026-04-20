import { http, HttpResponse } from "msw";

export const getTemp1 = http.get("https://api.example.com/user", () => {
  return HttpResponse.json({
    id: "abc-123",
    firstName: "John",
    lastName: "Maverick",
  });
});
