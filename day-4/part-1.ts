import { empty, read, run, trim } from "@/utils.ts";

export async function main(fileName: string): Promise<number> {
  const text = await read({ day: 4, fileName });

  return text
    .lines()
    .filter(empty)
    .reduce<number>((acc, str) => {
      const [_, winningNums, card] = str.split(/[:\|]/).map(trim);
      const points = card
        .words()
        .filter(empty)
        .reduce<number>((acc, item) => {
          const hasNumer = winningNums.words().includes(item);
          if (!hasNumer) return acc;
          if (acc === 0) return 1;
          return acc * 2;
        }, 0);
      return acc + points;
    }, 0);
}

await run(main, "input.txt");
