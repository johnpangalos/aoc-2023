import { readFile } from "node:fs/promises";

const fileName = "input.txt";

const text = await readFile(`./day-2/${fileName}`).then((res) =>
  res.toString(),
);

type Game = Record<Color, number>;
type Color = "red" | "green" | "blue";

const sum = text.split("\n").reduce<number>((acc, str) => {
  if (str.length === 0) return acc;

  const [_gameStr, cubes] = str.split(":");

  const game = cubes.split(/,|;/).reduce<Game>(
    (acc, cube) => {
      const [num, color] = cube.trim().split(" ");
      if (color !== "red" && color !== "green" && color !== "blue")
        throw new Error(`no entry in colors for ${color}`);
      if (acc[color] > Number.parseInt(num)) return acc;
      acc[color] = Number.parseInt(num);
      return acc;
    },
    { red: 0, green: 0, blue: 0 },
  );

  return acc + game.red * game.blue * game.green;
}, 0);

console.log(sum);
