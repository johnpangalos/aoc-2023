import * as utils from "@/utils.ts";

export async function main(fileName: string): Promise<number> {
  const text = await utils.read(4, fileName);

  const copies = utils
    .lines(text)
    .reduce<Record<number, number>>((acc, str) => {
      const [cardNumStr, winningNums, card] = utils.mapTrim(str.split(/[:\|]/));
      const cardNum = Number.parseInt(cardNumStr.split(/[ \t\n]+/)[1]);

      if (acc[cardNum] === undefined) acc[cardNum] = 0;
      acc[cardNum] = acc[cardNum] + 1;

      const matches = utils
        .filterEmpty(utils.words(card))
        .reduce<number>((acc, item) => {
          const hasNumer = utils.words(winningNums).some((num) => num === item);
          if (!hasNumer) return acc;
          return acc + 1;
        }, 0);

      utils.expand(cardNum + 1, matches).forEach((i) => {
        if (acc[i] === undefined) acc[i] = 0;
        acc[i] = acc[i] + acc[cardNum];
      });

      return acc;
    }, {});

  return utils.sum(Object.values(copies));
}

await utils.run(main, "input.txt");
