import { render } from "../mod.ts";

for await (const content of render(0.05, 0.002)) {
  console.clear();
  console.log(content);
}
