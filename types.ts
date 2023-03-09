function randn_bm(): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
  return num;
}

function randomIntegerInRange(min: number, max: number) {
  return Math.floor(randn_bm() * (max - min + 1)) + min;
}

console.log(randomIntegerInRange(1, 6));

class Gauss {
  ready = false;
  second = 0.0;

  next(mean: number, dev: number) {
    mean = mean == undefined ? 0.0 : mean;
    dev = dev == undefined ? 1.0 : dev;

    if (this.ready) {
      this.ready = false;
      return this.second * dev + mean;
    } else {
      var u, v, s;
      do {
        u = 2.0 * Math.random() - 1.0;
        v = 2.0 * Math.random() - 1.0;
        s = u * u + v * v;
      } while (s > 1.0 || s == 0.0);

      var r = Math.sqrt((-2.0 * Math.log(s)) / s);
      this.second = r * u;
      this.ready = true;
      return r * v * dev + mean;
    }
  }
}

const g = new Gauss(); // создаём объект

export class ConfigData {
  public data: ClusterData[] = [new ClusterData(), new ClusterData()];

  constructor(n: number, p1: number, p2: number) {
    this.data[0].probability = p1;
    this.data[1].probability = p2;

    // ну не Гаусс ну и ладно
    for (let i = 0; i < n; i++) {
      // this.data[0].points.push(Math.random() * 700);
      this.data[0].points.push(g.next(300, 150));
      this.data[1].points.push(g.next(700, 150));
    }
    console.log(g.next(700, 1));

    for (let i = 0; i < n; i++) {
      // this.data[1].points.push(Math.random() * 700 + 300);
    }
  }
}

export class ClusterData {
  points: number[] = [];
  probability: number = 0;
}

export class Point {
  public top: number;
  public left: number;
  private obtainIndex: number;

  constructor(left: number, top: number) {
    this.top = top;
    this.left = left;
    this.obtainIndex = 0;
  }
}
