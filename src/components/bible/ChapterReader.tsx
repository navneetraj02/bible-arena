import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BibleBook, BibleChapter, fetchChapter } from '@/data/bible';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChapterReaderProps {
  book: BibleBook;
  chapter: number;
  onChangeChapter: (chapter: number) => void;
  onBack: () => void;
}

export function ChapterReader({ book, chapter, onChangeChapter, onBack }: ChapterReaderProps) {
  const [content, setContent] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    async function loadChapter() {
      setLoading(true);
      setError(null);
      
      const data = await fetchChapter(book.id, chapter);
      
      if (cancelled) return;
      
      if (data) {
        setContent(data);
      } else {
        setError('Failed to load chapter. Please try again.');
      }
      setLoading(false);
    }
    
    loadChapter();
    
    return () => { cancelled = true; };
  }, [book.id, chapter]);

  const hasPrev = chapter > 1;
  const hasNext = chapter < book.chapters;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
          <ChevronLeft className="w-4 h-4" />
          Books
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="glass"
            size="icon"
            onClick={() => onChangeChapter(chapter - 1)}
            disabled={!hasPrev}
            className="w-9 h-9"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-bold px-3 min-w-[60px] text-center">
            Ch. {chapter}
          </span>
          <Button
            variant="glass"
            size="icon"
            onClick={() => onChangeChapter(chapter + 1)}
            disabled={!hasNext}
            className="w-9 h-9"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <Card className="glass-card border-0 overflow-hidden">
        {/* Book title header */}
        <div className="gradient-primary px-5 py-4">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{book.name}</h2>
              <p className="text-sm opacity-80">
                Chapter {chapter} of {book.chapters}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-5 md:p-6">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-muted" />
              <Skeleton className="h-4 w-[95%] bg-muted" />
              <Skeleton className="h-4 w-[90%] bg-muted" />
              <Skeleton className="h-4 w-full bg-muted" />
              <Skeleton className="h-4 w-[85%] bg-muted" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>{error}</p>
              <Button variant="glass" className="mt-4" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : content ? (
            <div className="bible-text text-base md:text-lg text-foreground/90">
              {content.verses.map((verse) => (
                <span key={verse.verse} className="inline">
                  <sup className="verse-number">{verse.verse}</sup>
                  {verse.text}{' '}
                </span>
              ))}
            </div>
          ) : null}
        </CardContent>

        {/* Footer navigation */}
        <div className="border-t border-border/50 px-5 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChangeChapter(chapter - 1)}
            disabled={!hasPrev}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChangeChapter(chapter + 1)}
            disabled={!hasNext}
            className="gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
