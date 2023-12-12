/* References:
 *
 * Shoelace formula - Calculates the area based on corners
 * https://en.wikipedia.org/wiki/Shoelace_formula
 *
 * Pick theorem - Calculates the area based on interior and boundary
 * points
 * https://en.wikipedia.org/wiki/Pick%27s_theorem
 */
import { read, run, panic, empty } from "@/utils";

const startChar = "S";

function parseCoord(coord: string): [x: number, y: number] {
  const [x, y] = coord.split("-");
  return [panic(Number.parseInt(x)), panic(Number.parseInt(y))];
}

function toCoord(x: number, y: number): string {
  return `${x}-${y}`;
}

type Direction = "up" | "down" | "right" | "left";

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

  const surround: Record<Direction, string> = {
    left: toCoord(x - 1, y),
    right: toCoord(x + 1, y),
    up: toCoord(x, y - 1),
    down: toCoord(x, y + 1),
  };

  let count = 0;

  let loop: [x: number, y: number][] = [];
  Object.entries(surround).find(([k, c]) => {
    let curr = c.slice();
    let direction: Direction = k.slice() as Direction;
    let running = true;

    function validateCoord(num: number, max: number) {
      return num < 0 || num > max || Number.isNaN(num);
    }

    function reset() {
      count = 0;
      loop = [];
    }

    while (running) {
      count++;
      const [x, y] = parseCoord(curr);
      if (validateCoord(x, xMax) || validateCoord(y, yMax)) return reset();
      const val = map[curr];
      if (val === ".") return reset();
      switch (val) {
        case "|":
          if (direction === "up") curr = toCoord(x, y - 1);
          else if (direction === "down") curr = toCoord(x, y + 1);
          else return reset();
          break;
        case "-":
          if (direction === "right") curr = toCoord(x + 1, y);
          else if (direction === "left") curr = toCoord(x - 1, y);
          else return reset();
          break;

        case "L":
          if (direction === "left") {
            curr = toCoord(x, y - 1);
            direction = "up";
          } else if (direction === "down") {
            curr = toCoord(x + 1, y);
            direction = "right";
          } else return reset();
          loop.push([x, y]);
          break;
        case "J":
          if (direction === "right") {
            curr = toCoord(x, y - 1);
            direction = "up";
          } else if (direction === "down") {
            curr = toCoord(x - 1, y);
            direction = "left";
          } else return reset();
          loop.push([x, y]);
          break;
        case "7":
          if (direction === "right") {
            curr = toCoord(x, y + 1);
            direction = "down";
          } else if (direction === "up") {
            curr = toCoord(x - 1, y);
            direction = "left";
          } else return reset();
          loop.push([x, y]);
          break;
        case "F":
          if (direction === "left") {
            curr = toCoord(x, y + 1);
            direction = "down";
          } else if (direction === "up") {
            curr = toCoord(x + 1, y);
            direction = "right";
          } else return reset();
          loop.push([x, y]);
          break;
        case "S":
          loop.push([x, y]);
          running = false;
          break;
        default:
          break;
      }
    }
    return true;
  });

  const area =
    loop.reduce<number>((acc, [x, y], idx, arr) => {
      if (idx === arr.length - 1) {
        const [nextX, nextY] = arr[0];
        acc = acc + (x * nextY - y * nextX);
      } else {
        const [nextX, nextY] = arr[idx + 1];
        acc = acc + (x * nextY - y * nextX);
      }
      return acc;
    }, 0) / 2;

  return Math.abs(area) - count / 2 + 1;
}
await run(main, "input.txt");
