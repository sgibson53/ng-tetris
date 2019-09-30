import { Injectable } from '@angular/core';
import { ROWS, COLS } from 'src/constants';
import { IPiece } from './models';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  valid(p: IPiece): boolean {
    return p.shape.every((row, dy) => {
      return row.every((_value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (this.insideWalls(x) && this.aboveFloor(y));
      })
    })
  }

  private insideWalls(x: number): boolean {
    return x >= 0 && x < COLS;
  }

  private aboveFloor(y: number): boolean {
    return y >= 0 && y <= ROWS;
  }

  rotate45(p: IPiece): IPiece {
    let clone: IPiece = JSON.parse(JSON.stringify(p));

    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < y; x++) {
        const temp = clone.shape[y][x];
        clone.shape[y][x] = clone.shape[x][y];
        clone.shape[x][y] = temp;
      }
    }

    return clone;
  }
}
