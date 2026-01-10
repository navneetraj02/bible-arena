import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProgress } from './useQuiz';

export interface UserStats {
    totalScore: number;
    totalQuestions: number;
    correctAnswers: number;
    level: number;
    highestStreak: number;
    quizzesWon: number;
    badges: string[];
    lastPlayed?: any;
}

const DEFAULT_STATS: UserStats = {
    totalScore: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    level: 1,
    highestStreak: 0,
    quizzesWon: 0,
    badges: []
};

export function useUserStats(uid: string | undefined) {
    const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uid) {
            setStats(DEFAULT_STATS);
            setLoading(false);
            return;
        }

        setLoading(true);
        const userRef = doc(db, 'users', uid);

        const unsubscribe = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data() as UserStats;
                // Merge with defaults to ensure all fields exist
                setStats({ ...DEFAULT_STATS, ...data });
            } else {
                // Create document if it doesn't exist
                setDoc(userRef, DEFAULT_STATS, { merge: true });
                setStats(DEFAULT_STATS);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching user stats:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [uid]);

    // For standard quiz (overwrites progress based on local calculation)
    const updateUserStats = async (newProgress: UserProgress) => {
        if (!uid) return;

        const userRef = doc(db, 'users', uid);
        const updates: any = {
            totalScore: newProgress.totalScore,
            totalQuestions: newProgress.totalQuestions,
            correctAnswers: newProgress.correctAnswers,
            level: newProgress.level,
            highestStreak: newProgress.highestStreak,
            badges: newProgress.badges,
            lastPlayed: new Date()
        };

        try {
            // Check if doc exists first to avoid errors with increment on non-existent doc if race condition
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                await updateDoc(userRef, updates);
            } else {
                await setDoc(userRef, {
                    ...DEFAULT_STATS,
                    ...updates,
                });
            }
        } catch (error) {
            console.error("Error updating user stats:", error);
        }
    };

    // New: For multiplayer (incremental updates)
    const updateMultiplayerStats = async (scoreToAdd: number, result: 'win' | 'loss' | 'draw') => {
        if (!uid) return;
        const userRef = doc(db, 'users', uid);

        const updates: any = {
            totalScore: increment(scoreToAdd),
            totalQuestions: increment(10), // Assuming 10 questions per game
            lastPlayed: new Date()
        };

        if (result === 'win') updates.quizzesWon = increment(1);
        if (result === 'loss') updates.quizzesLost = increment(1);

        try {
            await setDoc(userRef, updates, { merge: true });
        } catch (error) {
            console.error("Error updating MP stats:", error);
        }
    };

    return { stats, loading, updateUserStats, updateMultiplayerStats };
}
