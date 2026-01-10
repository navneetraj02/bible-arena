import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizOptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null;
  showResult: boolean;
  onSelect: () => void;
  disabled: boolean;
}

const optionLabels = ['A', 'B', 'C', 'D'];

export function QuizOption({
  option,
  index,
  isSelected,
  isCorrect,
  showResult,
  onSelect,
  disabled,
}: QuizOptionProps) {
  let variant: 'quiz' | 'quizCorrect' | 'quizWrong' = 'quiz';
  
  if (showResult) {
    if (isCorrect) {
      variant = 'quizCorrect';
    } else if (isSelected && !isCorrect) {
      variant = 'quizWrong';
    }
  }

  return (
    <Button
      variant={variant}
      size="lg"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        'w-full justify-start text-left h-auto py-4 px-4 font-normal',
        'animate-slide-up',
        isSelected && !showResult && 'border-primary bg-primary/10',
        showResult && isCorrect && 'animate-correct',
        showResult && isSelected && !isCorrect && 'animate-wrong',
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className={cn(
        'flex items-center justify-center w-8 h-8 rounded-xl mr-3 font-bold text-sm shrink-0 transition-all',
        'bg-muted text-muted-foreground',
        showResult && isCorrect && 'bg-success text-success-foreground',
        showResult && isSelected && !isCorrect && 'bg-destructive text-destructive-foreground',
        isSelected && !showResult && 'bg-primary text-primary-foreground',
      )}>
        {optionLabels[index]}
      </span>
      <span className="flex-1 text-base">{option}</span>
    </Button>
  );
}
