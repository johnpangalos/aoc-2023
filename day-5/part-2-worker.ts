// prevents TS errors
declare const self: Worker;
import { Map } from "./part-2.ts";

self.onmessage = (
  event: MessageEvent<{
    start: number;
    length: number;
    idx: number;
    rules: Map[][];
  }>,
) => {
  const { start, length, idx, rules } = event.data;
  let min: number | undefined;
  for (let i = start; i < start + length; i++) {
    let s = i.valueOf();
    if (s % 1000000 === 0) console.log("brute force:" + s + " - idx: " + idx);
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
    if (min === undefined || out < min) min = out;
  }
  self.postMessage(min);
};
