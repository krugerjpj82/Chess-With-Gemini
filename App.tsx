import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChessGame } from './services/chessLogic';
import { getBestMove } from './services/geminiService';
import { GameState, PlayerColor, Difficulty } from './types';
import Square from './components/Square.tsx';
import GameSetup from './components/GameSetup';
import CapturedPieces from './components/CapturedPieces';
import { RotateCcw, Maximize, Minimize, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  // Game Logic Instance
  const chessRef = useRef<ChessGame | null>(null);
  
  // App State
  const [gameStarted, setGameStarted] = useState(false);
  const [playerColor, setPlayerColor] = useState<PlayerColor>(PlayerColor.WHITE);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Board Interaction State
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{from: string, to: string} | null>(null);
  
  // AI State
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [aiThought, setAiThought] = useState<string>("");
  const [gameStatusMessage, setGameStatusMessage] = useState<string>("");

  // Initialize game helper
  const updateGameState = useCallback(() => {
    if (!chessRef.current) return;
    setGameState(chessRef.current.getGameState());
  }, []);

  const initGame = useCallback(() => {
    chessRef.current = new ChessGame();
    updateGameState();
    setLastMove(null);
    setAiThought("");
    setGameStatusMessage("");
    setSelectedSquare(null);
    setPossibleMoves([]);
  }, [updateGameState]);

  const handleStartGame = (color: PlayerColor, diff: Difficulty) => {
    setPlayerColor(color);
    setDifficulty(diff);
    initGame();
    setGameStarted(true);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullScreen(true)).catch(e => console.error(e));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullScreen(false));
      }
    }
  };

  const makeAIMove = useCallback(async () => {
    if (!chessRef.current) return;
    
    setIsAIThinking(true);
    const currentState = chessRef.current.getGameState();
    const legalMoves = chessRef.current.getLegalMoves();

    if (chessRef.current.isGameOver()) {
        setIsAIThinking(false);
        return;
    }

    const { move, thought } = await getBestMove(
      currentState.fen,
      legalMoves,
      difficulty,
      currentState.history
    );

    setIsAIThinking(false);
    setAiThought(thought);

    if (move) {
        chessRef.current.makeMove(move);
        updateGameState();
        
        // Find last move to highlight using internal logic if needed
    }
  }, [difficulty, updateGameState]);

  // AI Turn Effect
  useEffect(() => {
    if (!gameStarted || !gameState || chessRef.current?.isGameOver()) return;

    if (gameState.turn !== playerColor && !isAIThinking) {
        const timer = setTimeout(() => {
            makeAIMove();
        }, 600);
        return () => clearTimeout(timer);
    }
  }, [gameStarted, gameState, playerColor, isAIThinking, makeAIMove]);

  // Check Game Over
  useEffect(() => {
      if (gameState?.isCheckmate) {
          setGameStatusMessage(`Checkmate! ${gameState.turn === PlayerColor.WHITE ? 'Black' : 'White'} wins.`);
      } else if (gameState?.isDraw) {
          setGameStatusMessage("Game Draw!");
      } else if (gameState?.isCheck) {
          // Warning but not over
      }
  }, [gameState]);

  // Listen for fullscreen change
  useEffect(() => {
      const handleFsChange = () => {
          setIsFullScreen(!!document.fullscreenElement);
      };
      document.addEventListener("fullscreenchange", handleFsChange);
      return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const handleSquareClick = (square: string) => {
    if (!chessRef.current || isAIThinking || gameState?.turn !== playerColor || chessRef.current.isGameOver()) return;

    // If we have a selected square, try to move
    if (selectedSquare) {
        // Check if clicked square is in possible moves
        if (possibleMoves.includes(square)) {
            // Execute Move
            const success = chessRef.current.makeMoveFromTo(selectedSquare, square);
            if (success) {
                setLastMove({ from: selectedSquare, to: square });
                setSelectedSquare(null);
                setPossibleMoves([]);
                updateGameState();
            } else {
                // Select new piece logic
                const piece = chessRef.current.getBoard().flat().find((p: any) => p && p.square === square);
                if (piece && piece.color === playerColor) {
                    setSelectedSquare(square);
                    const moves = chessRef.current.getVerboseMoves();
                    const validTargets = moves
                        .filter((m: any) => m.from === square)
                        .map((m: any) => m.to);
                    setPossibleMoves(validTargets);
                } else {
                    setSelectedSquare(null);
                    setPossibleMoves([]);
                }
            }
        } else {
             // Clicked outside valid targets or on own piece
             const piece = chessRef.current.getBoard().flat().find((p: any) => p && p.square === square);
             if (piece && piece.color === playerColor) {
                 setSelectedSquare(square);
                 const moves = chessRef.current.getVerboseMoves();
                 const validTargets = moves
                     .filter((m: any) => m.from === square)
                     .map((m: any) => m.to);
                 setPossibleMoves(validTargets);
             } else {
                 setSelectedSquare(null);
                 setPossibleMoves([]);
             }
        }
    } else {
        // No selection, selecting a piece
        const piece = chessRef.current.getBoard().flat().find((p: any) => p && p.square === square);
        if (piece && piece.color === playerColor) {
            setSelectedSquare(square);
            const moves = chessRef.current.getVerboseMoves();
            const validTargets = moves
                .filter((m: any) => m.from === square)
                .map((m: any) => m.to);
            setPossibleMoves(validTargets);
        }
    }
  };

  useEffect(() => {
     if(chessRef.current) {
         const history = (chessRef.current as any).game.history({ verbose: true });
         if (history.length > 0) {
             const last = history[history.length - 1];
             setLastMove({ from: last.from, to: last.to });
         }
     }
  }, [gameState]);


  if (!gameStarted) {
    return <GameSetup onStart={handleStartGame} />;
  }

  // Board Rendering
  const board = chessRef.current?.getBoard() || []; 
  let displayBoard = [...board];
  const isPlayerBlack = playerColor === PlayerColor.BLACK;
  
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  
  const gridSquares = [];
  if (isPlayerBlack) {
      for (let r = 7; r >= 0; r--) {
          for (let c = 7; c >= 0; c--) {
              gridSquares.push({ row: r, col: c, ...displayBoard[r][c], square: `${files[c]}${ranks[r]}` });
          }
      }
  } else {
      for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) {
              gridSquares.push({ row: r, col: c, ...displayBoard[r][c], square: `${files[c]}${ranks[r]}` });
          }
      }
  }

  return (
    <div className="min-h-screen bg-[#f5e6d3] text-[#431407] flex flex-col items-center justify-center p-4 lg:p-8">
      
      {/* Header / Top Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-yellow-800 drop-shadow-sm">
                Gemini Grandmaster
            </h1>
            <span className="px-3 py-1 bg-[#e7d5c0] rounded-full text-xs font-semibold text-[#5c4033] border border-[#a87e5e]">
                {difficulty} Mode
            </span>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={toggleFullScreen}
                className="flex items-center gap-2 px-3 py-2 bg-[#e7d5c0] hover:bg-[#dcc0a0] rounded-lg text-sm font-bold text-[#5c4033] transition-colors border border-[#a87e5e]"
                title="Toggle Full Screen"
            >
                {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
            <button 
                onClick={() => { setGameStarted(false); }}
                className="flex items-center gap-2 px-4 py-2 bg-[#e7d5c0] hover:bg-[#dcc0a0] rounded-lg text-sm font-bold text-[#5c4033] transition-colors border border-[#a87e5e]"
            >
                <RotateCcw size={16} /> New Game
            </button>
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-center gap-12 items-start">
        
        {/* Combined Info Panel */}
        <div className="hidden lg:flex flex-col gap-6 w-80 shrink-0">
            <div className="bg-[#f0e4d0] p-6 rounded-2xl border border-[#a87e5e] shadow-sm">
                
                {/* AI Section */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${isAIThinking ? 'bg-amber-500 animate-pulse' : 'bg-[#a87e5e]'}`}></div>
                        <h2 className="font-bold text-lg text-[#5c4033]">Gemini AI</h2>
                    </div>
                    {isAIThinking && <span className="text-xs text-amber-600 font-semibold">Thinking...</span>}
                </div>
                
                {/* AI Thought Bubble */}
                {aiThought && (
                    <div className="mb-6 p-3 bg-white/60 rounded-lg border border-[#c5a880]">
                        <p className="text-sm text-[#785c40] italic">"{aiThought}"</p>
                    </div>
                )}
                
                {/* Player Section */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${gameState?.turn === playerColor ? 'bg-green-600' : 'bg-[#a87e5e]'}`}></div>
                        <h2 className="font-bold text-lg text-[#5c4033]">You</h2>
                    </div>
                </div>

                {/* Captured Pieces */}
                <div className="mt-4 pt-4 border-t border-[#c5a880]">
                    <p className="text-xs text-[#8d6e63] mb-2 uppercase tracking-wider font-bold">Captured</p>
                    <CapturedPieces 
                        capturedByWhite={gameState?.capturedByWhite || []} 
                        capturedByBlack={gameState?.capturedByBlack || []} 
                    />
                </div>
            </div>
            
            {/* Status Message */}
            {gameStatusMessage && (
                <div className="p-4 bg-amber-100 border border-amber-300 rounded-xl flex items-center gap-3 shadow-sm">
                    <AlertTriangle className="text-amber-600" size={20} />
                    <span className="font-medium text-amber-900">{gameStatusMessage}</span>
                </div>
            )}
        </div>

        {/* Center: Chess Board */}
        <div className="flex flex-col items-center">
            <div className="relative p-2 bg-[#5c4033] rounded shadow-2xl border-4 border-[#3e2723]">
                <div className="grid grid-cols-8 grid-rows-8 w-[85vw] h-[85vw] max-w-[600px] max-h-[600px] border-2 border-[#3e2723]">
                    {gridSquares.map((sq, i) => {
                        const isLight = (sq.row + sq.col) % 2 === 0;
                        const piece = sq.type ? { type: sq.type, color: sq.color } : null;
                        
                        return (
                            <Square
                                key={sq.square}
                                square={sq.square}
                                piece={piece}
                                isLight={isLight}
                                isSelected={selectedSquare === sq.square}
                                isLastMoveFrom={lastMove?.from === sq.square}
                                isLastMoveTo={lastMove?.to === sq.square}
                                isValidMoveTarget={possibleMoves.includes(sq.square)}
                                isCheck={!!gameState?.isCheck && piece?.type === 'k' && piece?.color === gameState.turn}
                                onSquareClick={handleSquareClick}
                            />
                        );
                    })}
                </div>
            </div>
        </div>

      </div>
      
      {/* Mobile-only status */}
      <div className="lg:hidden w-full max-w-6xl mt-6">
         {aiThought && (
            <div className="p-3 bg-[#f0e4d0] rounded-lg border border-[#a87e5e]">
                <span className="text-xs font-bold text-[#8d6e63] uppercase block mb-1">AI Thinking</span>
                <p className="text-sm text-[#5c4033] italic">"{aiThought}"</p>
            </div>
         )}
         {gameStatusMessage && (
            <div className="mt-4 p-3 bg-amber-100 rounded-lg border border-amber-300 flex items-center gap-2">
                <AlertTriangle className="text-amber-600" size={16} />
                <span className="text-sm text-amber-900">{gameStatusMessage}</span>
            </div>
         )}
      </div>

    </div>
  );
};

export default App;