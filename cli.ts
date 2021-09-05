import { sleep, Command } from "./deps.ts";
import { render } from "./mod.ts";

const { options } = await new Command()
  .name("derain")
  .description("Deno with rain.")
  .version("1.0.0")
  .option("-s, --speed <speed:number>", "rain speed.", { default: 0.1 })
  .option("-r, --ratio <ratio:number>", "rain ratio.", { default: 0.005 })
  .parse(Deno.args);

const { speed, ratio } = options;
for await (const content of render(ratio)) {
  console.clear();
  console.log(content);
  await sleep(speed);
}
