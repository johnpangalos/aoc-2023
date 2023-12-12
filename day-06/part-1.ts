import { empty, int, read, run } from "@/utils.ts";

export async function main(fileName: string): Promise<number> {
  const text = await read({ day: 6, fileName });
  const [timeRow, distanceRow] = text
    .lines()
    .map((line) => line.words().filter(empty));
  const [_timeLabel, ...timesStr] = timeRow;
  const [_distanceLabel, ...distancesStr] = distanceRow;
  const times = timesStr.map(int);
  const distances = distancesStr.map(int);

  let totals: number[] = [];
  let count = 0;
  times.forEach((time, idx) => {
    for (let i = 0; i <= time; i++) {
      if (distances[idx] < i * (time - i)) count++;
    }
    totals.push(count);
    count = 0;
  });

  return totals.reduce((acc, curr) => acc * curr);
}

await run(main, "input.txt");
