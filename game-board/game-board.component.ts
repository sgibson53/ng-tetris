import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { COLS, BLOCK_SIZE, ROWS } from 'src/constants';
import { BoardService } from '../board.service';
import { Piece, IPiece, KEY } from '../models';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  @ViewChild('board', { static: true }) canvas: ElementRef<HTMLCanvasElement>
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.moves[event.keyCode]) {
      event.preventDefault();
      let p = this.moves[event.keyCode](this.piece);
      if (event.keyCode === KEY.SPACE) {
        while (this.boardService.valid(p)) {
          this.piece.move(p);
          p = this.moves[KEY.DOWN](this.piece);
        }
      } else {
        if (this.boardService.valid(p)) {
          this.piece.move(p);
        }
      }

      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.piece.draw();
    }
  }
  board: number[][];
  ctx: CanvasRenderingContext2D;
  piece: Piece;
  points: number;
  lines: number;
  level: number;
  moves = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p: IPiece): IPiece => this.boardService.rotate45(p)
  }

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.initBoard();
  }

  private initBoard() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  play() {
    this.board = this.boardService.getEmptyBoard();
    this.piece = new Piece(this.ctx);
    this.piece.draw();
  }



  private isEmpty(value: number) {
    return true;
  }


}
