import { config } from "dotenv";
import { jest } from "@jest/globals";

config({ path: ".env.test" });

// Test PostgreSQL client
jest.mock("pg", () => {
  const actualPg = jest.requireActual("pg");
  const mockClient = {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  };
  return {
    actualPg,
    Client: jest.fn(() => mockClient),
  };
});

beforeAll(async () => {
  console.log("Starting test setup...");
});

afterAll(async () => {
  console.log("Test cleanup complete.");
});
