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
      resolve(event.data);
      worker.terminate();
      Bun.gc(true);
    };
    worker.postMessage({ start, length, idx, rules });
  });
}

export async function main(
  fileName: string,
  interval: number,
): Promise<number> {
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

  const final = await Promise.all(
    seed.flatMap(([start, length], idx) => {
      if (length > interval) {
        const promises = [];
        for (let i = start; i < start + length; i = i + interval) {
          if (i + interval > start + length) {
            promises.push(backgroundTask(i, start + length - i, idx, rules));
          } else {
            promises.push(backgroundTask(i, interval, idx, rules));
          }
        }
        return promises;
      } else {
        return backgroundTask(start, length, idx, rules);
      }
    }),
  );
  return Math.min(...final);
}

await run(main, "input.txt", 10000);
