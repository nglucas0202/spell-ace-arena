export type PenaltyType = 'none' | 'points' | 'time' | 'strikes' | 'progressive';

export interface PenaltySystem {
  id: PenaltyType;
  name: string;
  description: string;
  icon: string;
  severity: 'low' | 'medium' | 'high' | 'extreme';
}

export const PENALTY_SYSTEMS: PenaltySystem[] = [
  {
    id: 'none',
    name: 'Practice Mode',
    description: 'No penalties - just track mistakes',
    icon: '🎯',
    severity: 'low'
  },
  {
    id: 'points',
    name: 'Point Deduction',
    description: 'Lose 100 points per mistake',
    icon: '💰',
    severity: 'medium'
  },
  {
    id: 'time',
    name: 'Time Penalty',
    description: 'Lose 10 seconds per mistake',
    icon: '⏰',
    severity: 'medium'
  },
  {
    id: 'strikes',
    name: 'Three Strikes',
    description: 'Game ends after 3 mistakes',
    icon: '⚾',
    severity: 'high'
  },
  {
    id: 'progressive',
    name: 'Progressive Penalty',
    description: 'Increasing penalty: 50, 100, 200 points...',
    icon: '📈',
    severity: 'extreme'
  }
];

export function getPenaltyForDifficulty(difficultyId: string): PenaltyType {
  // Automatic strict penalties for highest levels
  if (difficultyId === 'high' || difficultyId === 'championship') {
    return 'points';
  }
  return 'none';
}

export function calculatePenalty(
  penaltyType: PenaltyType, 
  mistakeCount: number, 
  currentScore: number, 
  timeRemaining: number
): {
  scoreDeduction: number;
  timeDeduction: number;
  gameOver: boolean;
  message: string;
} {
  switch (penaltyType) {
    case 'points':
      return {
        scoreDeduction: 100,
        timeDeduction: 0,
        gameOver: false,
        message: '-100 points penalty!'
      };
      
    case 'time':
      return {
        scoreDeduction: 0,
        timeDeduction: 10,
        gameOver: false,
        message: '-10 seconds penalty!'
      };
      
    case 'strikes':
      const gameOver = mistakeCount >= 3;
      return {
        scoreDeduction: 0,
        timeDeduction: 0,
        gameOver,
        message: gameOver ? 'Three strikes - Game Over!' : `Strike ${mistakeCount}/3`
      };
      
    case 'progressive':
      const progressiveDeduction = 50 * Math.pow(2, mistakeCount - 1); // 50, 100, 200, 400...
      return {
        scoreDeduction: progressiveDeduction,
        timeDeduction: 0,
        gameOver: false,
        message: `-${progressiveDeduction} points penalty!`
      };
      
    default: // 'none'
      return {
        scoreDeduction: 0,
        timeDeduction: 0,
        gameOver: false,
        message: 'Try again!'
      };
  }
}