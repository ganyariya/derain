import { sleep } from "https://deno.land/x/sleep/mod.ts";
import { getColumns, getLines } from "./process.ts";

while (true) {
  console.clear();
  console.log(Math.random());
  console.log(await getColumns());
  console.log(await getLines());
  await sleep(0.2);
}
