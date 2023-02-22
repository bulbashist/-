export enum Color {
  RED,
  YELLOW,
  ORANGE,
  GREEN,
  LIGHTBLUE,
  BLUE,
  PURPLE,
  BROWN,
  BLACK,
}

export const colorsMatcher = new Map<Color, string>([
  [Color.BLACK, "black"],
  [Color.BLUE, "blue"],
  [Color.BROWN, "brown"],
  [Color.GREEN, "green"],
  [Color.LIGHTBLUE, "lightblue"],
  [Color.ORANGE, "orange"],
  [Color.PURPLE, "purple"],
  [Color.RED, "red"],
  [Color.YELLOW, "yellow"],
]);

export class Point {
  public top: number;
  public left: number;
  private obtainIndex: number;
  public color: string;

  constructor(left: number, top: number) {
    this.top = top;
    this.left = left;
    this.obtainIndex = 0;
    this.color = "black";
  }

  public getIndex() {
    return this.obtainIndex;
  }

  public setIndex(index: number) {
    this.obtainIndex = index;
    this.setColor();
  }

  private setColor() {
    this.color = colorsMatcher.get(this.obtainIndex)!;
  }
}
