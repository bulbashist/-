export class ConfigData {
  public data: ClusterData[] = [new ClusterData(), new ClusterData()];

  constructor(n: number, p1: number, p2: number) {
    this.data[0].probability = p1;
    this.data[1].probability = p2;

    // ну не Гаусс ну и ладно
    for (let i = 0; i < n; i++) {
      this.data[0].points.push(Math.random() * 700);
    }

    for (let i = 0; i < n; i++) {
      this.data[1].points.push(Math.random() * 700 + 300);
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
