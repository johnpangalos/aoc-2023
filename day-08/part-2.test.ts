import { test, expect } from "bun:test";
import { main } from "./part-2.ts";

test("example-1 equals 6", async () => {
  expect(await main("example-2.txt")).toBe(6);
});
