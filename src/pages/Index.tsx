import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DifficultyCard } from "@/components/DifficultyCard";
import { GameInterface } from "@/components/GameInterface";
import { GameResults } from "@/components/GameResults";
import { CompetitiveMode } from "@/components/CompetitiveMode";
import { DIFFICULTY_LEVELS } from "@/data/words";
import { GameResult } from "@/types/game";
import { PenaltyType } from "@/data/penalties";
import { Zap, Users, Target, Gamepad2 } from "lucide-react";

type GameMode = 'menu' | 'difficulty' | 'competitive' | 'game' | 'results';

const Index = () => {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [previousMode, setPreviousMode] = useState<GameMode>('menu');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedPenalty, setSelectedPenalty] = useState<PenaltyType>('none');
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const handleDifficultySelect = (difficultyId: string) => {
    setSelectedDifficulty(difficultyId);
    setSelectedPenalty('none'); // Reset to default for practice mode
    setPreviousMode('difficulty');
    setGameMode('game');
  };

  const handleCompetitiveStart = (difficultyId: string, penaltyType: PenaltyType) => {
    setSelectedDifficulty(difficultyId);
    setSelectedPenalty(penaltyType);
    setPreviousMode('competitive');
    setGameMode('game');
  };

  const handleGameComplete = (result: GameResult) => {
    setGameResult(result);
    setGameMode('results');
  };

  const handlePlayAgain = () => {
    setGameMode('game');
  };

  const handleBackToMenu = () => {
    setGameMode('menu');
    setSelectedDifficulty('');
    setSelectedPenalty('none');
    setGameResult(null);
  };

  const handleBackToDifficulty = () => {
    setGameMode('difficulty');
  };

  const handleBackToCompetitive = () => {
    setGameMode('competitive');
  };

  if (gameMode === 'game') {
    return (
      <GameInterface
        difficulty={selectedDifficulty}
        penaltyType={selectedPenalty}
        onGameComplete={handleGameComplete}
        onBack={previousMode === 'competitive' ? handleBackToCompetitive : handleBackToDifficulty}
      />
    );
  }

  if (gameMode === 'competitive') {
    return (
      <CompetitiveMode
        onStartGame={handleCompetitiveStart}
        onBack={handleBackToMenu}
      />
    );
  }

  if (gameMode === 'results' && gameResult) {
    return (
      <GameResults
        result={gameResult}
        onPlayAgain={handlePlayAgain}
        onBackToMenu={handleBackToMenu}
      />
    );
  }

  if (gameMode === 'difficulty') {
    return (
      <div className="min-h-screen bg-game-bg p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              Choose Your Challenge
            </h1>
            <p className="text-xl text-muted-foreground">
              Select a difficulty level to start your spelling race
            </p>
            <Button variant="outline" onClick={handleBackToMenu}>
              Back to Menu
            </Button>
          </div>

          {/* Difficulty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFICULTY_LEVELS.map((difficulty) => (
              <DifficultyCard
                key={difficulty.id}
                difficulty={difficulty}
                onSelect={handleDifficultySelect}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-game-bg flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-neon bg-clip-text text-transparent animate-glow-pulse">
              Spell Ace Arena
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              The ultimate competitive spelling challenge
            </p>
          </div>
          
          <div className="text-4xl animate-neon-flow">
            ⚡🏆⚡
          </div>
        </div>

        {/* Game Modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-game border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Target className="h-16 w-16 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary">Practice Mode</h2>
              <p className="text-muted-foreground">
                Sharpen your spelling skills across 6 difficulty levels
              </p>
              <Button 
                variant="game" 
                size="xl" 
                onClick={() => setGameMode('difficulty')}
                className="w-full"
              >
                Quick Practice
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-game border-accent/20 hover:border-accent/50 transition-all duration-300 hover:scale-105">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Gamepad2 className="h-16 w-16 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-accent">Competitive Mode</h2>
              <p className="text-muted-foreground">
                Custom challenges with penalty systems
              </p>
              <Button 
                variant="neon" 
                size="xl" 
                onClick={() => setGameMode('competitive')}
                className="w-full"
              >
                Custom Challenge
              </Button>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/50 border-success/20">
            <div className="text-center space-y-3">
              <Zap className="h-12 w-12 text-success mx-auto" />
              <h3 className="text-lg font-semibold text-success">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Race against time with real-time scoring
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 border-accent/20">
            <div className="text-center space-y-3">
              <Target className="h-12 w-12 text-accent mx-auto" />
              <h3 className="text-lg font-semibold text-accent">Skill Levels</h3>
              <p className="text-sm text-muted-foreground">
                From 1st grade to championship level
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 border-primary/20">
            <div className="text-center space-y-3">
              <Users className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-lg font-semibold text-primary">Competitive</h3>
              <p className="text-sm text-muted-foreground">
                Track your progress and improve
              </p>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Ready to become a spelling champion?
          </p>
          <Button 
            variant="game" 
            size="xl" 
            onClick={() => setGameMode('difficulty')}
          >
            Enter the Arena
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;