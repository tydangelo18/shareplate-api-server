import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { errorHandler } from "@middlewares/errorHandler";

describe("errorHandler middleware", () => {
  const app = express();

  app.get("/test-error", (_req: Request, _res: Response, next: NextFunction) => {
    const error = new Error("Test error");
    next(error);
  });

  app.use(errorHandler);

  it("should handle errors and return 500 with the correct message", async () => {
    const response = await request(app).get("/test-error");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});
