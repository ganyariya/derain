import { sleep } from "https://deno.land/x/sleep/mod.ts";
import { getColumns, getLines } from "./process.ts";

const replaceAt = (text: string, index: number, replacement: string) => {
  return (
    text.substr(0, index) +
    replacement +
    text.substr(index + replacement.length)
  );
};

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const columns = await getColumns();
const lines = await getLines();
const characters = columns * lines;
const portion = 0.02;

const getScreen = (): string[] => {
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

  public constructor(width: number, height: number) {
    this.x = randomInt(0, width - 1);
    this.y = randomInt(0, height - 1);
    this.len = randomInt(2, 5);
  }

  move(width: number, height: number) {
    this.x -= 1;
    this.x = (this.x + width) % width;
    this.y += 1;
    this.y %= height;
  }
}

const screen = getScreen();
const deno = getEmbeddedDeno(screen);
const drops: Drop[] = [];
for (let i = 0; i < 10; i++) drops.push(new Drop(columns, lines));

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
  for (let drop of drops) drop.move(columns, lines);
  console.log(rained.join("\n"));
  //   console.log(deno.join("\n"));
  await sleep(0.05);
}
