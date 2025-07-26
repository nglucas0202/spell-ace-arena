export interface GameState {
  words: string[];
  currentWordIndex: number;
  currentInput: string;
  score: number;
  mistakes: number;
  timeRemaining: number;
  gameStatus: 'waiting' | 'playing' | 'finished';
  startTime?: number;
  endTime?: number;
  difficulty: string;
}

export interface GameResult {
  score: number;
  mistakes: number;
  totalTime: number;
  wordsPerMinute: number;
  accuracy: number;
  difficulty: string;
}