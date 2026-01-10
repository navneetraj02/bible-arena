import { Card, CardContent } from '@/components/ui/card';
import { Category, categoryLabels } from '@/data/questions';
import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Cross, 
  Users, 
  Sparkles, 
  Music, 
  HelpCircle,
  ScrollText,
  Shuffle
} from 'lucide-react';

interface CategorySelectorProps {
  selected: Category | 'all';
  onSelect: (category: Category | 'all') => void;
}

const categoryIcons: Record<Category | 'all', React.ReactNode> = {
  'all': <Shuffle className="w-5 h-5" />,
  'old-testament': <ScrollText className="w-5 h-5" />,
  'new-testament': <Cross className="w-5 h-5" />,
  'jesus-teachings': <Sparkles className="w-5 h-5" />,
  'bible-characters': <Users className="w-5 h-5" />,
  'miracles': <Sparkles className="w-5 h-5" />,
  'psalms-proverbs': <Music className="w-5 h-5" />,
  'general': <HelpCircle className="w-5 h-5" />,
};

const categories: (Category | 'all')[] = [
  'all',
  'old-testament',
  'new-testament',
  'jesus-teachings',
  'bible-characters',
  'miracles',
  'psalms-proverbs',
  'general',
];

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground text-center">Category</h3>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category, index) => (
          <Card
            key={category}
            onClick={() => onSelect(category)}
            className={cn(
              'cursor-pointer transition-all duration-200 hover:scale-[1.02] border-0',
              'animate-slide-up',
              selected === category 
                ? 'glass-card border-2 border-primary glow-primary' 
                : 'glass-card hover:bg-white/10'
            )}
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <CardContent className="p-3 flex items-center gap-3">
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all',
                selected === category 
                  ? 'gradient-primary text-white' 
                  : 'bg-muted text-muted-foreground'
              )}>
                {categoryIcons[category]}
              </div>
              <div className="text-sm font-medium truncate">
                {category === 'all' ? 'All Categories' : categoryLabels[category]}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
