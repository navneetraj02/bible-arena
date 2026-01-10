import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuestionCountSelectorProps {
  selected: number;
  onSelect: (count: number) => void;
}

const counts = [5, 10, 15, 20];

export function QuestionCountSelector({ selected, onSelect }: QuestionCountSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground text-center">Questions</h3>
      <div className="flex justify-center gap-3">
        {counts.map((count) => (
          <Button
            key={count}
            variant="glass"
            onClick={() => onSelect(count)}
            className={cn(
              'w-14 h-14 text-xl font-bold rounded-2xl',
              selected === count && 'gradient-primary text-white border-0 glow-primary'
            )}
          >
            {count}
          </Button>
        ))}
      </div>
    </div>
  );
}
