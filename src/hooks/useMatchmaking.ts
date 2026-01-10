import { useState } from 'react';
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    limit
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { getRandomQuestions } from '@/data/questions';
import { toast } from 'sonner';

export interface MatchPlayer {
    uid: string;
    name: string;
    score: number;
    currentAnswer: number | null; // Index of answer for current question
    ready: boolean;
}

export interface MatchState {
    id: string;
    player1: MatchPlayer;
    player2: MatchPlayer | null;
    status: 'waiting' | 'playing' | 'finished';
    questions: any[]; // Array of questions
    currentQuestionIndex: number;
    createdAt: any;
    winner?: string; // uid of winner
}

export function useMatchmaking() {
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const findMatch = async (uid: string, playerName: string) => {
        setIsSearching(true);

        try {
            // 1. Search for an existing waiting match
            // Note: We avoid '!=' queries to prevent needing composite indices
            const matchesRef = collection(db, 'matches');
            const q = query(
                matchesRef,
                where('status', '==', 'waiting'),
                limit(20) // Fetch a few to find a valid one
            );

            const querySnapshot = await getDocs(q);
            let foundMatchDoc = null;

            // Find a match that isn't our own
            for (const doc of querySnapshot.docs) {
                const data = doc.data();
                if (data.player1.uid !== uid) {
                    foundMatchDoc = doc;
                    break;
                }
            }

            if (foundMatchDoc) {
                // join existing match
                const matchId = foundMatchDoc.id;

                await updateDoc(doc(db, 'matches', matchId), {
                    player2: {
                        uid,
                        name: playerName,
                        score: 0,
                        currentAnswer: null,
                        ready: true
                    },
                    status: 'playing'
                });

                navigate(`/game/${matchId}`);
            } else {
                // create new match
                const questions = getRandomQuestions(10, 'all', 'all'); // 10 mixed questions

                // Sanitize questions for Firestore (remove undefined/functions)
                const sanitizedQuestions = questions.map(q => ({
                    id: q.id,
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    category: q.category,
                    difficulty: q.difficulty,
                    reference: q.reference
                }));

                const newMatch: Omit<MatchState, 'id'> = {
                    player1: {
                        uid,
                        name: playerName,
                        score: 0,
                        currentAnswer: null,
                        ready: true
                    },
                    player2: null,
                    status: 'waiting',
                    questions: sanitizedQuestions,
                    currentQuestionIndex: 0,
                    createdAt: serverTimestamp()
                };

                const docRef = await addDoc(matchesRef, newMatch);
                navigate(`/game/${docRef.id}`);
            }
        } catch (error: any) {
            console.error("Error finding match:", error);
            toast.error("Matchmaking failed: " + error.message);
            setIsSearching(false);
        }
    };

    const cancelSearch = () => {
        setIsSearching(false);
        // In future: remove from Firestore queue if applicable
    };

    return { findMatch, isSearching, cancelSearch };
}
