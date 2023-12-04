import { readFile } from "node:fs/promises";

export async function read(day: number, fileName: string): Promise<string> {
  const buf = await readFile(`./day-${day}/${fileName}`);
  return buf.toString();
}

export function lines(text: string): string[] {
  return text.split("\n").filter((str) => str.length > 0);
}

export function words(text: string): string[] {
  return text.split(" ");
}

export async function run<T extends unknown, U extends unknown>(
  fn: (args: T) => U,
  args: T,
): Promise<void> {
  if (process.env.NODE_ENV !== "test") console.log(await fn(args));
}

export function filterEmpty(arr: string[]) {
  return arr.filter((item) => item.trim() !== "");
}

export function expand(min: number, max: number) {
  return Array.from({ length: max }, (_, k) => k + min);
}

export function mapTrim(arr: string[]) {
  return arr.map((item) => item.trim());
}

export function sum(arr: number[]) {
  return arr.reduce<number>((acc, val) => acc + val, 0);
}
