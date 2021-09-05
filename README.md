# derain

[![deno.land](https://img.shields.io/badge/deno-%5E1.13.2-green?logo=deno)](https://deno.land)
[![LICENSE](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)
[![tag](https://img.shields.io/github/v/tag/ganyariya/derain?sort=semver)](https://github.com/ganyariya/derain/tags)

deno with rain...

<p align="center">
  <img width="600" src="https://i.gyazo.com/c44129cb91063209007873b808e0b0c3.gif">
</p>

## Usage

**CLI**

```shell
deno install --allow-run --force --name derain https://github.com/ganyariya/derain/raw/v1.0.3/cli.ts

derain
derain --help
```

**Module** (Example)

```typescript
import { render } from "https://github.com/ganyariya/derain/raw/v1.0.3/cli.ts";

for await (const content of render(0.05, 0.002)) {
  console.clear();
  console.log(content);
}
```
