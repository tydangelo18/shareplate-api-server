import { Request, Response } from "express";
import { login } from "@controllers/authController";
import * as authService from "@services/authService";

describe("login Controller", () => {
  it("should return 200 and a success message when the user is logged in", async () => {
    jest.spyOn(authService, "login").mockResolvedValueOnce({
      token: "mockToken123",
      user: {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
      },
    });

    const req = {
      body: {
        email: "john.doe@example.com",
        password: "Password123!",
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await login(req, res, jest.fn());

    expect(authService.login).toHaveBeenCalledWith(
      req.body.email,
      req.body.password
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful",
      token: "mockToken123",
      user: {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
      },
    });
  });

  it("should return 400 and an error message when email or password is missing", async () => {
    const reqWithoutEmail = {
      body: {
        password: "Password123!",
      },
    } as Request;

    const reqWithoutPassword = {
      body: {
        email: "john.doe@example.com",
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await login(reqWithoutEmail, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Email and password are required",
    });

    await login(reqWithoutPassword, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Email and password are required",
    });
  });

  it("should return 401 and an error message when the email or password is incorrect", async () => {
    jest
      .spyOn(authService, "login")
      .mockRejectedValueOnce(new Error("Invalid email or password"));

    const req = {
      body: {
        email: "wrong.email@example.com",
        password: "WrongPassword!",
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await login(req, res, jest.fn());

    expect(authService.login).toHaveBeenCalledWith(
      req.body.email,
      req.body.password
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid email or password",
    });
  });
});
