import React from 'react';

// Piece mapping using Cburnett style (standard, high legibility)
// White pieces have a white fill with black outline.
// Black pieces have a black fill with white details.

export const PIECE_SVGS: Record<string, React.JSX.Element> = {
  // White Pieces
  'P': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" stroke="#000" strokeWidth="1.5" fill="#fff" strokeLinecap="round" />
    </svg>
  ),
  'N': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" stroke="#000" strokeWidth="1.5" fill="#fff" />
      <path d="M24 18c.38 2.32-2.58 2.9-3 3-3.65.65-5.04-2.33-5.5-4-.51-1.73-1.42-3-3.5-3-2.08 0-3.61 2.3-4 6-.38 3.7 2.08 5 4.5 5 2.42 0 4.08-2.3 4.5-5" stroke="#000" strokeWidth="1.5" fill="#fff" />
      <path d="M9.5 25.5A4.5 4.5 0 1 1 9.5 16.5 4.5 4.5 0 1 1 9.5 25.5z" stroke="#000" strokeWidth="1.5" fill="#fff" />
      <path d="M15 15.5c-1.67-1-4.83 2-6 1.5M16 35h18" stroke="#000" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  'B': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <g stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 36c3.39-.47 5.5-2 5.5-5.43 0-3.86-1.3-3.86-1.3-7.29 0-4.22 3.12-5.71 5.55-9.29 2.43 3.58 5.55 5.07 5.55 9.29 0 3.43-1.3 3.43-1.3 7.29 0 3.43 2.11 4.96 5.5 5.43" fill="#fff" />
        <path d="M27 9l-4.5 4.5L18 9" fill="#fff" />
        <path d="M16 16.5l9.5 9.5" />
        <path d="M18.5 28.5l9.5-9.5" />
        <path d="M22.5 2.5v5" />
        <path d="M19.5 5h6" />
        <path d="M15 32h15M12 36.5h21" />
      </g>
    </svg>
  ),
  'R': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <g stroke="#000" strokeWidth="1.5" fill="#fff" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 39h27v-3H9v3zM12 36v-4h21v4M11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt" />
        <path d="M34 14l-3 3H14l-3-3" />
        <path d="M31 17v12.5H14V17" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
        <path d="M11 14h23" fill="none" stroke="none" />
      </g>
    </svg>
  ),
  'Q': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <g stroke="#000" strokeWidth="1.5" fill="#fff" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM10.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" />
        <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11z" />
        <path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 1 4.5 1 4.5h20s0-2 1-4.5c1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" />
        <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" />
      </g>
    </svg>
  ),
  'K': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <g stroke="#000" strokeWidth="1.5" fill="#fff" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.5 11.63V6M20 8h5" />
        <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" />
        <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 5.5-5 5.5l-2 1.5-4.5-4-4.5 4-2-1.5s-1-6.5-5-5.5c-3 6 6 10.5 6 10.5v7" />
        <path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0" fill="none" />
      </g>
    </svg>
  ),

  // Black Pieces
  'p': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" stroke="#fff" strokeWidth="1.5" fill="#111" strokeLinecap="round" />
    </svg>
  ),
  'n': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" stroke="#fff" strokeWidth="1.5" fill="#111" />
      <path d="M24 18c.38 2.32-2.58 2.9-3 3-3.65.65-5.04-2.33-5.5-4-.51-1.73-1.42-3-3.5-3-2.08 0-3.61 2.3-4 6-.38 3.7 2.08 5 4.5 5 2.42 0 4.08-2.3 4.5-5" stroke="#fff" strokeWidth="1.5" fill="#111" />
      <path d="M9.5 25.5A4.5 4.5 0 1 1 9.5 16.5 4.5 4.5 0 1 1 9.5 25.5z" stroke="#fff" strokeWidth="1.5" fill="#111" />
      <path d="M15 15.5c-1.67-1-4.83 2-6 1.5M16 35h18" stroke="#fff" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  'b': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <g stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 36c3.39-.47 5.5-2 5.5-5.43 0-3.86-1.3-3.86-1.3-7.29 0-4.22 3.12-5.71 5.55-9.29 2.43 3.58 5.55 5.07 5.55 9.29 0 3.43-1.3 3.43-1.3 7.29 0 3.43 2.11 4.96 5.5 5.43" fill="#111" />
        <path d="M27 9l-4.5 4.5L18 9" fill="#111" />
        <path d="M16 16.5l9.5 9.5" />
        <path d="M18.5 28.5l9.5-9.5" />
        <path d="M22.5 2.5v5" />
        <path d="M19.5 5h6" />
        <path d="M15 32h15M12 36.5h21" />
      </g>
    </svg>
  ),
  'r': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <g stroke="#fff" strokeWidth="1.5" fill="#111" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 39h27v-3H9v3zM12 36v-4h21v4M11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt" />
        <path d="M34 14l-3 3H14l-3-3" />
        <path d="M31 17v12.5H14V17" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
        <path d="M11 14h23" fill="none" stroke="none" />
      </g>
    </svg>
  ),
  'q': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <g stroke="#fff" strokeWidth="1.5" fill="#111" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM10.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" />
        <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11z" />
        <path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 1 4.5 1 4.5h20s0-2 1-4.5c1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" />
        <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" />
      </g>
    </svg>
  ),
  'k': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
      <g stroke="#fff" strokeWidth="1.5" fill="#111" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.5 11.63V6M20 8h5" />
        <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" />
        <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 5.5-5 5.5l-2 1.5-4.5-4-4.5 4-2-1.5s-1-6.5-5-5.5c-3 6 6 10.5 6 10.5v7" />
        <path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0" fill="none" />
      </g>
    </svg>
  )
};