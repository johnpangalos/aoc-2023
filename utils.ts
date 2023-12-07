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

export function expand(min: number, length: number) {
  return Array.from({ length }, (_, k) => k + min);
}

export function trim(item: string) {
  return item.trim();
}

export function empty(item: string) {
  return item.trim() !== "";
}

export function int(item: string): number {
  const num = Number.parseInt(item);
  if (Number.isNaN(num)) throw new Error(`Cannot parse ${item} into number`);
  return num;
}

export function inc(a: number, b: number) {
  return b - a;
}

declare global {
  interface Array<T> {
    sum: T extends number ? () => number : never;
    split: (str: string) => T[][];
  }
  interface String {
    lines: () => string[];
    words: () => string[];
    chars: () => string[];
  }
}

Array.prototype.sum = function () {
  return this.reduce<number>((acc, val) => acc + val, 0);
};

Array.prototype.split = function (str: string) {
  let counter = 0;
  return this.reduce((acc, val) => {
    if (val === str) {
      counter = counter + 1;
      return acc;
    }
    if (acc[counter] === undefined) acc[counter] = [];
    acc[counter].push(val);
    return acc;
  }, []);
};

String.prototype.words = function () {
  return this.split(" ");
};

String.prototype.chars = function () {
  return this.split("");
};

String.prototype.lines = function () {
  return this.split("\n");
};
