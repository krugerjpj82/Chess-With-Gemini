import React, { useState } from 'react';
import { Difficulty, PlayerColor } from '../types';
import { PIECE_SVGS } from '../constants';

interface GameSetupProps {
  onStart: (color: PlayerColor, difficulty: Difficulty) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStart }) => {
  const [selectedColor, setSelectedColor] = useState<PlayerColor>(PlayerColor.WHITE);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4">
      <div className="bg-[#f0e4d0] border border-[#a87e5e] rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all">
        <h1 className="text-3xl font-bold text-center text-[#431407] mb-2">Grandmaster Chess</h1>
        <p className="text-[#785c40] text-center mb-8">Powered by Google Gemini</p>

        <div className="space-y-6">
          {/* Color Selection */}
          <div>
            <label className="block text-sm font-bold text-[#5c4033] mb-3">Choose Your Side</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedColor(PlayerColor.WHITE)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  selectedColor === PlayerColor.WHITE
                    ? 'border-amber-600 bg-white shadow-lg'
                    : 'border-[#a87e5e] bg-[#e7d5c0] hover:bg-[#dcc0a0]'
                }`}
              >
                <div className="w-12 h-12 mb-2 drop-shadow-md">{PIECE_SVGS['K']}</div>
                <span className="text-[#431407] font-semibold">White</span>
                {selectedColor === PlayerColor.WHITE && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-amber-600 rounded-full"></div>
                )}
              </button>
              
              <button
                onClick={() => setSelectedColor(PlayerColor.BLACK)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  selectedColor === PlayerColor.BLACK
                    ? 'border-amber-600 bg-white shadow-lg'
                    : 'border-[#a87e5e] bg-[#e7d5c0] hover:bg-[#dcc0a0]'
                }`}
              >
                <div className="w-12 h-12 mb-2 drop-shadow-md">{PIECE_SVGS['k']}</div>
                <span className="text-[#431407] font-semibold">Black</span>
                {selectedColor === PlayerColor.BLACK && (
                     <div className="absolute top-2 right-2 w-3 h-3 bg-amber-600 rounded-full"></div>
                )}
              </button>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="block text-sm font-bold text-[#5c4033] mb-3">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-2">
              {[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`py-3 px-2 rounded-lg text-sm font-bold transition-all ${
                    difficulty === level
                      ? 'bg-amber-700 text-[#fef3c7] shadow-md'
                      : 'bg-[#e7d5c0] text-[#785c40] hover:bg-[#dcc0a0]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={() => onStart(selectedColor, difficulty)}
            className="w-full py-4 mt-4 bg-gradient-to-r from-amber-700 to-yellow-800 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all text-lg"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;