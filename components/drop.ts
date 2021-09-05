import { randomInt } from "./util.ts";

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

const generateDrops = (
  lines: number,
  columns: number,
  count: number
): Drop[] => {
  const drops = [];
  for (let i = 0; i < count; i++) drops.push(new Drop(lines, columns));
  return drops;
};

export { Drop, generateDrops };
