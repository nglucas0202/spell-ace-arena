import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenaltySystem } from "@/data/penalties";
import { cn } from "@/lib/utils";

interface PenaltyCardProps {
  penalty: PenaltySystem;
  onSelect: (penaltyId: string) => void;
  isSelected?: boolean;
}

export const PenaltyCard = ({ penalty, onSelect, isSelected }: PenaltyCardProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-success border-success/20';
      case 'medium': return 'text-warning border-warning/20';
      case 'high': return 'text-destructive border-destructive/20';
      case 'extreme': return 'text-neon-purple border-neon-purple/20';
      default: return 'text-muted border-muted/20';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-success/10';
      case 'medium': return 'bg-warning/10';
      case 'high': return 'bg-destructive/10';
      case 'extreme': return 'bg-neon-purple/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer border-2",
      getSeverityColor(penalty.severity),
      isSelected ? "shadow-neon scale-105" : "hover:shadow-accent"
    )}>
      <div 
        className={cn("p-6", getSeverityBg(penalty.severity))}
        onClick={() => onSelect(penalty.id)}
      >
        <div className="text-center space-y-4">
          <div className="text-4xl">{penalty.icon}</div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold">{penalty.name}</h3>
            <p className="text-sm text-muted-foreground">{penalty.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              getSeverityColor(penalty.severity),
              getSeverityBg(penalty.severity)
            )}>
              {penalty.severity.toUpperCase()}
            </span>
            <Button 
              variant={penalty.severity === 'extreme' ? 'neon' : 'game'} 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(penalty.id);
              }}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};