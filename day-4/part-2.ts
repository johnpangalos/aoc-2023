import { read, lines, run, filterEmpty, words } from "@/utils.ts";

export async function main(fileName: string): Promise<number> {
  const text = await read(4, fileName);

  const copies = lines(text).reduce<Record<number, number>>((acc, str) => {
    const [cardNumStr, winningNums, card] = str
      .split(/[:\|]/)
      .map((item) => item.trim());
    const cardNum = Number.parseInt(cardNumStr.split(/[ \t\n]+/)[1]);

    if (acc[cardNum] === undefined) acc[cardNum] = 0;
    acc[cardNum] = acc[cardNum] + 1;

    const matches = filterEmpty(words(card)).reduce<number>((acc, item) => {
      const hasNumer = words(winningNums).some((num) => num === item);
      if (!hasNumer) return acc;
      return acc + 1;
    }, 0);

    for (let i = cardNum + 1; i < cardNum + matches + 1; i++) {
      if (acc[i] === undefined) acc[i] = 0;
      acc[i] = acc[i] + acc[cardNum];
    }
    return acc;
  }, {});

  return Object.values(copies).reduce<number>((acc, val) => acc + val, 0);
}

await run(main, "input.txt");
