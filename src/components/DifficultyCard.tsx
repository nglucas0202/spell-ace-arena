import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DifficultyLevel } from "@/data/words";
import { cn } from "@/lib/utils";

interface DifficultyCardProps {
  difficulty: DifficultyLevel;
  onSelect: (difficultyId: string) => void;
  isSelected?: boolean;
}

export const DifficultyCard = ({ difficulty, onSelect, isSelected }: DifficultyCardProps) => {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer border-2",
      isSelected 
        ? "border-primary shadow-neon" 
        : "border-border hover:border-primary/50"
    )}>
      <div 
        className="p-6 bg-gradient-game"
        onClick={() => onSelect(difficulty.id)}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn("text-xl font-bold", difficulty.color)}>
            {difficulty.name}
          </h3>
          <div className="flex items-center gap-1">
            {Array.from({ length: difficulty.level }).map((_, i) => (
              <div 
                key={i} 
                className={cn("w-3 h-3 rounded-full", difficulty.color.replace('text-', 'bg-'))}
              />
            ))}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">
          {difficulty.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Level {difficulty.level}
          </span>
          <Button 
            variant="game" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(difficulty.id);
            }}
          >
            Select
          </Button>
        </div>
      </div>
    </Card>
  );
};