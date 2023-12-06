import { read, run } from "@/utils.ts";

export async function main(fileName: string): Promise<number> {
  const text = await read({ day: 6, fileName });
  const [timeRow, distanceRow] = text.lines().map((line) => line.split(":"));
  const [_timeLabel, timesStr] = timeRow;
  const [_distanceLabel, distancesStr] = distanceRow;
  const time = Number.parseInt(timesStr.replace(/\s+/g, ""));
  const distance = Number.parseInt(distancesStr.replace(/\s+/g, ""));

  let count = 0;
  for (let i = 0; i <= time; i++) {
    if (distance < i * (time - i)) count++;
  }

  return count;
}

await run(main, "input.txt");
