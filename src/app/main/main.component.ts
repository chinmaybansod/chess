import { Component } from '@angular/core';
import { Cell } from './cell';
import { Piece } from './piece';
import { CdkDragDrop } from '@angular/cdk/drag-drop'
import { Position } from './position';

const displayPieces: Record<string, string> = {
  'blackpawn': '♟',
  'blackking': '♚',
  'blackqueen': '♛',
  'blackrook': '♜',
  'blackknight': '♞',
  'blackbishop': '♝',
  'whitepawn': '♙',
  'whiteking': '♔',
  'whitequeen': '♕',
  'whiterook': '♖',
  'whiteknight': '♘',
  'whitebishop': '♗',
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  board: Cell[][] = this.createBoard();
  aplhabets = 'abcdefghijklmnopqrstuvwxyz'

  displayPiece(row: number, col: number): string {
    const p = this.board[row][col].piece;
    return p ? displayPieces[`${p.color}${p.type}`] : '';
  }

  createBoard(): Cell[][] {
    const board: Cell[][] = [];
    for (let i = 0; i < 8; i++) {
      board.push([])
      for (let j = 0; j < 8; j++) {
        const cell: Cell = {}
        cell.piece = this.getStartingPiece(i,j, board);
        board[i].push(cell)
      }
    }


    return board;
  }

  getStartingPiece(row: number, col: number, board: Cell[][]) {

    const color = row <= 1 ? 'black' : 'white';

    if(row == 1 || row == 6) {
      return this.pawn(board, color)
    }

    if(row == 0 || row == 7) {
      switch (col) {
        case 0:
        case 7:
          return this.rook(board, color);
          break;
        case 1:
        case 6:
          return this.bishop(board, color);
          break;
        case 2:
        case 5:
          return this.knight(board, color);
          break;
        case 3:
          return row == 0 ? this.queen(board, color) : this.king(board, color);
          break;
        case 4:
          return row == 0 ? this.king(board, color) : this.queen(board, color);
          break;

        default:
          break;
      }
    }

    return undefined;
  }

  pawn(board: Cell[][], color: 'white' | 'black'): Piece {
    return {
      type: 'pawn',
      color
    }
  }
  queen(board: Cell[][], color: 'white' | 'black') {
    return {
      type: 'queen',
      color
    }
  }
  king(board: Cell[][], color: 'white' | 'black'): Piece {
    return {
      type: 'king',
      color
    }
  }
  rook(board: Cell[][], color: 'white' | 'black'): Piece {
    return {
      type: 'rook',
      color
    }
  }
  bishop(board: Cell[][], color: 'white' | 'black'): Piece {
    return {
      type: 'bishop',
      color
    }
  }
  knight(board: Cell[][], color: 'white' | 'black'): Piece {
    return {
      type: 'knight',
      color
    }
  }

  validMove(oldRow: number, oldCol: number, newRow: number, newCol: number): boolean {
    const piece = this.board[oldRow][oldCol].piece;
    console.log(piece);

    switch (piece?.type) {
      case 'pawn':
        const moveDirection = piece.color === 'white' ? -1 : 1;
        console.log(newRow, oldRow + moveDirection, newCol, oldCol)
        return (newRow == oldRow + moveDirection) && (newCol == oldCol);
        break;
      default:
        return false;
        break;
    }
  }

  move(event: CdkDragDrop<any, Position, Position>) {

    const oldPos = event.item.data;
    const newPos = event.container.data;

    if(this.validMove(oldPos.row , oldPos.col, newPos.row, newPos.col)) {
      console.log('called');

      const piece = this.board[oldPos.row][oldPos.col];
      this.board[oldPos.row][oldPos.col] = {};
      this.board[newPos.row][newPos.col] = piece;
    }
  }

}

