
export class KEY {
  static readonly LEFT = 37;
  static readonly RIGHT = 39;
  static readonly DOWN = 40;
  static readonly SPACE = 32;
}

export interface IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];
}

export class Piece implements IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];

  constructor(private ctx: CanvasRenderingContext2D) {
    this.spawn();
  }

  private spawn() {
    this.color = 'blue';
    this.shape = [[2, 0, 0], [2, 2, 2], [0, 0, 0]];
    this.x = 3;
    this.y = 0;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  move(p: IPiece) {
    this.x = p.x;
    this.y = p.y;
  }


}