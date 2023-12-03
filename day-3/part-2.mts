import { readFile } from "node:fs/promises";

export async function main(fileName: string): Promise<number> {
  const text = await readFile(`./day-3/${fileName}`).then((res) =>
    res.toString(),
  );

  const matrix = text
    .split("\n")
    .filter((str) => str.length > 0)
    .reduce<Record<string, string>>((acc, str, yPos) => {
      str.split("").forEach((char, xPos) => {
        acc[`${yPos},${xPos}`] = char;
      });
      return acc;
    }, {});

  const stars: Record<string, [number, number]> = {};

  text
    .split("\n")
    .filter((str) => str.length > 0)
    .forEach((str, yPos, arr) => {
      str.split("").forEach((char, xPos) => {
        const num = Number.parseInt(char);
        if (Number.isNaN(num)) return;
        if (xPos > 0 && Number.isInteger(Number.parseInt(str[xPos - 1])))
          return;
        const xPosEnd = str.substring(xPos).search(/(?![0-9])/) + xPos;
        const value = Number.parseInt(str.substring(xPos, xPosEnd));

        for (let j = yPos - 1; j < yPos + 2; j++) {
          if (j < 0 || j > arr.length - 1) continue;
          for (let i = xPos - 1; i < xPosEnd + 1; i++) {
            if (i < 0 || i > str.length - 1) continue;
            const valueToCheck = matrix[`${j},${i}`];
            if (valueToCheck === "*") {
              if (stars[`${j},${i}`] !== undefined)
                stars[`${j},${i}`] = [2, stars[`${j},${i}`][1] * value];
              else stars[`${j},${i}`] = [1, value];
            }
          }
        }
      });
    });

  return Object.values(stars).reduce<number>((acc, [num, value]) => {
    if (num === 2) return acc + value;
    return acc;
  }, 0);
}

if (process.env.NODE_ENV !== "test") console.log(await main("input.txt"));
