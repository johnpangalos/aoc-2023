import { readFile } from "node:fs/promises";

type ReadOptions = {
  day: number;
  fileName: string;
};

export async function read({ day, fileName }: ReadOptions): Promise<string> {
  const buf = await readFile(`./day-${day}/${fileName}`);
  return buf.toString();
}

export async function run<T extends unknown, U extends unknown>(
  fn: (args: T) => U,
  args: T,
): Promise<void> {
  if (process.env.NODE_ENV !== "test") console.log(await fn(args));
}

export function expand(min: number, max: number) {
  return Array.from({ length: max }, (_, k) => k + min);
}

export function trim(item: string) {
  return item.trim();
}

export function empty(item: string) {
  return item.trim() !== "";
}

declare global {
  interface Array<T> {
    sum: T extends number ? () => number : never;
  }
  interface String {
    lines: () => string[];
    words: () => string[];
  }
}

Array.prototype.sum = function () {
  return this.reduce<number>((acc, val) => acc + val, 0);
};

String.prototype.words = function () {
  return this.split(" ");
};

String.prototype.lines = function () {
  return this.split("\n").filter((str) => str.length > 0);
};
