import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import request from "supertest";
import { authenticateToken } from "@middlewares/authMiddleware";
import { JWT_SECRET } from "@utils/jwt";

describe("authenticateToken middleware", () => {
  const app = express();

  app.get("/protected", authenticateToken, (req: Request, res: Response) => {
    res.status(200).json({ message: "Access granted", user: req.body });
  });

  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/protected");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Token is required" });
  });

  it("should return 403 if an invalid token is provided", async () => {
    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer invalid_token");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Invalid Token" });
  });

  it("should allow access if a valid token is provided", async () => {
    const user = { id: 1, name: "Test User" };
    const token = jwt.sign(user, JWT_SECRET);
    const decodedUser = jwt.verify(token, JWT_SECRET);

    const response = await request(app)
      .get("/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Access granted",
      user: decodedUser, // Includes `iat`
    });
  });
});
