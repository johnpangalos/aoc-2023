import { read, lines, run } from "@/utils.ts";

export async function main(fileName: string): Promise<number> {
  const text = await read(4, fileName);

  return lines(text).reduce<number>((acc, str) => {
    const [_, winningNums, card] = str
      .split(/[:\|]/)
      .map((item) => item.trim());
    const points = card
      .split(" ")
      .filter((item) => item.trim() !== "")
      .reduce<number>((acc, item) => {
        const hasNumer = winningNums.split(" ").some((num) => num === item);
        if (!hasNumer) return acc;
        if (acc === 0) return 1;
        return acc * 2;
      }, 0);
    return acc + points;
  }, 0);
}

await run(main, "input.txt");
