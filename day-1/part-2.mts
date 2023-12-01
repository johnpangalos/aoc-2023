import { readFile } from "node:fs/promises";

const fileName = "input.txt";
const text = await readFile(`./day-1/${fileName}`).then((res) =>
  res.toString(),
);

const digits: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

console.log(
  text.split("\n").reduce<number>((acc, str) => {
    const temp = str.split("").reduce((acc, char, idx) => {
      let num = Number.parseInt(char);
      if (Number.isNaN(num)) {
        const digit = Object.keys(digits).find(
          (digit) => str.indexOf(digit, idx) === idx,
        );
        if (digit === undefined) return acc;
        num = digits[digit];
      }
      if (acc === 0) return Number.parseInt(`${num.toString()}${num.toString()}`);
      return Number.parseInt(`${acc.toString()[0]}${num.toString()}`);
    }, 0);
    return acc + temp;
  }, 0),
);
