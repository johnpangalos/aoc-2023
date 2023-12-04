import { read, expand, run, trim, empty } from "@/utils.ts";

export async function main(fileName: string): Promise<number> {
  const text = await read({ day: 4, fileName });

  const copies = text.lines().reduce<Record<number, number>>((acc, str) => {
    const [cardNumStr, winningNums, card] = str.split(/[:\|]/).map(trim);
    const cardNum = Number.parseInt(cardNumStr.split(/[ \t\n]+/)[1]);

    if (acc[cardNum] === undefined) acc[cardNum] = 0;
    acc[cardNum] = acc[cardNum] + 1;

    const matches = card
      .words()
      .filter(empty)
      .reduce<number>((acc, item) => {
        const hasNumer = winningNums.words().some((num) => num === item);
        if (!hasNumer) return acc;
        return acc + 1;
      }, 0);

    expand(cardNum + 1, matches).forEach((i) => {
      if (acc[i] === undefined) acc[i] = 0;
      acc[i] = acc[i] + acc[cardNum];
    });

    return acc;
  }, {});

  return Object.values(copies).sum();
}

await run(main, "input.txt");
