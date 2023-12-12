import { test, expect } from "bun:test";
import { main } from "./part-2.ts";

test("example-5 equals 4", async () => {
  expect(await main("example-5.txt")).toBe(4);
});

test("example-6 equals 8", async () => {
  expect(await main("example-6.txt")).toBe(8);
});

test("example-7 equals 10", async () => {
  expect(await main("example-7.txt")).toBe(10);
});
