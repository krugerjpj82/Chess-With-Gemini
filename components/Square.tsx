import React from 'react';
import { PIECE_SVGS } from '../constants';

interface SquareProps {
  square: string; // e.g., "a1"
  piece: { type: string; color: 'w' | 'b' } | null;
  isLight: boolean;
  isSelected: boolean;
  isLastMoveFrom: boolean;
  isLastMoveTo: boolean;
  isValidMoveTarget: boolean;
  isCheck: boolean;
  onSquareClick: (square: string) => void;
}

const Square: React.FC<SquareProps> = ({
  square,
  piece,
  isLight,
  isSelected,
  isLastMoveFrom,
  isLastMoveTo,
  isValidMoveTarget,
  isCheck,
  onSquareClick
}) => {
  
  // Color Definitions for Wood Theme
  const baseColor = isLight ? 'bg-[#ebd6b0]' : 'bg-[#b88762]'; // Standard wood-like cream and brown
  const selectedColor = 'bg-[#f6f669]'; // Classic yellow highlight
  const lastMoveColor = isLight ? 'bg-[#cdd26a]' : 'bg-[#aaa23a]'; // Olive-ish tint for last move
  
  // Determine actual background class
  let bgClass = baseColor;
  if (isSelected) bgClass = selectedColor;
  else if (isLastMoveFrom || isLastMoveTo) bgClass = lastMoveColor;

  // King in check highlight
  if (piece?.type === 'k' && isCheck && ((piece.color === 'w') || (piece.color === 'b'))) {
    if(isCheck) bgClass = 'bg-red-400';
  }

  // Piece SVG Key
  const pieceKey = piece ? (piece.color === 'w' ? piece.type.toUpperCase() : piece.type) : null;

  return (
    <div
      onClick={() => onSquareClick(square)}
      className={`relative w-full h-full flex items-center justify-center cursor-pointer select-none ${bgClass} transition-colors duration-150`}
    >
      {/* Valid Move Indicator */}
      {isValidMoveTarget && !piece && (
        <div className="absolute w-3 h-3 rounded-full bg-black/20" />
      )}
      
      {/* Valid Capture Indicator (Ring) */}
      {isValidMoveTarget && piece && (
        <div className="absolute w-full h-full border-4 border-black/10 rounded-full" />
      )}

      {/* Piece */}
      {pieceKey && (
        <div className="w-[88%] h-[88%] z-10 hover:scale-105 transition-transform duration-200">
            {PIECE_SVGS[pieceKey]}
        </div>
      )}
    </div>
  );
};

export default Square;