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

export { Drop };
