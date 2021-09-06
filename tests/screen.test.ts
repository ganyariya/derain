import {
  assertEquals,
  assert,
} from "https://deno.land/std@0.106.0/testing/asserts.ts";
import {
  canDrawDeno,
  getDenoEmbeddedScreen,
  getEmptyScreen,
  getRainedDenoScreeen,
} from "../components/screen.ts";
import { generateDrops } from "../components/drop.ts";

Deno.test("Can draw deno", () => {
  const lines = 10;
  const columns = 20;
  assert(canDrawDeno(lines, columns, 10, 20));
  assert(canDrawDeno(lines, columns, 9, 20));
  assert(canDrawDeno(lines, columns, 10, 19));
});

Deno.test("Cannot draw deno", () => {
  const lines = 10;
  const columns = 20;
  assert(!canDrawDeno(lines, columns, 11, 20));
  assert(!canDrawDeno(lines, columns, 10, 21));
});

Deno.test("emptyScreenSize", () => {
  const lines = 10;
  const columns = 20;
  const screen = getEmptyScreen(lines, columns);
  assertEquals(screen.length, lines);
  assertEquals(screen[0].length, columns);
});
Deno.test("denoEbmeddedScreen", () => {
  const lines = 10;
  const columns = 20;
  const screen = getEmptyScreen(lines, columns);
  const denoScreen = getDenoEmbeddedScreen(lines, columns, screen);
  assertEquals(denoScreen.length, screen.length);
  for (let i = 0; i < denoScreen.length; i++) {
    assertEquals(denoScreen[i].length, screen[i].length);
  }
});

Deno.test("raindedDenoScreen", () => {
  const lines = 10;
  const columns = 20;
  const screen = getEmptyScreen(lines, columns);
  const denoScreen = getDenoEmbeddedScreen(lines, columns, screen);
  const drops = generateDrops(lines, columns, 10);
  const rainedScreen = getRainedDenoScreeen(lines, columns, denoScreen, drops);
  assertEquals(denoScreen.length, rainedScreen.length);
  for (let i = 0; i < denoScreen.length; i++) {
    assertEquals(denoScreen[i].length, rainedScreen[i].length);
  }
});
