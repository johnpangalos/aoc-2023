import { test, expect } from "bun:test";
import { main } from "./part-2.ts";

test("example-1 equals 5905", async () => {
  expect(await main("example-1.txt")).toBe(5905);
});
