import { test, expect } from "bun:test";
import { main } from "./part-1.ts";

test("example-1 equals 4", async () => {
  expect(await main("example-1.txt")).toBe(4);
});

test("example-2 equals 4", async () => {
  expect(await main("example-2.txt")).toBe(4);
});

test("example-3 equals 4", async () => {
  expect(await main("example-3.txt")).toBe(8);
});

test("example-4 equals 8", async () => {
  expect(await main("example-4.txt")).toBe(8);
});
