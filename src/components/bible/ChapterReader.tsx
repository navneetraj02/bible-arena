import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BibleBook, BibleChapter, fetchChapter, BibleVerse } from '@/data/bible';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChapterReaderProps {
  book: BibleBook;
  chapter: number;
  onChangeChapter: (chapter: number) => void;
  onBack: () => void;
}

const VERSES_PER_PAGE = 8; // Adjust based on screen size desired

export function ChapterReader({ book, chapter, onChangeChapter, onBack }: ChapterReaderProps) {
  const [content, setContent] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [pages, setPages] = useState<BibleVerse[][]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    let cancelled = false;

    async function loadChapter() {
      setLoading(true);
      setError(null);
      setPageIndex(0); // Reset to first page on chapter change

      const data = await fetchChapter(book.id, chapter);

      if (cancelled) return;

      if (data) {
        setContent(data);
        // Split verses into pages
        const chunked = [];
        for (let i = 0; i < data.verses.length; i += VERSES_PER_PAGE) {
          chunked.push(data.verses.slice(i, i + VERSES_PER_PAGE));
        }
        setPages(chunked);
      } else {
        setError('Failed to load chapter. Please try again.');
      }
      setLoading(false);
    }

    loadChapter();

    return () => { cancelled = true; };
  }, [book.id, chapter]);

  const handleNextPage = () => {
    setFlipDirection('next');
    if (pageIndex < pages.length - 1) {
      triggerFlip(() => setPageIndex(p => p + 1));
    } else if (chapter < book.chapters) {
      onChangeChapter(chapter + 1);
    }
  };

  const handlePrevPage = () => {
    setFlipDirection('prev');
    if (pageIndex > 0) {
      triggerFlip(() => setPageIndex(p => p - 1));
    } else if (chapter > 1) {
      // Identify if we want to go to last page of prev chapter? 
      // For simplicity, Go to start of prev chapter (default behavior of onChangeChapter)
      // Or we could pass a flag. Let's start with simple chapter nav.
      onChangeChapter(chapter - 1);
    } else {
      onBack(); // Back to book selection
    }
  };

  const triggerFlip = (callback: () => void) => {
    setIsFlipping(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsFlipping(false);
      }, 300); // Wait for enter animation
    }, 300); // Wait for exit animation
  };

  return (
    <div className="space-y-4 animate-fade-in perspective-[1000px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
          <ChevronLeft className="w-4 h-4" />
          Books
        </Button>
        <span className="font-bold text-lg">{book.name} {chapter}</span>
      </div>

      {/* Book Container */}
      <div className={cn(
        "relative transition-all duration-500 transform-style-3d",
        isFlipping ? (flipDirection === 'next' ? "rotate-y-[-90deg] opacity-50" : "rotate-y-[90deg] opacity-50") : "rotate-y-0 opacity-100"
      )}>
        <Card className="glass-card border-0 overflow-hidden min-h-[500px] bg-[#fdfbf7] text-slate-800 shadow-2xl relative">
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

          <div className="gradient-primary px-5 py-3 text-white shadow-md z-10 relative">
            <div className="flex justify-between items-center">
              <span className="text-sm font-serif italic opacity-90">Holy Bible - King James Version</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">
                Page {pageIndex + 1} / {pages.length}
              </span>
            </div>
          </div>

          <CardContent className="p-8 md:p-10 font-serif leading-relaxed text-lg relative z-0">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full bg-slate-200" />
                <Skeleton className="h-4 w-[95%] bg-slate-200" />
                <Skeleton className="h-4 w-[90%] bg-slate-200" />
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
              <div className="prose prose-lg max-w-none">
                {pages[pageIndex]?.map((verse) => (
                  <span key={verse.verse} className="inline hover:bg-yellow-100/50 transition-colors cursor-pointer rounded px-1">
                    <sup className="text-xs text-primary font-sans font-bold mr-1 select-none">{verse.verse}</sup>
                    <span className="text-slate-900">{verse.text} </span>
                  </span>
                ))}
              </div>
            )}
          </CardContent>

          {/* Page number footer */}
          <div className="absolute bottom-4 w-full text-center text-xs text-muted-foreground font-serif italic">
            {book.name} {chapter}
          </div>
        </Card>

        {/* Click Zones for intuitive navigation */}
        <div
          className="absolute top-0 left-0 w-[15%] h-full cursor-w-resize z-20 hover:bg-black/5 transition-colors"
          onClick={handlePrevPage}
          title="Previous Page"
        />
        <div
          className="absolute top-0 right-0 w-[15%] h-full cursor-e-resize z-20 hover:bg-black/5 transition-colors"
          onClick={handleNextPage}
          title="Next Page"
        />
      </div>

      {/* Manual Controls */}
      <div className="flex justify-between items-center px-4">
        <Button variant="outline" onClick={handlePrevPage} disabled={chapter === 1 && pageIndex === 0}>
          <ChevronLeft className="w-4 h-4 mr-2" /> Prev
        </Button>
        <Button variant="outline" onClick={handleNextPage}>
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
