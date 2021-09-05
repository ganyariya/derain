import { replaceAt } from "./util.ts";
import { deno } from "./ascii.ts";
import { Drop } from "./drop.ts";

const getEmptyScreen = (lines: number, columns: number): string[] => {
  const texts: string[] = Array(lines).fill(" ".repeat(columns));
  return texts;
};

const getDenoEmbeddedScreen = (
  lines: number,
  columns: number,
  texts: string[]
): string[] => {
  const denoHeight = deno.length;
  const denoWidth = 14;

  const lineMid = Math.floor(lines / 2) + 1;
  const columnMid = Math.floor(columns / 2);

  const ret = [...texts];
  for (let i = 0; i < denoHeight; i++) {
    const y = Math.floor(lineMid - denoHeight / 2) + i;
    const x = Math.floor(columnMid - denoWidth / 2);
    ret[y] = replaceAt(ret[y], x, deno[i]);
  }
  return ret;
};

const getRainedDenoScreeen = (
  lines: number,
  columns: number,
  texts: string[],
  drops: Drop[]
): string[] => {
  const ret = [...texts];
  for (const drop of drops) {
    for (let i = 0; i < drop.len; i++) {
      const y = (drop.y + i) % lines;
      const x = (drop.x - i + columns) % columns;
      if (ret[y][x] == " ") ret[y] = replaceAt(ret[y], x, "/");
    }
  }
  return ret;
};

export { getEmptyScreen, getDenoEmbeddedScreen, getRainedDenoScreeen };
