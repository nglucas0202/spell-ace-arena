import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameResult } from "@/types/game";
import { getDifficultyById } from "@/data/words";
import { Trophy, Target, Timer, Zap, RotateCcw, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameResultsProps {
  result: GameResult;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const GameResults = ({ result, onPlayAgain, onBackToMenu }: GameResultsProps) => {
  const difficultyInfo = getDifficultyById(result.difficulty);
  
  const getPerformanceRating = (accuracy: number) => {
    if (accuracy >= 90) return { rating: "Champion!", color: "text-neon-cyan", glow: "shadow-accent" };
    if (accuracy >= 75) return { rating: "Excellent!", color: "text-success", glow: "shadow-success" };
    if (accuracy >= 60) return { rating: "Good Job!", color: "text-primary", glow: "shadow-neon" };
    if (accuracy >= 40) return { rating: "Keep Practicing!", color: "text-warning", glow: "" };
    return { rating: "Try Again!", color: "text-destructive", glow: "" };
  };

  const performance = getPerformanceRating(result.accuracy);

  return (
    <div className="min-h-screen bg-game-bg flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-gradient-game border-primary/20">
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className={cn("text-6xl animate-bounce-in", performance.glow)}>
              🏆
            </div>
            <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              Game Complete!
            </h1>
            <p className={cn("text-2xl font-semibold", performance.color)}>
              {performance.rating}
            </p>
            <p className={cn("text-lg", difficultyInfo?.color)}>
              {difficultyInfo?.name} Level
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-card/50 border-success/20">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-success" />
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Final Score</p>
                  <p className="text-2xl font-bold text-success">{result.score}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 border-primary/20">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-2xl font-bold text-primary">{result.accuracy.toFixed(1)}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 border-accent/20">
              <div className="flex items-center gap-3">
                <Timer className="h-8 w-8 text-accent" />
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Words/Min</p>
                  <p className="text-2xl font-bold text-accent">{result.wordsPerMinute.toFixed(1)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 border-destructive/20">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-destructive" />
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Mistakes</p>
                  <p className="text-2xl font-bold text-destructive">{result.mistakes}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Performance Analysis */}
          <Card className="p-6 bg-card/30 border-muted/20">
            <h3 className="text-lg font-semibold mb-4">Performance Analysis</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Time:</span>
                <span className="font-medium">{result.totalTime.toFixed(1)}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty:</span>
                <span className={cn("font-medium", difficultyInfo?.color)}>
                  {difficultyInfo?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Challenge Rating:</span>
                <div className="flex gap-1">
                  {Array.from({ length: difficultyInfo?.level || 1 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={cn("w-3 h-3 rounded-full", difficultyInfo?.color.replace('text-', 'bg-'))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={onBackToMenu} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Menu
            </Button>
            <Button variant="neon" onClick={onPlayAgain} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Play Again
            </Button>
          </div>

          {/* Encouragement Message */}
          <div className="text-sm text-muted-foreground italic">
            {result.accuracy >= 90 && "Outstanding spelling skills! You're ready for the championship!"}
            {result.accuracy >= 75 && result.accuracy < 90 && "Great work! Keep practicing to reach champion level!"}
            {result.accuracy >= 60 && result.accuracy < 75 && "Nice progress! Try a higher difficulty next time!"}
            {result.accuracy < 60 && "Every expert was once a beginner. Keep practicing!"}
          </div>
        </div>
      </Card>
    </div>
  );
};