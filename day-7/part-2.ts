import { empty, inc, int, read, run } from "@/utils.ts";

enum HandType {
  FIVE_OF_A_KIND = 6,
  FOUR_OF_A_KIND = 5,
  FULL_HOUSE = 4,
  THREE_OF_A_KIND = 3,
  TWO_PAIR = 2,
  ONE_PAIR = 1,
  HIGH_CARD = 0,
}

function getValue(char: string): number {
  switch (char) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 1;
    case "T":
      return 10;
    default:
      return Number.parseInt(char);
  }
}

function getHandType(cards: Cards): number {
  switch (Object.values(cards).flatMap((i) => i).length) {
    case 1:
      return HandType.FIVE_OF_A_KIND;
    case 2:
      if (Object.keys(cards).map(int).includes(4))
        return HandType.FOUR_OF_A_KIND;
      return HandType.FULL_HOUSE;
    case 3:
      if (Object.keys(cards).map(int).includes(3))
        return HandType.THREE_OF_A_KIND;
      return HandType.TWO_PAIR;
    case 4:
      return HandType.ONE_PAIR;
    case 5:
      return HandType.HIGH_CARD;
    default:
      throw new Error(`Error parsing hand ${JSON.stringify(cards)}`);
  }
}
function sortHands(a: Hand, b: Hand) {
  if (a.type !== b.type) return a.type - b.type;
  for (let x = 0; x < a.converted.length; x++) {
    if (a.converted[x] === b.converted[x]) continue;
    return a.converted[x] - b.converted[x];
  }
  throw new Error("huh?");
}

type Cards = Record<string, number[]>;
type Hand = {
  type: number;
  converted: number[];
  points: number;
};

export async function main(fileName: string): Promise<number> {
  const text = await read({ day: 7, fileName });
  const hands = text
    .lines()
    .map((l) => l.words().filter(empty))
    .filter((l) => l.length > 0);

  const parsedHands = hands.reduce<Hand[]>((acc, [str, pointsStr]) => {
    const cards: Record<string, number[]> = {};

    let converted = str.chars().map((c) => getValue(c));

    let jokerCount = 0;
    str
      .chars()
      .filter((c) => {
        if (c !== "J") return true;
        jokerCount++;
        return false;
      })
      .forEach((char, _idx, word) => {
        const num = word.reduce(
          (acc, curr) => (char === curr ? acc + 1 : acc),
          0,
        );
        if (cards[num] === undefined) cards[num] = [getValue(char)];
        if (cards[num].includes(getValue(char))) return;
        cards[num].push(getValue(char));
      });

    const biggestGroup = Object.keys(cards)
      .map((str) => Number.parseInt(str))
      .sort(inc)[0];

    if (jokerCount === 5) {
      cards[5] = [1];
    } else if (jokerCount === 0) {
    } else if (cards[biggestGroup].length === 1)
      delete Object.assign(cards, {
        [biggestGroup + jokerCount]: cards[biggestGroup],
      })[biggestGroup];
    else {
      const [newVal, ...rest] = cards[biggestGroup];
      cards[biggestGroup] = rest;
      cards[biggestGroup + jokerCount] = [newVal];
    }

    acc.push({
      type: getHandType(cards),
      points: Number.parseInt(pointsStr),
      converted,
    });
    return acc;
  }, []);

  const sortedHands = parsedHands.sort(sortHands);
  return sortedHands.reduce(
    (acc, hand, idx) => acc + hand.points * (idx + 1),
    0,
  );
}

await run(main, "input.txt");
