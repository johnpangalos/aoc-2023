import { test, expect } from "bun:test";
import { main } from "./part-1.ts";

test("example-1 equals 13", async () => {
  expect(await main("example-1.txt")).toBe(13);
});
