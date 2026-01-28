import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty } from "../types";

const apiKey = process.env.API_KEY;
// Initialize securely
const ai = new GoogleGenAI({ apiKey: apiKey });

export const getBestMove = async (
  fen: string,
  legalMoves: string[],
  difficulty: Difficulty,
  history: string[]
): Promise<{ move: string; thought: string }> => {
  if (!apiKey) {
    throw new Error("API Key missing");
  }

  // Choose model based on difficulty for better resource management and skill emulation
  const model = difficulty === Difficulty.HARD 
    ? 'gemini-3-pro-preview' 
    : 'gemini-3-flash-preview';

  // For easy mode, we can prompt it to be less optimal, but keeping it simple for now
  // For hard mode, we use the stronger model.

  const prompt = `
    You are a Chess Engine.
    
    Current Game State (FEN): ${fen}
    Legal Moves: ${legalMoves.join(', ')}
    Move History: ${history.join(' ')}
    Difficulty Level: ${difficulty}
    
    Task: Select the best move for the current turn based on the difficulty level.
    ${difficulty === Difficulty.EASY ? "Play sub-optimally, make a slight mistake if possible but do not blunder the queen immediately unless forced." : ""}
    ${difficulty === Difficulty.MEDIUM ? "Play a solid game, typical of an intermediate club player." : ""}
    ${difficulty === Difficulty.HARD ? "Play your absolute best, grandmaster level." : ""}

    Return a JSON object with:
    - "move": The SAN (Standard Algebraic Notation) string of the chosen move (must be one of the Legal Moves provided).
    - "thought": A very brief (max 15 words) explanation of why you made this move.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            move: { type: Type.STRING },
            thought: { type: Type.STRING }
          },
          required: ["move", "thought"]
        },
        // Enable thinking for hard mode to get better reasoning
        thinkingConfig: difficulty === Difficulty.HARD ? { thinkingBudget: 1024 } : undefined,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text);
    return {
      move: result.move,
      thought: result.thought || "Calculating..."
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback if AI fails: pick random legal move
    const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    return {
      move: randomMove,
      thought: "Fallback random move."
    };
  }
};
