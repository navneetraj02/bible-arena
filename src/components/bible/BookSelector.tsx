import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { bibleBooks, BibleBook, getOldTestamentBooks, getNewTestamentBooks } from '@/data/bible';
import { cn } from '@/lib/utils';
import { BookOpen, ChevronRight } from 'lucide-react';

interface BookSelectorProps {
  selectedBook: BibleBook | null;
  selectedChapter: number | null;
  onSelectBook: (book: BibleBook) => void;
  onSelectChapter: (chapter: number) => void;
}

export function BookSelector({
  selectedBook,
  selectedChapter,
  onSelectBook,
  onSelectChapter,
}: BookSelectorProps) {
  const [testament, setTestament] = useState<'old' | 'new'>('old');
  const books = testament === 'old' ? getOldTestamentBooks() : getNewTestamentBooks();

  return (
    <div className="space-y-4">
      {/* Testament tabs */}
      <div className="flex rounded-xl bg-muted p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTestament('old')}
          className={cn(
            'flex-1 rounded-lg transition-all',
            testament === 'old' && 'bg-background shadow-sm'
          )}
        >
          Old Testament
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTestament('new')}
          className={cn(
            'flex-1 rounded-lg transition-all',
            testament === 'new' && 'bg-background shadow-sm'
          )}
        >
          New Testament
        </Button>
      </div>

      {/* Book list */}
      <ScrollArea className="h-[280px] rounded-xl bg-muted/50">
        <div className="p-2 space-y-1">
          {books.map((book) => (
            <Button
              key={book.id}
              variant="ghost"
              size="sm"
              onClick={() => onSelectBook(book)}
              className={cn(
                'w-full justify-between font-normal rounded-lg',
                selectedBook?.id === book.id && 'bg-primary/20 text-primary'
              )}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {book.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {book.chapters} ch
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Chapter selector */}
      {selectedBook && (
        <div className="space-y-3 animate-slide-up">
          <div className="text-sm flex items-center gap-2">
            <span className="text-muted-foreground">Selected:</span>
            <span className="text-primary font-bold">{selectedBook.name}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">Chapter</span>
          </div>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
            {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((chapter) => (
              <Button
                key={chapter}
                variant="glass"
                size="sm"
                onClick={() => onSelectChapter(chapter)}
                className={cn(
                  'h-10 w-full font-bold rounded-lg',
                  selectedChapter === chapter && 'gradient-primary text-white border-0'
                )}
              >
                {chapter}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
