import { Request, Response } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "@controllers/userController";
import * as userService from "@services/userService";
import { User } from "@interfaces/user";

describe("createUser Controller", () => {
  it("should return 201 and a success message when the user is created", async () => {
    jest.spyOn(userService, "registerUser").mockResolvedValueOnce();

    const req = {
      body: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "Password123!",
        profile_picture: "profile.jpg",
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createUser(req, res, jest.fn());

    expect(userService.registerUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created successfully",
    });
  });

  it("should return 500 and an error message when the service throws an error", async () => {
    jest
      .spyOn(userService, "registerUser")
      .mockRejectedValueOnce(new Error("Service error"));

    const req = {
      body: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "Password123!",
        profile_picture: "profile.jpg",
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Service error" });
  });
});

describe("getAllUsers", () => {
  it("should return 200 and a list of users", async () => {
    const mockUsers = [{ id: 1, name: "John Doe" }] as unknown as User[];
    jest.spyOn(userService, "getUsers").mockResolvedValueOnce(mockUsers);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getAllUsers(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it("should return 404 if no users are found", async () => {
    jest.spyOn(userService, "getUsers").mockResolvedValueOnce(null);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getAllUsers(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Users not found" });
  });
});

describe("getUserById", () => {
  it("should return 200 and a user object", async () => {
    const mockUser = { id: 1, name: "John Doe" } as unknown as User;
    jest.spyOn(userService, "getUserById").mockResolvedValueOnce(mockUser);

    const req = { params: { id: "1" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should return 404 if the user is not found", async () => {
    jest.spyOn(userService, "getUserById").mockResolvedValueOnce(null);

    const req = { params: { id: "1" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });
});

describe("updateUser", () => {
  it("should return 200 and a success message when the user is updated", async () => {
    jest.spyOn(userService, "updateUserById").mockResolvedValueOnce();

    const req = {
      params: { id: "1" },
      body: { name: "Updated Name" },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await updateUser(req, res, jest.fn());

    expect(userService.updateUserById).toHaveBeenCalledWith("1", {
      name: "Updated Name",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User 1 updated successfully",
    });
  });
});

describe("deleteUser", () => {
  it("should return 200 and a success message when the user is deleted", async () => {
    jest.spyOn(userService, "deleteUserById").mockResolvedValueOnce();

    const req = { params: { id: "1" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await deleteUser(req, res, jest.fn());

    expect(userService.deleteUserById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User 1 deleted successfully",
    });
  });

  it("should return 500 if there is an error during deletion", async () => {
    jest
      .spyOn(userService, "deleteUserById")
      .mockRejectedValueOnce(new Error("Delete error"));

    const req = { params: { id: "1" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await deleteUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Delete error" });
  });
});
