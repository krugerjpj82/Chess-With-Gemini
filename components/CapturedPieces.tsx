import React from 'react';
import { PIECE_SVGS } from '../constants';

interface CapturedPiecesProps {
  capturedByWhite: string[];
  capturedByBlack: string[];
}

const CapturedPieces: React.FC<CapturedPiecesProps> = ({ capturedByWhite, capturedByBlack }) => {
  // We want to sort them by value: P < N=B < R < Q
  const valueMap: Record<string, number> = { 'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'P': 1, 'N': 3, 'B': 3, 'R': 5, 'Q': 9 };
  
  const sortPieces = (pieces: string[]) => {
    return [...pieces].sort((a, b) => (valueMap[b] || 0) - (valueMap[a] || 0)); // High value first
  };

  return (
    <div className="flex flex-col gap-2 w-full">
        {/* Captured by Black (White pieces lost) */}
       <div className="h-8 flex items-center bg-[#e0ccb0] rounded px-2 overflow-hidden border border-[#c5a880]">
        {sortPieces(capturedByBlack).map((p, i) => (
             <div key={i} className="w-5 h-5 -ml-1 first:ml-0 opacity-100 drop-shadow-sm">
                {PIECE_SVGS[p]} 
             </div>
        ))}
       </div>

       {/* Captured by White (Black pieces lost) */}
       <div className="h-8 flex items-center bg-[#e0ccb0] rounded px-2 overflow-hidden border border-[#c5a880]">
         {sortPieces(capturedByWhite).map((p, i) => (
             <div key={i} className="w-5 h-5 -ml-1 first:ml-0 opacity-100 drop-shadow-sm">
                {PIECE_SVGS[p]} 
             </div>
         ))}
       </div>
    </div>
  );
};

export default CapturedPieces;