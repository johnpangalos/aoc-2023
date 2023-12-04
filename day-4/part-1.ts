import { read, lines, mapTrim, words, run, filterEmpty } from "@/utils.ts";

export async function main(fileName: string): Promise<number> {
  const text = await read(4, fileName);

  return lines(text).reduce<number>((acc, str) => {
    const [_, winningNums, card] = mapTrim(str.split(/[:\|]/));
    const points = filterEmpty(words(card)).reduce<number>((acc, item) => {
      const hasNumer = words(winningNums).some((num) => num === item);
      if (!hasNumer) return acc;
      if (acc === 0) return 1;
      return acc * 2;
    }, 0);
    return acc + points;
  }, 0);
}

await run(main, "input.txt");
