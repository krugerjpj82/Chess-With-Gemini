import { Chess } from 'https://esm.sh/chess.js@1.0.0-beta.8';
import { GameState, PlayerColor } from '../types';

export class ChessGame {
  private game: any; // Chess instance

  constructor(fen?: string) {
    this.game = new Chess(fen);
  }

  getGameState(): GameState {
    const history = this.game.history();
    const fen = this.game.fen();
    
    // Calculate captured pieces by comparing current board to initial counts
    // This is a naive approximation or we can track it manually. 
    // Better: Iterate board to count.
    const board = this.game.board();
    const whitePieces: string[] = [];
    const blackPieces: string[] = [];
    
    board.forEach((row: any[]) => {
      row.forEach((square) => {
        if (square) {
          if (square.color === 'w') whitePieces.push(square.type.toUpperCase());
          else blackPieces.push(square.type);
        }
      });
    });

    // Standard counts
    const startCounts: Record<string, number> = { 'P': 8, 'N': 2, 'B': 2, 'R': 2, 'Q': 1, 'K': 1, 'p': 8, 'n': 2, 'b': 2, 'r': 2, 'q': 1, 'k': 1 };
    const currentCounts: Record<string, number> = {};
    [...whitePieces, ...blackPieces].forEach(p => {
        currentCounts[p] = (currentCounts[p] || 0) + 1;
    });

    const capturedByWhite: string[] = []; // Black pieces captured
    const capturedByBlack: string[] = []; // White pieces captured

    // Diff
    Object.keys(startCounts).forEach(type => {
        const count = currentCounts[type] || 0;
        const missing = startCounts[type] - count;
        if (missing > 0) {
            for(let i=0; i<missing; i++) {
                if (type === type.toUpperCase()) capturedByBlack.push(type);
                else capturedByWhite.push(type);
            }
        }
    });

    return {
      fen: fen,
      turn: this.game.turn() === 'w' ? PlayerColor.WHITE : PlayerColor.BLACK,
      isCheck: this.game.inCheck(),
      isCheckmate: this.game.isCheckmate(),
      isDraw: this.game.isDraw(),
      history: history,
      capturedByWhite,
      capturedByBlack
    };
  }

  getLegalMoves(): string[] {
    return this.game.moves();
  }
  
  // Returns legal moves with verbose details for UI highlighting
  getVerboseMoves() {
    return this.game.moves({ verbose: true });
  }

  makeMove(moveSan: string): boolean {
    try {
      const result = this.game.move(moveSan);
      return !!result;
    } catch (e) {
      return false;
    }
  }
  
  makeMoveFromTo(from: string, to: string, promotion: string = 'q'): boolean {
    try {
        const result = this.game.move({ from, to, promotion });
        return !!result;
    } catch (e) {
        return false;
    }
  }

  reset() {
    this.game.reset();
  }
  
  isGameOver() {
    return this.game.isGameOver();
  }

  getBoard() {
    return this.game.board();
  }
}
