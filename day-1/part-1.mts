import { readFile } from "node:fs/promises";

const fileName = "input.txt";
const text = await readFile(`./day-1/${fileName}`).then((res) =>
  res.toString(),
);

console.log(
  text.split("\n").reduce<number>((acc, curr) => {
    return (
      acc +
      curr.split("").reduce((acc, curr) => {
        const num = Number.parseInt(curr);
        if (Number.isNaN(num)) return acc;
        if (acc === 0) return Number.parseInt(`${curr}${curr}`);
        return Number.parseInt(`${acc.toString()[0]}${curr}`);
      }, 0)
    );
  }, 0),
);
