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
  it("should create a user", async () => {
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

  it("should return 500 if an error occurs during creating a user", async () => {
    jest
      .spyOn(userService, "registerUser")
      .mockRejectedValueOnce(new Error("Internal server error"));

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
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });

  // TODO => first_name is required
  // TODO => last_name is required
  // TODO => invalid email format
  // TODO => password requirements (Upper, lower, number, special, length >= 8)
});

describe("getAllUsers", () => {
  it("should return users", async () => {
    const mockUsers = [
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        profile_picture: "abc.com",
      },
      {
        id: 2,
        first_name: "Bob",
        last_name: "Builder",
        profile_picture: "def.com",
      },
      {
        id: 3,
        first_name: "Rick",
        last_name: "James",
        profile_picture: "ghi.com",
      },
      {
        id: 4,
        first_name: "Diana",
        last_name: "Ross",
        profile_picture: "jkl.com",
      },
    ] as unknown as User[];
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

  it("should return 500 if an error occurs during getting users", async () => {
    jest
      .spyOn(userService, "getUsers")
      .mockRejectedValueOnce(new Error("Internal server error"));

    const req = {
      body: [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          profile_picture: "abc.com",
        },
        {
          id: 2,
          first_name: "Bob",
          last_name: "Builder",
          profile_picture: "def.com",
        },
        {
          id: 3,
          first_name: "Rick",
          last_name: "James",
          profile_picture: "ghi.com",
        },
        {
          id: 4,
          first_name: "Diana",
          last_name: "Ross",
          profile_picture: "jkl.com",
        },
      ],
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getAllUsers(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

describe("getUserById", () => {
  it("should return a user", async () => {
    const mockUser = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      profile_picture: "abc.com",
    } as unknown as User;
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

  it("should return 500 if an error occurs during getting a user", async () => {
    jest
      .spyOn(userService, "getUserById")
      .mockRejectedValueOnce(new Error("Internal server error"));

    const req = { params: { id: "1" } } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

describe("updateUser", () => {
  it("should update a user", async () => {
    jest.spyOn(userService, "updateUserById").mockResolvedValueOnce();

    const req = {
      params: { id: "1" },
      body: { first_name: "Bob", last_name: "Smith" },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await updateUser(req, res, jest.fn());

    expect(userService.updateUserById).toHaveBeenCalledWith("1", {
      first_name: "Bob",
      last_name: "Smith",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User 1 updated successfully",
    });
  });

  it("should return 500 if an error occurs during updating a user", async () => {
    const req = {
      params: { id: "1" },
      body: { first_name: "Bob", last_name: "Smith" },
    } as Partial<Request>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    jest
      .spyOn(userService, "updateUserById")
      .mockRejectedValue(new Error("Internal server error"));

    await updateUser(req as Request, res as Response, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

describe("deleteUser", () => {
  it("should delete a user", async () => {
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

  it("should return 500 if an error occurs during deleting a user", async () => {
    jest
      .spyOn(userService, "deleteUserById")
      .mockRejectedValueOnce(new Error("Internal server error"));

    const req = { params: { id: "1" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await deleteUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
