import { readFile } from "node:fs/promises";

const fileName = "input.txt";

const text = await readFile(`./day-2/${fileName}`).then((res) =>
  res.toString(),
);

const limit: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const sum = text.split("\n").reduce<number>((acc, str) => {
  if (str.length === 0) return acc;

  const [gameStr, cubes] = str.split(":");
  const idx = gameStr.split(" ")[1];

  const isImpossible = cubes.split(/,|;/).some((cube) => {
    const [num, color] = cube.trim().split(" ");
    if (limit[color] === undefined)
      throw new Error(`no entry in colors for ${color}`);
    return Number.parseInt(num) > limit[color];
  });

  if (isImpossible) return acc;
  return acc + Number.parseInt(idx);
}, 0);

console.log(sum);
