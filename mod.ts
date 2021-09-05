import { sleep } from "https://deno.land/x/sleep/mod.ts";
import { getColumns, getLines } from "./process.ts";
import {
  getEmptyScreen,
  getDenoEmbeddedScreen,
  getRainedDenoScreeen,
} from "./screen.ts";
import { generateDrops } from "./drop.ts";

const getScreenSizes = async () => {
  const lines = await getLines();
  const columns = await getColumns();
  const characters = lines * columns;
  return [lines, columns, characters];
};

async function* render(speed: number, ratio: number): AsyncGenerator<string> {
  let time = new Date().getTime();
  let [lines, columns, characters] = await getScreenSizes();
  const drops = generateDrops(lines, columns, Math.floor(characters * ratio));

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
    for (const drop of drops) drop.move(lines, columns);

    yield rainedDenoScreen.join("\n");
    await sleep(speed);
  }
}

export { render };
