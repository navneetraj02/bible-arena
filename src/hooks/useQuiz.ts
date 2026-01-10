import { useState, useCallback, useMemo } from 'react';
import { 
  Question, 
  Category, 
  Difficulty, 
  getRandomQuestions, 
  shuffleArray,
  difficultyPoints 
} from '@/data/questions';

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  score: number;
  streak: number;
  maxStreak: number;
  isComplete: boolean;
  shuffledOptions: string[][];
  correctMappings: number[];
}

export interface UserProgress {
  totalScore: number;
  totalQuestions: number;
  correctAnswers: number;
  level: number;
  levelName: string;
  levelProgress: number;
  badges: string[];
  highestStreak: number;
}

const LEVELS = [
  { name: 'Beginner', minScore: 0 },
  { name: 'Disciple', minScore: 100 },
  { name: 'Apprentice', minScore: 300 },
  { name: 'Scholar', minScore: 600 },
  { name: 'Teacher', minScore: 1000 },
  { name: 'Master', minScore: 1500 },
  { name: 'Prophet', minScore: 2500 },
  { name: 'Sage', minScore: 4000 },
];

const BADGES = [
  { id: 'first-quiz', name: 'First Steps', description: 'Complete your first quiz', icon: '🌟' },
  { id: 'perfect-10', name: 'Perfect 10', description: 'Get 10 correct in a row', icon: '🔥' },
  { id: 'scholar', name: 'Scholar', description: 'Answer 50 questions correctly', icon: '📚' },
  { id: 'hard-mode', name: 'Challenger', description: 'Complete a hard quiz', icon: '💪' },
  { id: 'all-categories', name: 'Well-Rounded', description: 'Play quizzes from all categories', icon: '🎯' },
  { id: 'streak-master', name: 'Streak Master', description: 'Get a 15 question streak', icon: '⚡' },
];

export function getLevel(score: number): { level: number; name: string; progress: number } {
  let currentLevel = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (score >= LEVELS[i].minScore) {
      currentLevel = i;
      break;
    }
  }
  
  const currentMin = LEVELS[currentLevel].minScore;
  const nextMin = LEVELS[currentLevel + 1]?.minScore || currentMin + 1000;
  const progress = ((score - currentMin) / (nextMin - currentMin)) * 100;
  
  return {
    level: currentLevel + 1,
    name: LEVELS[currentLevel].name,
    progress: Math.min(100, Math.max(0, progress)),
  };
}

export function getBadges(): typeof BADGES {
  return BADGES;
}

export function useQuiz(
  questionCount: number,
  category: Category | 'all',
  difficulty: Difficulty | 'all'
) {
  const [state, setState] = useState<QuizState | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);

  const startQuiz = useCallback(() => {
    const selectedQuestions = getRandomQuestions(questionCount, category, difficulty, usedQuestionIds);
    
    // Shuffle options for each question and track correct answer mapping
    const shuffledOptions: string[][] = [];
    const correctMappings: number[] = [];
    
    selectedQuestions.forEach((q) => {
      const options = [...q.options];
      const correctOption = options[q.correctAnswer];
      const shuffled = shuffleArray(options);
      shuffledOptions.push(shuffled);
      correctMappings.push(shuffled.indexOf(correctOption));
    });
    
    setState({
      questions: selectedQuestions,
      currentIndex: 0,
      answers: new Array(selectedQuestions.length).fill(null),
      score: 0,
      streak: 0,
      maxStreak: 0,
      isComplete: false,
      shuffledOptions,
      correctMappings,
    });
    
    // Track used questions
    setUsedQuestionIds(prev => [...prev, ...selectedQuestions.map(q => q.id)]);
  }, [questionCount, category, difficulty, usedQuestionIds]);

  const answerQuestion = useCallback((answerIndex: number) => {
    if (!state || state.isComplete) return;
    
    const isCorrect = answerIndex === state.correctMappings[state.currentIndex];
    const question = state.questions[state.currentIndex];
    const points = isCorrect ? difficultyPoints[question.difficulty] : 0;
    const streakBonus = isCorrect && state.streak >= 2 ? Math.floor(state.streak * 2) : 0;
    
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newMaxStreak = Math.max(state.maxStreak, newStreak);
    
    const newAnswers = [...state.answers];
    newAnswers[state.currentIndex] = answerIndex;
    
    setState({
      ...state,
      answers: newAnswers,
      score: state.score + points + streakBonus,
      streak: newStreak,
      maxStreak: newMaxStreak,
    });
    
    return { isCorrect, points: points + streakBonus, streak: newStreak };
  }, [state]);

  const nextQuestion = useCallback(() => {
    if (!state) return;
    
    if (state.currentIndex >= state.questions.length - 1) {
      setState({ ...state, isComplete: true });
    } else {
      setState({ ...state, currentIndex: state.currentIndex + 1 });
    }
  }, [state]);

  const resetQuiz = useCallback(() => {
    setState(null);
  }, []);

  const resetAllQuestions = useCallback(() => {
    setUsedQuestionIds([]);
  }, []);

  const currentQuestion = state?.questions[state.currentIndex] || null;
  const currentOptions = state?.shuffledOptions[state.currentIndex] || [];
  const progress = state ? ((state.currentIndex + 1) / state.questions.length) * 100 : 0;
  
  const results = useMemo(() => {
    if (!state?.isComplete) return null;
    
    const correct = state.answers.filter(
      (a, i) => a === state.correctMappings[i]
    ).length;
    
    return {
      totalQuestions: state.questions.length,
      correct,
      incorrect: state.questions.length - correct,
      score: state.score,
      maxStreak: state.maxStreak,
      accuracy: Math.round((correct / state.questions.length) * 100),
    };
  }, [state]);

  return {
    state,
    currentQuestion,
    currentOptions,
    progress,
    results,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz,
    resetAllQuestions,
  };
}

// Local storage helpers for progress
const PROGRESS_KEY = 'bible-quiz-progress';
const LEADERBOARD_KEY = 'bible-quiz-leaderboard';

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  date: string;
  accuracy: number;
}

export function loadProgress(): UserProgress {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading progress:', e);
  }
  
  return {
    totalScore: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    level: 1,
    levelName: 'Beginner',
    levelProgress: 0,
    badges: [],
    highestStreak: 0,
  };
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
}

export function updateProgress(
  current: UserProgress,
  quizResults: {
    score: number;
    correct: number;
    total: number;
    maxStreak: number;
    difficulty?: Difficulty;
  }
): UserProgress {
  const newTotalScore = current.totalScore + quizResults.score;
  const newTotalQuestions = current.totalQuestions + quizResults.total;
  const newCorrectAnswers = current.correctAnswers + quizResults.correct;
  const newHighestStreak = Math.max(current.highestStreak, quizResults.maxStreak);
  
  const levelInfo = getLevel(newTotalScore);
  
  // Check for new badges
  const newBadges = [...current.badges];
  
  if (!newBadges.includes('first-quiz')) {
    newBadges.push('first-quiz');
  }
  
  if (quizResults.maxStreak >= 10 && !newBadges.includes('perfect-10')) {
    newBadges.push('perfect-10');
  }
  
  if (newCorrectAnswers >= 50 && !newBadges.includes('scholar')) {
    newBadges.push('scholar');
  }
  
  if (quizResults.difficulty === 'hard' && !newBadges.includes('hard-mode')) {
    newBadges.push('hard-mode');
  }
  
  if (quizResults.maxStreak >= 15 && !newBadges.includes('streak-master')) {
    newBadges.push('streak-master');
  }
  
  return {
    totalScore: newTotalScore,
    totalQuestions: newTotalQuestions,
    correctAnswers: newCorrectAnswers,
    level: levelInfo.level,
    levelName: levelInfo.name,
    levelProgress: levelInfo.progress,
    badges: newBadges,
    highestStreak: newHighestStreak,
  };
}

export function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const saved = localStorage.getItem(LEADERBOARD_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading leaderboard:', e);
  }
  return [];
}

export function addToLeaderboard(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry[] {
  const leaderboard = loadLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  
  leaderboard.push(newEntry);
  leaderboard.sort((a, b) => b.score - a.score);
  
  // Keep top 100
  const trimmed = leaderboard.slice(0, 100);
  
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Error saving leaderboard:', e);
  }
  
  return trimmed;
}
