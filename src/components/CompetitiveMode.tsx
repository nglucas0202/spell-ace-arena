import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DifficultyCard } from "@/components/DifficultyCard";
import { PenaltyCard } from "@/components/PenaltyCard";
import { DIFFICULTY_LEVELS } from "@/data/words";
import { PENALTY_SYSTEMS, PenaltyType } from "@/data/penalties";
import { Target, Zap } from "lucide-react";

interface CompetitiveModeProps {
  onStartGame: (difficulty: string, penaltyType: PenaltyType) => void;
  onBack: () => void;
}

export const CompetitiveMode = ({ onStartGame, onBack }: CompetitiveModeProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedPenalty, setSelectedPenalty] = useState<PenaltyType>('none');

  const handleStartGame = () => {
    if (selectedDifficulty) {
      onStartGame(selectedDifficulty, selectedPenalty);
    }
  };

  return (
    <div className="min-h-screen bg-game-bg p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-neon bg-clip-text text-transparent">
            Custom Challenge
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your difficulty and penalty system
          </p>
          <Button variant="outline" onClick={onBack}>
            Back to Menu
          </Button>
        </div>

        {/* Difficulty Selection */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-primary">
              1. Select Difficulty Level
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIFFICULTY_LEVELS.map((difficulty) => (
              <DifficultyCard
                key={difficulty.id}
                difficulty={difficulty}
                onSelect={setSelectedDifficulty}
                isSelected={selectedDifficulty === difficulty.id}
              />
            ))}
          </div>
        </div>

        {/* Penalty Selection */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-accent">
              2. Choose Penalty System
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PENALTY_SYSTEMS.map((penalty) => (
              <PenaltyCard
                key={penalty.id}
                penalty={penalty}
                onSelect={(id) => setSelectedPenalty(id as PenaltyType)}
                isSelected={selectedPenalty === penalty.id}
              />
            ))}
          </div>
        </div>

        {/* Start Game */}
        <div className="text-center space-y-4">
          <div className="bg-card/30 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-3">Challenge Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty:</span>
                <span className="font-medium">
                  {selectedDifficulty ? 
                    DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty)?.name : 
                    'None selected'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Penalty:</span>
                <span className="font-medium">
                  {PENALTY_SYSTEMS.find(p => p.id === selectedPenalty)?.name}
                </span>
              </div>
            </div>
          </div>

          <Button 
            variant="neon" 
            size="xl" 
            onClick={handleStartGame}
            disabled={!selectedDifficulty}
            className="px-12"
          >
            Start Custom Challenge
          </Button>
        </div>
      </div>
    </div>
  );
};