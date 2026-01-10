import { Button } from '@/components/ui/button';
import { Difficulty, difficultyLabels, difficultyPoints } from '@/data/questions';
import { cn } from '@/lib/utils';

interface DifficultySelectorProps {
  selected: Difficulty | 'all';
  onSelect: (difficulty: Difficulty | 'all') => void;
}

const difficulties: (Difficulty | 'all')[] = ['all', 'easy', 'medium', 'hard'];

export function DifficultySelector({ selected, onSelect }: DifficultySelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground text-center">Difficulty</h3>
      <div className="flex gap-2">
        {difficulties.map((difficulty) => (
          <Button
            key={difficulty}
            variant="glass"
            size="lg"
            onClick={() => onSelect(difficulty)}
            className={cn(
              'flex-1 flex-col h-auto py-3 gap-0.5',
              selected === difficulty && 'border-primary bg-primary/20',
              difficulty === 'easy' && selected === difficulty && 'border-success bg-success/20',
              difficulty === 'medium' && selected === difficulty && 'border-warning bg-warning/20',
              difficulty === 'hard' && selected === difficulty && 'border-destructive bg-destructive/20',
            )}
          >
            <span className={cn(
              'font-bold',
              difficulty === 'easy' && 'text-success',
              difficulty === 'medium' && 'text-warning',
              difficulty === 'hard' && 'text-destructive',
            )}>
              {difficulty === 'all' ? 'Mixed' : difficultyLabels[difficulty]}
            </span>
            {difficulty !== 'all' && (
              <span className="text-xs text-muted-foreground">
                +{difficultyPoints[difficulty]} pts
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
