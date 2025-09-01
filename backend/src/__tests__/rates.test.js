import request from "supertest";
import app from "../app.js";

describe("/api/rates endpoints", () => {
  test("GET /api/rates/latest 应返回最新汇率", async () => {
    const res = await request(app).get("/api/rates/latest");
    console.log("1 : " ,res.body);
    expect(res.statusCode).toBe(200);
  });

  test("GET /api/rates/2025-08-27 应返回指定日期汇率", async () => {
    const res = await request(app).get("/api/rates/2025-08-27");
    console.log("2 : " ,res.body);
    expect(res.statusCode).toBe(200);
  });
});