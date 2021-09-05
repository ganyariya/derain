import { sleep } from "https://deno.land/x/sleep/mod.ts";
import { getColumns, getLines } from "./process.ts";
import { replaceAt, randomInt } from "./util.ts";

const columns = await getColumns();
const lines = await getLines();
const characters = columns * lines;
const portion = 0.02;

const getScreen = (lines: number, columns: number): string[] => {
  const texts: string[] = Array(lines).fill(" ".repeat(columns));
  return texts;
};

const getEmbeddedDeno = (texts: string[]): string[] => {
  const deno = [
    "  __           ",
    " ( ･ \\         ",
    "   \\  \\        ",
    "    \\  \\       ",
    "    |   -^\\    ",
    "    ⎩      ﾄ､  ",
    "     u¯u︶u  \\  ",
  ];
  const denoHeight = deno.length;
  const denoWidth = 14;

  const columnMidium = Math.floor(columns / 2);
  const lineMidium = Math.floor(lines / 2) + 1;

  let ret = [...texts];
  for (let i = 0; i < denoHeight; i++) {
    const y = Math.floor(lineMidium - denoHeight / 2) + i;
    const x = Math.floor(columnMidium - denoWidth / 2);
    ret[y] = replaceAt(ret[y], x, deno[i]);
  }
  return ret;
};

class Drop {
  y: number;
  x: number;
  len: number;

  public constructor(height: number, width: number) {
    this.y = randomInt(0, height - 1);
    this.x = randomInt(0, width - 1);
    this.len = randomInt(2, 5);
  }

  move(height: number, width: number) {
    this.y += 1;
    this.y %= height;
    this.x -= 1;
    this.x = (this.x + width) % width;
  }
}

const screen = getScreen(lines, columns);
const deno = getEmbeddedDeno(screen);
const drops: Drop[] = [];
for (let i = 0; i < 10; i++) drops.push(new Drop(lines, columns));

const getRainedDeno = (texts: string[], drops: Drop[]): string[] => {
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

while (true) {
  console.clear();
  const rained = getRainedDeno(deno, drops);
  for (let drop of drops) drop.move(lines, columns);
  console.log(rained.join("\n"));
  //   console.log(deno.join("\n"));
  await sleep(0.05);
}

const getScreenSizes = async () => {
  const lines = await getLines();
  const columns = await getColumns();
  const characters = lines * columns;
  return [lines, columns, characters];
};

async function* render(speed: number): any {
  let time = new Date().getTime();
  let [lines, columns, characters] = await getScreenSizes();

  while (true) {
    const now = new Date().getTime();
    if (now - time >= 1000) {
      [lines, columns, characters] = await getScreenSizes();
      time = now;
    }

    const screen = getScreen(lines, columns);
  }
  yield 1;
}
