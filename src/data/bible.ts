export interface BibleBook {
  id: string;
  name: string;
  testament: 'old' | 'new';
  chapters: number;
}

export const bibleBooks: BibleBook[] = [
  // Old Testament
  { id: 'genesis', name: 'Genesis', testament: 'old', chapters: 50 },
  { id: 'exodus', name: 'Exodus', testament: 'old', chapters: 40 },
  { id: 'leviticus', name: 'Leviticus', testament: 'old', chapters: 27 },
  { id: 'numbers', name: 'Numbers', testament: 'old', chapters: 36 },
  { id: 'deuteronomy', name: 'Deuteronomy', testament: 'old', chapters: 34 },
  { id: 'joshua', name: 'Joshua', testament: 'old', chapters: 24 },
  { id: 'judges', name: 'Judges', testament: 'old', chapters: 21 },
  { id: 'ruth', name: 'Ruth', testament: 'old', chapters: 4 },
  { id: '1samuel', name: '1 Samuel', testament: 'old', chapters: 31 },
  { id: '2samuel', name: '2 Samuel', testament: 'old', chapters: 24 },
  { id: '1kings', name: '1 Kings', testament: 'old', chapters: 22 },
  { id: '2kings', name: '2 Kings', testament: 'old', chapters: 25 },
  { id: '1chronicles', name: '1 Chronicles', testament: 'old', chapters: 29 },
  { id: '2chronicles', name: '2 Chronicles', testament: 'old', chapters: 36 },
  { id: 'ezra', name: 'Ezra', testament: 'old', chapters: 10 },
  { id: 'nehemiah', name: 'Nehemiah', testament: 'old', chapters: 13 },
  { id: 'esther', name: 'Esther', testament: 'old', chapters: 10 },
  { id: 'job', name: 'Job', testament: 'old', chapters: 42 },
  { id: 'psalms', name: 'Psalms', testament: 'old', chapters: 150 },
  { id: 'proverbs', name: 'Proverbs', testament: 'old', chapters: 31 },
  { id: 'ecclesiastes', name: 'Ecclesiastes', testament: 'old', chapters: 12 },
  { id: 'songofsolomon', name: 'Song of Solomon', testament: 'old', chapters: 8 },
  { id: 'isaiah', name: 'Isaiah', testament: 'old', chapters: 66 },
  { id: 'jeremiah', name: 'Jeremiah', testament: 'old', chapters: 52 },
  { id: 'lamentations', name: 'Lamentations', testament: 'old', chapters: 5 },
  { id: 'ezekiel', name: 'Ezekiel', testament: 'old', chapters: 48 },
  { id: 'daniel', name: 'Daniel', testament: 'old', chapters: 12 },
  { id: 'hosea', name: 'Hosea', testament: 'old', chapters: 14 },
  { id: 'joel', name: 'Joel', testament: 'old', chapters: 3 },
  { id: 'amos', name: 'Amos', testament: 'old', chapters: 9 },
  { id: 'obadiah', name: 'Obadiah', testament: 'old', chapters: 1 },
  { id: 'jonah', name: 'Jonah', testament: 'old', chapters: 4 },
  { id: 'micah', name: 'Micah', testament: 'old', chapters: 7 },
  { id: 'nahum', name: 'Nahum', testament: 'old', chapters: 3 },
  { id: 'habakkuk', name: 'Habakkuk', testament: 'old', chapters: 3 },
  { id: 'zephaniah', name: 'Zephaniah', testament: 'old', chapters: 3 },
  { id: 'haggai', name: 'Haggai', testament: 'old', chapters: 2 },
  { id: 'zechariah', name: 'Zechariah', testament: 'old', chapters: 14 },
  { id: 'malachi', name: 'Malachi', testament: 'old', chapters: 4 },
  // New Testament
  { id: 'matthew', name: 'Matthew', testament: 'new', chapters: 28 },
  { id: 'mark', name: 'Mark', testament: 'new', chapters: 16 },
  { id: 'luke', name: 'Luke', testament: 'new', chapters: 24 },
  { id: 'john', name: 'John', testament: 'new', chapters: 21 },
  { id: 'acts', name: 'Acts', testament: 'new', chapters: 28 },
  { id: 'romans', name: 'Romans', testament: 'new', chapters: 16 },
  { id: '1corinthians', name: '1 Corinthians', testament: 'new', chapters: 16 },
  { id: '2corinthians', name: '2 Corinthians', testament: 'new', chapters: 13 },
  { id: 'galatians', name: 'Galatians', testament: 'new', chapters: 6 },
  { id: 'ephesians', name: 'Ephesians', testament: 'new', chapters: 6 },
  { id: 'philippians', name: 'Philippians', testament: 'new', chapters: 4 },
  { id: 'colossians', name: 'Colossians', testament: 'new', chapters: 4 },
  { id: '1thessalonians', name: '1 Thessalonians', testament: 'new', chapters: 5 },
  { id: '2thessalonians', name: '2 Thessalonians', testament: 'new', chapters: 3 },
  { id: '1timothy', name: '1 Timothy', testament: 'new', chapters: 6 },
  { id: '2timothy', name: '2 Timothy', testament: 'new', chapters: 4 },
  { id: 'titus', name: 'Titus', testament: 'new', chapters: 3 },
  { id: 'philemon', name: 'Philemon', testament: 'new', chapters: 1 },
  { id: 'hebrews', name: 'Hebrews', testament: 'new', chapters: 13 },
  { id: 'james', name: 'James', testament: 'new', chapters: 5 },
  { id: '1peter', name: '1 Peter', testament: 'new', chapters: 5 },
  { id: '2peter', name: '2 Peter', testament: 'new', chapters: 3 },
  { id: '1john', name: '1 John', testament: 'new', chapters: 5 },
  { id: '2john', name: '2 John', testament: 'new', chapters: 1 },
  { id: '3john', name: '3 John', testament: 'new', chapters: 1 },
  { id: 'jude', name: 'Jude', testament: 'new', chapters: 1 },
  { id: 'revelation', name: 'Revelation', testament: 'new', chapters: 22 },
];

// API helper to fetch Bible content
const API_BASE = 'https://bible-api.com';

export interface BibleVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleChapter {
  reference: string;
  verses: BibleVerse[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
}

// Map our book IDs to Bible API format
const bookIdMap: Record<string, string> = {
  genesis: 'Genesis',
  exodus: 'Exodus',
  leviticus: 'Leviticus',
  numbers: 'Numbers',
  deuteronomy: 'Deuteronomy',
  joshua: 'Joshua',
  judges: 'Judges',
  ruth: 'Ruth',
  '1samuel': '1 Samuel',
  '2samuel': '2 Samuel',
  '1kings': '1 Kings',
  '2kings': '2 Kings',
  '1chronicles': '1 Chronicles',
  '2chronicles': '2 Chronicles',
  ezra: 'Ezra',
  nehemiah: 'Nehemiah',
  esther: 'Esther',
  job: 'Job',
  psalms: 'Psalms',
  proverbs: 'Proverbs',
  ecclesiastes: 'Ecclesiastes',
  songofsolomon: 'Song of Solomon',
  isaiah: 'Isaiah',
  jeremiah: 'Jeremiah',
  lamentations: 'Lamentations',
  ezekiel: 'Ezekiel',
  daniel: 'Daniel',
  hosea: 'Hosea',
  joel: 'Joel',
  amos: 'Amos',
  obadiah: 'Obadiah',
  jonah: 'Jonah',
  micah: 'Micah',
  nahum: 'Nahum',
  habakkuk: 'Habakkuk',
  zephaniah: 'Zephaniah',
  haggai: 'Haggai',
  zechariah: 'Zechariah',
  malachi: 'Malachi',
  matthew: 'Matthew',
  mark: 'Mark',
  luke: 'Luke',
  john: 'John',
  acts: 'Acts',
  romans: 'Romans',
  '1corinthians': '1 Corinthians',
  '2corinthians': '2 Corinthians',
  galatians: 'Galatians',
  ephesians: 'Ephesians',
  philippians: 'Philippians',
  colossians: 'Colossians',
  '1thessalonians': '1 Thessalonians',
  '2thessalonians': '2 Thessalonians',
  '1timothy': '1 Timothy',
  '2timothy': '2 Timothy',
  titus: 'Titus',
  philemon: 'Philemon',
  hebrews: 'Hebrews',
  james: 'James',
  '1peter': '1 Peter',
  '2peter': '2 Peter',
  '1john': '1 John',
  '2john': '2 John',
  '3john': '3 John',
  jude: 'Jude',
  revelation: 'Revelation',
};

export async function fetchChapter(bookId: string, chapter: number): Promise<BibleChapter | null> {
  try {
    const bookName = bookIdMap[bookId];
    if (!bookName) return null;
    
    const response = await fetch(`${API_BASE}/${encodeURIComponent(bookName)}+${chapter}`);
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chapter:', error);
    return null;
  }
}

export function getBookById(id: string): BibleBook | undefined {
  return bibleBooks.find(b => b.id === id);
}

export function getOldTestamentBooks(): BibleBook[] {
  return bibleBooks.filter(b => b.testament === 'old');
}

export function getNewTestamentBooks(): BibleBook[] {
  return bibleBooks.filter(b => b.testament === 'new');
}
