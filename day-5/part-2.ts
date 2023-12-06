import { read, run, int } from "@/utils.ts";

export type Map = [dest: number, source: number, range: number];

function backgroundTask(
  start: number,
  length: number,
  idx: number,
  rules: Map[][],
): Promise<number> {
  const worker = new Worker(
    new URL("./part-2-worker.ts", import.meta.url).href,
    {
      type: "module",
    },
  );
  return new Promise((resolve) => {
    worker.onmessage = (event: MessageEvent<number>) => {
      console.log("msg recieved: " + idx);
      resolve(event.data);
    };
    worker.postMessage({ start, length, idx, rules });
  });
}

export async function main(fileName: string): Promise<number> {
  const text = await read({ day: 5, fileName });

  const [seedsArr, ...maps] = text.lines().split("");
  const seed = seedsArr[0]
    .split(":")[1]
    .trim()
    .words()
    .map(int)
    .reduce<number[][]>((acc, curr, idx) => {
      const counter = Math.floor(idx / 2);
      if (acc[counter] === undefined) acc[counter] = [];
      acc[counter].push(curr);
      return acc;
    }, []);

  const rules = maps.map((arr) => {
    const [_, ...mapping] = arr;
    return mapping.map<Map>((m) => {
      return m.words().map(int) as Map;
    });
  });

  console.log("brute!");
  const final = await Promise.all(
    seed.map(([start, length], idx) => {
      return backgroundTask(start, length, idx, rules);
    }),
  );
  return Math.min(...final);
}

await run(main, "input.txt");
