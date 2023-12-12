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
        .map((i) => i.replace(/[^A-Z]+/g, ""));

      return { ...acc, [val]: { val, L, R } };
    },
    {},
  );

  let target = "AAA";
  let count = 0;
  while (target !== "ZZZ") {
    pattern.chars().forEach((char) => {
      if (char !== "L" && char !== "R")
        throw new Error(`unknown pattern part ${char}`);
      target = instructions[target][char];
      count++;
    });
  }
  return count;
}

await run(main, "input.txt");
