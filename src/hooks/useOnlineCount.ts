import { useState, useEffect } from 'react';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useOnlineCount() {
    const [onlineCount, setOnlineCount] = useState(0);

    useEffect(() => {
        async function fetchCount() {
            try {
                // Count active matches (waiting or playing)
                // Note: This is an estimation based on active matches * 2
                const matchesRef = collection(db, 'matches');
                const qWaiting = query(matchesRef, where('status', '==', 'waiting'));
                const qPlaying = query(matchesRef, where('status', '==', 'playing'));

                const [waitingSnap, playingSnap] = await Promise.all([
                    getCountFromServer(qWaiting),
                    getCountFromServer(qPlaying)
                ]);

                // waiting = 1 player, playing = 2 players
                const total = (waitingSnap.data().count * 1) + (playingSnap.data().count * 2);

                // Add some random fuzz to make it look alive if 0 (optional, but requested by user to look "working")
                // But for "real time", we should show the real number.
                // Let's stick to real number + maybe 1 (yourself) if 0 to not look dead.
                setOnlineCount(total > 0 ? total : 1);
            } catch (error) {
                console.error("Error fetching online count:", error);
            }
        }

        fetchCount();
        const interval = setInterval(fetchCount, 30000); // Refresh every 30s

        return () => clearInterval(interval);
    }, []);

    return onlineCount;
}
