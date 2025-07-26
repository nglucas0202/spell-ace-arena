import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { GameState, GameResult } from "@/types/game";
import { getRandomWords, getDifficultyById } from "@/data/words";
import { PenaltyType, calculatePenalty, getPenaltyForDifficulty } from "@/data/penalties";
import { Timer, Trophy, Target, Zap, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameInterfaceProps {
  difficulty: string;
  penaltyType?: PenaltyType;
  onGameComplete: (result: GameResult) => void;
  onBack: () => void;
}

const GAME_DURATION = 120; // 2 minutes

export const GameInterface = ({ difficulty, penaltyType, onGameComplete, onBack }: GameInterfaceProps) => {
  const { toast } = useToast();
  const selectedPenalty = penaltyType || getPenaltyForDifficulty(difficulty);
  const [gameState, setGameState] = useState<GameState>({
    words: [],
    currentWordIndex: 0,
    currentInput: "",
    score: 0,
    mistakes: 0,
    timeRemaining: GAME_DURATION,
    gameStatus: 'waiting',
    difficulty,
    penaltyType: selectedPenalty
  });

  const difficultyInfo = getDifficultyById(difficulty);

  const initializeGame = useCallback(() => {
    const words = getRandomWords(difficulty, 10).map(w => w.word);
    setGameState({
      words,
      currentWordIndex: 0,
      currentInput: "",
      score: 0,
      mistakes: 0,
      timeRemaining: GAME_DURATION,
      gameStatus: 'waiting',
      difficulty,
      penaltyType: selectedPenalty
    });
  }, [difficulty, selectedPenalty]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameState.gameStatus === 'playing' && gameState.timeRemaining > 0) {
      timer = setInterval(() => {
        setGameState(prev => {
          const newTime = prev.timeRemaining - 1;
          if (newTime <= 0) {
            finishGame();
            return { ...prev, timeRemaining: 0, gameStatus: 'finished' };
          }
          return { ...prev, timeRemaining: newTime };
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [gameState.gameStatus, gameState.timeRemaining]);

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStatus: 'playing',
      startTime: Date.now()
    }));
    toast({
      title: "Game Started!",
      description: "Type the words as fast as you can!",
    });
  };

  const finishGame = () => {
    const endTime = Date.now();
    const totalTime = gameState.startTime ? (endTime - gameState.startTime) / 1000 : GAME_DURATION;
    const wordsCompleted = gameState.currentWordIndex + (gameState.currentInput === gameState.words[gameState.currentWordIndex] ? 1 : 0);
    const accuracy = gameState.words.length > 0 ? ((wordsCompleted / gameState.words.length) * 100) : 0;
    const wordsPerMinute = (wordsCompleted / totalTime) * 60;

    const result: GameResult = {
      score: gameState.score,
      mistakes: gameState.mistakes,
      totalTime,
      wordsPerMinute,
      accuracy,
      difficulty,
      penaltyType: gameState.penaltyType
    };

    onGameComplete(result);
  };

  const handleInputChange = (value: string) => {
    if (gameState.gameStatus !== 'playing') return;

    setGameState(prev => ({ ...prev, currentInput: value }));

    const currentWord = gameState.words[gameState.currentWordIndex];
    
    if (value === currentWord) {
      // Correct word completed
      const newScore = gameState.score + (currentWord.length * 10);
      const nextIndex = gameState.currentWordIndex + 1;
      
      if (nextIndex >= gameState.words.length) {
        // All words completed
        setGameState(prev => ({
          ...prev,
          score: newScore,
          currentInput: "",
          gameStatus: 'finished'
        }));
        finishGame();
        return;
      }
      
      setGameState(prev => ({
        ...prev,
        currentWordIndex: nextIndex,
        currentInput: "",
        score: newScore
      }));
      
      toast({
        title: "Correct!",
        description: `+${currentWord.length * 10} points`,
        variant: "default",
      });
    } else if (value.length > currentWord.length) {
      // Word is too long, it's a mistake
      const newMistakeCount = gameState.mistakes + 1;
      const penalty = calculatePenalty(
        gameState.penaltyType, 
        newMistakeCount, 
        gameState.score, 
        gameState.timeRemaining
      );
      
      setGameState(prev => ({
        ...prev,
        mistakes: newMistakeCount,
        currentInput: "",
        score: Math.max(0, prev.score - penalty.scoreDeduction),
        timeRemaining: Math.max(0, prev.timeRemaining - penalty.timeDeduction),
        gameStatus: penalty.gameOver ? 'finished' : prev.gameStatus
      }));
      
      if (penalty.gameOver) {
        finishGame();
      }
      
      toast({
        title: "Incorrect!",
        description: penalty.message,
        variant: "destructive",
      });
    }
  };

  const currentWord = gameState.words[gameState.currentWordIndex] || "";
  const progress = gameState.words.length > 0 ? (gameState.currentWordIndex / gameState.words.length) * 100 : 0;
  const timeProgress = (gameState.timeRemaining / GAME_DURATION) * 100;

  if (gameState.gameStatus === 'waiting') {
    return (
      <div className="min-h-screen bg-game-bg flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 bg-gradient-game border-primary/20">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                Spell Ace Arena
              </h1>
              <p className={cn("text-xl", difficultyInfo?.color)}>
                {difficultyInfo?.name} Level
              </p>
            </div>
            
            <div className="bg-card/50 rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Game Rules</h2>
              <div className="text-left space-y-2 text-muted-foreground">
                <p>• Type 10 words as fast and accurately as possible</p>
                <p>• Each correct letter = 10 points × word length</p>
                <p>• Wrong words result in penalties</p>
                <p>• Complete all words or beat the clock!</p>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={onBack}>
                Back to Selection
              </Button>
              <Button variant="neon" size="xl" onClick={startGame}>
                Start Game
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-game-bg p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-game border-accent/20">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="text-xl font-bold text-accent">
                  {Math.floor(gameState.timeRemaining / 60)}:{(gameState.timeRemaining % 60).toString().padStart(2, '0')}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-game border-success/20">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Score</p>
                <p className="text-xl font-bold text-success">{gameState.score}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-game border-primary/20">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Words</p>
                <p className="text-xl font-bold text-primary">
                  {gameState.currentWordIndex}/{gameState.words.length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-game border-destructive/20">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Mistakes</p>
                <p className="text-xl font-bold text-destructive">{gameState.mistakes}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Bars */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Words Progress</span>
              <span>{gameState.currentWordIndex}/{gameState.words.length}</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Time Remaining</span>
              <span>{gameState.timeRemaining}s</span>
            </div>
            <Progress value={timeProgress} className="h-3" />
          </div>
        </div>

        {/* Main Game Area */}
        <Card className="p-8 bg-gradient-game border-primary/20">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">Word {gameState.currentWordIndex + 1}</p>
              <h2 className="text-6xl font-bold text-primary animate-bounce-in">
                {currentWord}
              </h2>
            </div>
            
            <div className="max-w-md mx-auto">
              <Input
                value={gameState.currentInput}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type the word here..."
                className="text-center text-2xl h-16 bg-background/50 border-primary/30 focus:border-primary"
                autoFocus
                disabled={gameState.gameStatus !== 'playing'}
              />
            </div>
            
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={onBack}>
                Exit Game
              </Button>
              <Button variant="secondary" onClick={initializeGame}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};