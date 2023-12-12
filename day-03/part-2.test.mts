import { test, expect } from "bun:test";
import { main } from "./part-2.mts";

test("example-1 equals 467835", async () => {
  expect(await main("example-1.txt")).toBe(467835);
});
