import { read, run, int, expand } from "@/utils.ts";

type Map = [dest: number, source: number, range: number];

export async function main(fileName: string): Promise<number> {
  const text = await read({ day: 5, fileName });

  const [seedsArr, ...maps] = text.lines().split("");
  const seed = seedsArr[0].split(":")[1].trim().words().map(int);

  const rules = maps.map((arr) => {
    const [_, ...mapping] = arr;
    return mapping.map<Map>((m) => {
      return m.words().map(int) as Map;
    });
  });

  const final = seed.map((s) => {
    let out = -1;
    for (let ruleSet of rules) {
      for (let rule of ruleSet) {
        const [des, source, range] = rule;
        if (s >= source && s <= source + range) {
          out = s - source + des;
          break;
        } else {
          out = s;
        }
      }
      s = out;
    }
    return out;
  });
  return Math.min(...final);
}

await run(main, "input.txt");
