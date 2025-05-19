export const LEVEL = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
  EXPERT: "EXPERT",
};

export const DIFFICULTY = {
  [LEVEL.EASY]: 2,
  [LEVEL.MEDIUM]: 3,
  [LEVEL.HARD]: 5,
  [LEVEL.EXPERT]: 6,
} as const;
