export enum Color {
  BLACK,
  RED,
  YELLOW,
  ORANGE,
  GREEN,
  LIGHTBLUE,
  BLUE,
  PURPLE,
  BROWN,
  DARKGREEN,
  SILVER,
}

export const colorsMatcher = new Map<Color, string>([
  [Color.BLACK, "black"],
  [Color.BLUE, "blue"],
  [Color.BROWN, "brown"],
  [Color.DARKGREEN, "darkgreen"],
  [Color.GREEN, "green"],
  [Color.LIGHTBLUE, "lightblue"],
  [Color.ORANGE, "orange"],
  [Color.PURPLE, "purple"],
  [Color.RED, "red"],
  [Color.SILVER, "silver"],
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
    this.color = colorsMatcher.get(this.getIndex())!;
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
