import { atom } from "nanostores";

export const GRID_LENGTH = 9;
export const MAX_MOVES = 10;

export const GAME_STATE = {
  PLAYER_TURN: "player_turn",
  AI_TURN: "ai_turn",
  PLAYER_WON: "player_won",
  AI_WON: "player_o_won",
  DRAW: "game_draw",
  ERROR: "game_error",
};

export const SPACE_STATE = {
  PLAYER: "player_filled",
  AI: "ai_filled",
  EMPTY: "empty_space",
};

// Calculate the best space for the AI to fill to get a perfect game.
export const calculateAITurn = (grid: any, moveCount: any) => {
  let aiSpace: any = aiCanWin(grid);

  if (Number.isInteger(aiSpace)) {
    return aiSpace;
  }

  aiSpace = aiCanBlock(grid);

  if (Number.isInteger(aiSpace)) {
    return aiSpace;
  }

  aiSpace = aiCanBlockFork(grid, moveCount);

  if (Number.isInteger(aiSpace)) {
    return aiSpace;
  }

  aiSpace = aiCanCenter(grid);

  if (Number.isInteger(aiSpace)) {
    return aiSpace;
  }

  aiSpace = aiCanFillOppositeCorner(grid);

  if (Number.isInteger(aiSpace)) {
    return aiSpace;
  }

  aiSpace = aiCanFillEmptyCorner(grid);

  if (Number.isInteger(aiSpace)) {
    return aiSpace;
  }

  aiSpace = aiCanFillEmptySide(grid);

  if (Number.isInteger(aiSpace)) {
    return aiSpace;
  }

  return null;
};

// Convert row, col to grid index.
const convertCordToIndex = (row: number, col: number) => {
  return row * 3 + col;
};
/**
 * Check if AI can win
 * @returns Space for AI to win
 */
const aiCanWin = (grid: any) => {
  let count = 0;
  let row = 0,
    col = 0;

  // Check Rows
  for (let i = 0; i < 3; ++i) {
    count = 0;

    for (let j = 0; j < 3; ++j) {
      if (grid[convertCordToIndex(i, j)] === SPACE_STATE.AI) {
        count++;
      } else if (grid[convertCordToIndex(i, j)] === SPACE_STATE.PLAYER) {
        count--;
      } else if (grid[convertCordToIndex(i, j)] === SPACE_STATE.EMPTY) {
        row = i;
        col = j;
      }
    }

    // Has two consecutive spaces, return third to win.
    if (count === 2) {
      return convertCordToIndex(row, col);
    }
  }

  // Check Cols
  for (let i = 0; i < 3; ++i) {
    count = 0;

    for (let j = 0; j < 3; ++j) {
      if (grid[convertCordToIndex(j, i)] === SPACE_STATE.AI) {
        count++;
      } else if (grid[convertCordToIndex(j, i)] === SPACE_STATE.PLAYER) {
        count--;
      } else if (grid[convertCordToIndex(j, i)] === SPACE_STATE.EMPTY) {
        row = j;
        col = i;
      }
    }

    // Has two consecutive spaces, return third to win.
    if (count === 2) {
      return convertCordToIndex(row, col);
    }
  }

  count = 0;

  // Check Diag
  for (let i = 0; i < 3; ++i) {
    if (grid[convertCordToIndex(i, i)] === SPACE_STATE.AI) {
      count++;
    } else if (grid[convertCordToIndex(i, i)] === SPACE_STATE.PLAYER) {
      count--;
    } else if (grid[convertCordToIndex(i, i)] === SPACE_STATE.EMPTY) {
      row = i;
      col = i;
    }
  }

  // Has two consecutive spaces, return third to win.
  if (count === 2) {
    return convertCordToIndex(row, col);
  }

  count = 0;

  // Check Anti-Diag
  for (let i = 0; i < 3; ++i) {
    if (grid[convertCordToIndex(i, 3 - 1 - i)] === SPACE_STATE.AI) {
      count++;
    } else if (grid[convertCordToIndex(i, 3 - 1 - i)] === SPACE_STATE.PLAYER) {
      count--;
    } else if (grid[convertCordToIndex(i, 3 - 1 - i)] === SPACE_STATE.EMPTY) {
      row = i;
      col = 3 - 1 - i;
    }
  }

  // Has two consecutive spaces, return third to win.
  if (count === 2) {
    return convertCordToIndex(row, col);
  }

  return null;
};

/**
 * Ai checks if it can block opponents win
 * @returns Can ai block opponent
 */
function aiCanBlock(grid: any) {
  let count = 0;
  let row = 0,
    col = 0;

  // Check Rows
  for (let i = 0; i < 3; ++i) {
    count = 0;

    for (let j = 0; j < 3; ++j) {
      if (grid[convertCordToIndex(i, j)] === SPACE_STATE.PLAYER) {
        count++;
      } else if (grid[convertCordToIndex(i, j)] === SPACE_STATE.AI) {
        count--;
      } else if (grid[convertCordToIndex(i, j)] === SPACE_STATE.EMPTY) {
        row = i;
        col = j;
      }
    }

    // Opponent two consecutive spaces, return third to block.
    if (count === 2) {
      return convertCordToIndex(row, col);
    }
  }

  // Check Cols
  for (let i = 0; i < 3; ++i) {
    count = 0;

    for (let j = 0; j < 3; ++j) {
      if (grid[convertCordToIndex(j, i)] === SPACE_STATE.PLAYER) {
        count++;
      } else if (grid[convertCordToIndex(j, i)] === SPACE_STATE.AI) {
        count--;
      } else if (grid[convertCordToIndex(j, i)] === SPACE_STATE.EMPTY) {
        row = j;
        col = i;
      }
    }

    // Opponent two consecutive spaces, return third to block.
    if (count === 2) {
      return convertCordToIndex(row, col);
    }
  }

  count = 0;

  // Check Diag
  for (let i = 0; i < 3; ++i) {
    if (grid[convertCordToIndex(i, i)] === SPACE_STATE.PLAYER) {
      count++;
    } else if (grid[convertCordToIndex(i, i)] === SPACE_STATE.AI) {
      count--;
    } else if (grid[convertCordToIndex(i, i)] === SPACE_STATE.EMPTY) {
      row = i;
      col = i;
    }
  }

  // Opponent two consecutive spaces, return third to block.
  if (count === 2) {
    return convertCordToIndex(row, col);
  }

  count = 0;

  // Check Anti-Diag
  for (let i = 0; i < 3; ++i) {
    if (grid[convertCordToIndex(i, 3 - 1 - i)] === SPACE_STATE.PLAYER) {
      count++;
    } else if (grid[convertCordToIndex(i, 3 - 1 - i)] === SPACE_STATE.AI) {
      count--;
    } else if (grid[convertCordToIndex(i, 3 - 1 - i)] === SPACE_STATE.EMPTY) {
      row = i;
      col = 3 - 1 - i;
    }
  }

  // Opponent two consecutive spaces, return third to block.
  if (count === 2) {
    return convertCordToIndex(row, col);
  }

  return null;
}

/**
 * Ai checks if it can block a fork
 * @returns Can ai block opponent
 */
function aiCanBlockFork(grid: any, moveCount: number) {
  if (moveCount === 3) {
    if (
      grid[convertCordToIndex(0, 0)] === SPACE_STATE.PLAYER &&
      grid[convertCordToIndex(1, 1)] === SPACE_STATE.AI &&
      grid[convertCordToIndex(2, 2)] === SPACE_STATE.PLAYER
    ) {
      aiCanFillEmptySide(grid);
      return true;
    }
    if (
      grid[convertCordToIndex(2, 0)] === SPACE_STATE.PLAYER &&
      grid[convertCordToIndex(1, 1)] === SPACE_STATE.AI &&
      grid[convertCordToIndex(0, 2)] === SPACE_STATE.PLAYER
    ) {
      aiCanFillEmptySide(grid);
      return true;
    }
    if (
      grid[convertCordToIndex(2, 1)] === SPACE_STATE.PLAYER &&
      grid[convertCordToIndex(1, 2)] === SPACE_STATE.PLAYER
    ) {
      return convertCordToIndex(2, 2);
    }
  }

  return null;
}

/**
 * Ai checks if it can fill center square
 * @returns Can ai fill center square
 */
function aiCanCenter(grid: any) {
  if (grid[convertCordToIndex(1, 1)] === SPACE_STATE.EMPTY) {
    return convertCordToIndex(1, 1);
  }
  return false;
}

/**
 * Ai checks if it can fill opposite corner
 * @returns Can ai fill opposite corner
 */
function aiCanFillOppositeCorner(grid: any) {
  if (
    grid[convertCordToIndex(0, 0)] === SPACE_STATE.PLAYER &&
    grid[convertCordToIndex(2, 2)] === SPACE_STATE.EMPTY
  ) {
    return convertCordToIndex(2, 2);
  }

  if (
    grid[convertCordToIndex(2, 2)] === SPACE_STATE.PLAYER &&
    grid[convertCordToIndex(0, 0)] === SPACE_STATE.EMPTY
  ) {
    return convertCordToIndex(0, 0);
  }

  if (
    grid[convertCordToIndex(0, 2)] === SPACE_STATE.PLAYER &&
    grid[convertCordToIndex(2, 0)] === SPACE_STATE.EMPTY
  ) {
    return convertCordToIndex(2, 0);
  }

  if (
    grid[convertCordToIndex(2, 0)] === SPACE_STATE.PLAYER &&
    grid[convertCordToIndex(0, 2)] === SPACE_STATE.EMPTY
  ) {
    return convertCordToIndex(0, 2);
  }

  return null;
}

/**
 * Ai checks if it can fill empty corner
 * @returns Can ai fill empty corner
 */
function aiCanFillEmptyCorner(grid: any) {
  if (grid[convertCordToIndex(0, 0)] === SPACE_STATE.EMPTY) {
    return convertCordToIndex(0, 0);
  }

  if (grid[convertCordToIndex(0, 2)] === SPACE_STATE.EMPTY) {
    return convertCordToIndex(0, 2);
  }

  if (grid[convertCordToIndex(2, 0)] === SPACE_STATE.EMPTY) {
    return convertCordToIndex(2, 0);
  }

  if (grid[convertCordToIndex(2, 2)] === SPACE_STATE.EMPTY) {
    return convertCordToIndex(2, 2);
  }

  return null;
}

/**
 * Ai checks if it can fill empty side
 * @returns Can ai fill empty side
 */
function aiCanFillEmptySide(grid: any) {
  if (grid[convertCordToIndex(0, 1)] === SPACE_STATE.EMPTY) {
    return convertCordToIndex(0, 1);
  }

  if (grid[convertCordToIndex(1, 0)] === SPACE_STATE.EMPTY) {
    return convertCordToIndex(1, 0);
  }

  if (grid[convertCordToIndex(1, 2)] === SPACE_STATE.EMPTY) {
    return convertCordToIndex(1, 2);
  }

  if (grid[convertCordToIndex(2, 1)] === SPACE_STATE.EMPTY) {
    return convertCordToIndex(2, 1);
  }

  return null;
}

const createEmptyGrid = () => {
  return Array(GRID_LENGTH).fill(SPACE_STATE.EMPTY);
};

export const getSpaceStateClass = (
  spaceState: string,
  gameState: string,
  winSpaces: any[],
  spaceIndex: number
) => {
  let space: string[] = [];

  if (spaceState === SPACE_STATE.AI) {
    space.push("o-player");

    if (gameState === GAME_STATE.AI_WON && winSpaces.includes(spaceIndex)) {
      space.push("o-winner");
    }
  }

  if (spaceState === SPACE_STATE.PLAYER) {
    space.push("x-player");

    if (gameState === GAME_STATE.PLAYER_WON && winSpaces.includes(spaceIndex)) {
      space.push("x-winner");
    }
  }

  return space;
};

export const getSquareSymbol = (spaceStatus: keyof typeof SPACE_STATE) => {
  switch (spaceStatus) {
    case SPACE_STATE.PLAYER: {
      return "X";
    }
    case SPACE_STATE.AI: {
      return "O";
    }
    case SPACE_STATE.EMPTY: {
      return "";
    }
    default: {
      return "";
    }
  }
};

const isDraw = (moveCount: number) => {
  return moveCount === MAX_MOVES;
};

export const checkWinner = (grid: any, moveCount: number) => {
  const winnerSpaces = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  if (isDraw(moveCount)) {
    return {
      winner: GAME_STATE.DRAW,
      winSpaces: [],
    };
  }

  for (let i = 0; i < winnerSpaces.length; i++) {
    const [a, b, c] = winnerSpaces[i];

    if (
      grid[a] === SPACE_STATE.EMPTY &&
      grid[b] === SPACE_STATE.EMPTY &&
      grid[c] === SPACE_STATE.EMPTY
    ) {
      continue;
    }

    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      let winner = null;

      if (grid[a] === SPACE_STATE.PLAYER) {
        winner = GAME_STATE.PLAYER_WON;
      } else {
        winner = GAME_STATE.AI_WON;
      }

      return {
        winner: winner,
        winSpaces: [a, b, c],
      };
    }
  }

  return null;
};

export const handlePlayerClick = (gridIndex: number) => {
  if (gameState.get() !== GAME_STATE.PLAYER_TURN) {
    return;
  }

  if (grid.get()[gridIndex] === SPACE_STATE.EMPTY) {
    fillGridSpace(gridIndex, SPACE_STATE.PLAYER);
    gameState.set(GAME_STATE.AI_TURN);
    moveCount.set(moveCount.get() + 1);
  }
};

// Reset state to default values
export const reset = () => {
  grid.set(createEmptyGrid());
  gameState.set(GAME_STATE.PLAYER_TURN);
  moveCount.set(0);
  winSpaces.set([]);

  const squareIcons = document.querySelectorAll(".square-icon");
  squareIcons.forEach((icon) => {
    icon.classList.add("hidden");
  });

  const squareItem = document.querySelectorAll(".square-item");
  squareItem.forEach((item) => {
    item.classList.remove("x-player", "x-winner", "o-player", "o-winner");
  });
};

// Fill in a grid box with status
export const fillGridSpace = (gridIndex: number, spaceStatus: any) => {
  let temp = grid.get();
  temp[gridIndex] = spaceStatus;
  grid.set([...temp]);

  const cross = document.getElementById(`square-${gridIndex}-icon-X`);
  const circle = document.getElementById(`square-${gridIndex}-icon-0`);

  if (spaceStatus === SPACE_STATE.PLAYER) {
    cross?.classList.remove("hidden");
    circle?.classList.add("hidden");
  } else {
    cross?.classList.add("hidden");
    circle?.classList.remove("hidden");
  }

  const classes = getSpaceStateClass(
    spaceStatus,
    gameState.get(),
    winSpaces.get(),
    Number(gridIndex)
  );
  const square = document.getElementById(`square-${gridIndex}`);
  if (square) {
    square.classList.remove("x-player", "x-winner", "o-player", "o-winner");
    square.classList.add(...classes);
  }
};

// convert to atom
export const grid = atom(createEmptyGrid());
// // Count of all moves made
export const moveCount = atom(0);
// // Spaces used to get a win
export const winSpaces = atom<number[]>([]);
// // Current game state
export const gameState = atom(GAME_STATE.PLAYER_TURN);
