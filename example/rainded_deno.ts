import { render } from "../mod.ts";
import { sleep } from "../deps.ts";

for await (const content of render(0.005)) {
  console.clear();
  console.log(content);
  await sleep(0.1);
}
