import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookSelector } from '@/components/bible/BookSelector';
import { ChapterReader } from '@/components/bible/ChapterReader';
import { BibleBook } from '@/data/bible';
import { BookOpen } from 'lucide-react';

export default function BibleReader() {
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const handleSelectBook = (book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(null);
  };

  const handleSelectChapter = (chapter: number) => {
    setSelectedChapter(chapter);
  };

  const handleChangeChapter = (chapter: number) => {
    if (selectedBook && chapter >= 1 && chapter <= selectedBook.chapters) {
      setSelectedChapter(chapter);
    }
  };

  const handleBack = () => {
    setSelectedChapter(null);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      {/* Gradient orbs */}
      <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        {!selectedChapter && (
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl gradient-success mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Read the Bible</h1>
            <p className="text-muted-foreground">
              Select a book and chapter to begin
            </p>
          </div>
        )}

        {/* Content */}
        {selectedBook && selectedChapter ? (
          <ChapterReader
            book={selectedBook}
            chapter={selectedChapter}
            onChangeChapter={handleChangeChapter}
            onBack={handleBack}
          />
        ) : (
          <Card className="glass-card border-0">
            <CardContent className="p-4">
              <BookSelector
                selectedBook={selectedBook}
                selectedChapter={selectedChapter}
                onSelectBook={handleSelectBook}
                onSelectChapter={handleSelectChapter}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
