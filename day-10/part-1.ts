import { read, run, panic, expand, empty } from "@/utils";

const startChar = "S";
const turnChars = ["L", "J", "7", "F"];
const moveChars = ["|", "-"];

function parseCoord(coord: string): [x: number, y: number] {
  const [x, y] = coord.split("-");
  return [panic(Number.parseInt(x)), panic(Number.parseInt(y))];
}

function toCoord(x: number, y: number): string {
  return `${x}-${y}`;
}

export async function main(fileName: string): Promise<number> {
  const text = await read({ day: 10, fileName });
  const lines = text.lines().filter(empty);
  const xMax = lines[0].length - 1;
  const yMax = lines.length - 1;
  const map: Record<string, string> = lines.reduce((acc, l, rowIdx) => {
    const row = l.chars().reduce((acc, c, colIdx) => {
      return { ...acc, [toCoord(colIdx, rowIdx)]: c };
    }, {});
    return { ...acc, ...row };
  }, {});
  const [coord] = panic(
    Object.entries(map).find(([_, val]) => val === startChar),
  );
  let currCoord = coord.slice();
  const [x, y] = parseCoord(currCoord);

  const surround = {
    left: map[toCoord(x - 1, y)],
    right: map[toCoord(x + 1, y)],
    bottom: map[toCoord(x, y - 1)],
    top: map[toCoord(x, y + 1)],
  };

  // while (true) {
  //   const [x, y] = parseCoord(currCoord);
  //   expand(x - 1, x + 1).map((i) => {
  //     expand(y - 1, y + 1).map((j) => {
  //       if (i < 0 || i > xMax) console.log(i);
  //       if (j < 0 || j > yMax) console.log(j);
  //       console.log(toCoord(i, j), map[toCoord(i, j)]);
  //     });
  //   });
  //
  //   break;
  // }

  return 0;
}

await run(main, "input.txt");
