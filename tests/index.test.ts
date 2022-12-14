import { GomokuBoard } from "../src/index";
import { expect, jest, test } from "@jest/globals";

const EMPTY = 0;
const CIRCLE = 1;
const CROSS = 2;

const board = new GomokuBoard(15, 15, 5, true);
test("", () => {
  board.setStone(0, 0, CIRCLE);
  expect(board.isPositionEmpty(0, 0)).toBe(false);
});
test("", () => {
  expect(board.getStone(0, 0)).toBe(CIRCLE);
});

describe("Given winning situations:", () => {
  describe("Nonexact length:", () => {
    test("Horizontal", () => {
      const board = new GomokuBoard(15, 15, 5, true);
      for (let i = 0; i < 5; i++) {
        board.setStone(i, 0, CIRCLE);
      }
      expect(board.hasWon(CIRCLE, 4, 0)).toBe(true);
    });
    test("Vertical easy", () => {
      const board = new GomokuBoard(15, 15, 5, true);
      for (let i = 0; i < 5; i++) {
        board.setStone(0, i, CIRCLE);
      }
      expect(board.hasWon(CIRCLE, 0, 4)).toBe(true);
    });

    test("Diagonal easy", () => {
      const board = new GomokuBoard(15, 15, 5, true);
      for (let i = 0; i < 5; i++) {
        board.setStone(i, i, CIRCLE);
      }
      expect(board.hasWon(CIRCLE, 4, 4)).toBe(true);
    });
  });
});

test("Exact horizontal", () => {
  const board = new GomokuBoard(15, 15, 5, true);
  for (let i = 0; i < 6; i++) {
    board.setStone(i, i, CIRCLE);
  }
  expect(board.hasWon(CIRCLE, 0, 0)).toBe(false);
});

test("Non-exact horizontal", () => {
  const board = new GomokuBoard(15, 15, 5, false);
  for (let i = 0; i < 6; i++) {
    board.setStone(i, i, CIRCLE);
  }
  expect(board.hasWon(CIRCLE, 0, 0)).toBe(true);
});

test("Interrupted line", () => {
  const board = new GomokuBoard(15, 15, 5, false);
  board.setStone(0, 0, CIRCLE);
  board.setStone(0, 1, CIRCLE);
  board.setStone(0, 2, CIRCLE);
  board.setStone(0, 3, CIRCLE);
  board.setStone(0, 4, CROSS);
  board.setStone(0, 5, CIRCLE);
  expect(board.hasWon(CIRCLE, 0, 3)).toBe(false);
});

describe("Winning combinations:", () => {
  test("Incorrect", () => {
    const board = new GomokuBoard(15, 15, 5, true);
    for (let i = 0; i < 5; i++) {
      board.setStone(i, 0, CIRCLE);
    }

    board.hasWon(CIRCLE, 0, 0);

    const positions = [
      [0, 0],
      [1, 2],
      [2, 0],
      [3, 0],
      [4, 0],
    ];

    expect(board.getWinningCombination()).not.toEqual(positions);
  });

  test("Start vertical", () => {
    const board = new GomokuBoard(15, 15, 5, true);
    for (let i = 0; i < 5; i++) {
      board.setStone(0, i, CROSS);
    }

    board.hasWon(CROSS, 0, 0);

    const positions = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ];

    expect(board.getWinningCombination()).toEqual(positions);
  });

  test("Start horizontal", () => {
    const board = new GomokuBoard(15, 15, 5, true);
    for (let i = 0; i < 5; i++) {
      board.setStone(i, 0, CIRCLE);
    }

    board.hasWon(CIRCLE, 0, 0);

    const positions = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ];

    expect(board.getWinningCombination()).toEqual(positions);
  });

  test("Middle vertical", () => {
    const board = new GomokuBoard(15, 15, 5, true);
    for (let i = 0; i < 5; i++) {
      board.setStone(1, i, CROSS);
    }

    expect(board.hasWon(CROSS, 1, 2)).toBeTruthy();

    const positions = [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ];

    expect(board.getWinningCombination()).toEqual(positions);
  });

  test("Middle horizontal", () => {
    const board = new GomokuBoard(15, 15, 5, true);
    for (let i = 0; i < 5; i++) {
      board.setStone(i, 1, CROSS);
    }

    expect(board.hasWon(CROSS, 2, 1)).toBeTruthy();

    const positions = [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ];

    expect(board.getWinningCombination()).toEqual(positions);
  });

  test("End vertical", () => {
    const board = new GomokuBoard(15, 15, 5, true);
    for (let i = 0; i < 5; i++) {
      board.setStone(1, i, CROSS);
    }

    expect(board.hasWon(CROSS, 1, 4)).toBeTruthy();

    const positions = [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ];

    expect(board.getWinningCombination()).toEqual(positions);
  });

  test("End vertical, with spaces around", () => {
    const board = new GomokuBoard(15, 15, 5, true);
    for (let i = 6; i < 11; i++) {
      board.setStone(1, i, CROSS);
    }

    expect(board.hasWon(CROSS, 1, 10)).toBeTruthy();

    const positions = [
      [1, 6],
      [1, 7],
      [1, 8],
      [1, 9],
      [1, 10],
    ];

    expect(board.getWinningCombination()).toEqual(positions);
  });
});
