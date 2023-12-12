import { int, read, run, empty, panic } from "@/utils";

function reduceDiff(arr: number[]) {
  return arr.reduce<number[]>((acc, curr, idx, arr) => {
    if (idx === 0) return acc;
    acc.push(curr - arr[idx - 1]);
    return acc;
  }, []);
}

function reduceAdd(arr: number[][]) {
  return arr
    .reverse()
    .map((a, idx) => {
      if (idx === 0) {
        a.push(0);
        return a;
      }

      a.push(panic(arr[idx - 1].at(-1)) + panic(a.at(-1)));
      return a;
    })
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
    .map((r) => {
      return reduceAdd(r);
    })
    .flatMap((r) => panic(r[0].at(-1)))
    .sum();
}

await run(main, "input.txt");
