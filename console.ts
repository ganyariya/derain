import { sleep } from "https://deno.land/x/sleep/mod.ts";
import { getColumns, getLines } from "./process.ts";
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

  const columnMidium = Math.floor(columns / 2);
  const lineMidium = Math.floor(lines / 2) + 1;

  const ret = [...texts];
  for (let i = 0; i < denoHeight; i++) {
    const y = Math.floor(lineMidium - denoHeight / 2) + i;
    const x = Math.floor(columnMidium - denoWidth / 2);
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

const getScreenSizes = async () => {
  const lines = await getLines();
  const columns = await getColumns();
  const characters = lines * columns;
  return [lines, columns, characters];
};

async function* render(speed: number): any {
  let time = new Date().getTime();
  let [lines, columns, characters] = await getScreenSizes();
  const drops: Drop[] = [];
  for (let i = 0; i < 10; i++) drops.push(new Drop(lines, columns));

  while (true) {
    const now = new Date().getTime();
    if (now - time >= 1000) {
      [lines, columns, characters] = await getScreenSizes();
      time = now;
    }

    const screen = getEmptyScreen(lines, columns);
    const denoEmbeddedScreen = getDenoEmbeddedScreen(lines, columns, screen);
    const rainedDenoScreen = getRainedDenoScreeen(
      lines,
      columns,
      denoEmbeddedScreen,
      drops
    );
    yield rainedDenoScreen.join("\n");
    for (let drop of drops) drop.move(lines, columns);
    await sleep(0.05);
  }
}

for await (const content of render(0.2)) {
  console.log(content);
}
