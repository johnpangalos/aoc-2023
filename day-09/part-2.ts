import { int, read, run, empty, panic } from "@/utils";

function reduceDiff(arr: number[]) {
  return arr.reduce<number[]>((acc, curr, idx, arr) => {
    if (idx === 0) return acc;
    acc.push(curr - arr[idx - 1]);
    return acc;
  }, []);
}

function reduceBefore(arr: number[][]) {
  return arr
    .reverse()
    .reduce<number[][]>((acc, curr, idx) => {
      if (idx === 0) {
        curr.push(0);
        acc.push(curr);
        return acc;
      }
      const newValue = panic(curr.at(0)) - panic(acc[idx - 1].at(0));
      curr = [newValue, ...curr];
      acc.push(curr);
      return acc;
    }, [])
    .reverse();
}

export async function main(fileName: string): Promise<number> {
  const text = await read({ day: 9, fileName });
  const report = text
    .lines()
    .filter(empty)
    .map((l) => l.words().filter(empty).map(int));

  const reportHistorty = report.map((r) => {
    const history = [r];
    let count = 0;
    while (!history[count].every((i) => i === 0)) {
      const curr = reduceDiff(history[count]);
      history.push(curr);
      count++;
    }
    return history;
  });
  return reportHistorty
    .map(reduceBefore)
    .flatMap((r) => panic(r[0].at(0)))
    .sum();
}

await run(main, "input.txt");
