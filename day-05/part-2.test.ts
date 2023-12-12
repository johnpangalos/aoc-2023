import { test, expect } from "bun:test";
import { main } from "./part-2.ts";

test("example-1 equals 46", async () => {
  expect(await main("example-1.txt", 10)).toBe(46);
});
