import request from "supertest";
import app from "../app.js";

describe("/api/rates endpoints", () => {
  test("GET /api/rates/latest Should return the latest exchange rate", async () => {
    const res = await request(app).get("/api/rates/latest");
    expect(res.statusCode).toBe(200);
  });

  test("GET /api/rates/2025-08-27 Should return the exchange rate for the specified date", async () => {
    const res = await request(app).get("/api/rates/2025-08-27");
    expect(res.statusCode).toBe(200);
  });

  test("GET /api/rates/ Should return the 404 Not Found Error", async () => {
    const res = await request(app).get("/api/rates/");
    expect(res.statusCode).toBe(404);
  });

  test("GET /api/rates/invalid Should return invalid date format error", async () => {
    const res = await request(app).get("/api/rates/invalid");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      date: null,
      rates: [],
      message: "Invalid date format. Expected YYYY-MM-DD or 'latest'."
    });
  });
});