export enum PlayerColor {
  WHITE = 'w',
  BLACK = 'b'
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export interface ChessMove {
  from: string;
  to: string;
  promotion?: string; // 'n', 'b', 'r', 'q'
  san: string; // Standard Algebraic Notation (e.g., "Nf3")
}

export interface GameState {
  fen: string;
  turn: PlayerColor;
  isCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  history: string[];
  capturedByWhite: string[];
  capturedByBlack: string[];
}

export interface AIResponse {
  move: string;
  thought?: string;
}
