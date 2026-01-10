import { useEffect } from 'react';
import { doc, updateDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';

export function usePresence() {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);

        const updatePresence = async () => {
            try {
                await setDoc(userRef, {
                    lastOnline: serverTimestamp(),
                    isAnonymous: user.isAnonymous,
                    displayName: user.displayName || 'Guest'
                }, { merge: true });
            } catch (error) {
                // Ignore errors (e.g. offline)
            }
        };

        updatePresence();
        const interval = setInterval(updatePresence, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [user]);
}
