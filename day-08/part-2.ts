import { read, run } from "@/utils";

type Instruction = { val: string; L: string; R: string };

export async function main(fileName: string): Promise<number> {
  const text = await read({ day: 8, fileName });
  const [[pattern], instructionsRaw] = text.lines().split("");
  const instructions = instructionsRaw.reduce<Record<string, Instruction>>(
    (acc, str) => {
      const [val, L, R] = str
        .words()
        .filter((i) => i !== "=")
        .map((i) => i.replace(/[^A-Z0-9]+/gm, ""));

      return { ...acc, [val]: { val, L, R } };
    },
    {},
  );

  let target = Object.keys(instructions).filter((i) => i[2] === "A");
  const out = target.map((t) => {
    let count = 0;

    main: while (true) {
      for (let char of pattern.chars()) {
        if (char !== "L" && char !== "R")
          throw new Error(`unknown pattern part ${char}`);
        t = instructions[t][char];
        count++;
        if (t[2] === "Z") break main;
      }
    }
    return count;
  });

  return out.reduce<number>((acc, curr) => {
    if (acc === 0) return curr;
    let hcf: number = 0;

    for (let i = 1; i <= acc && i <= curr; i++) {
      if (acc % i == 0 && curr % i == 0) {
        hcf = i;
      }
    }
    return (acc * curr) / hcf;
  }, 0);
}

await run(main, "input.txt");
