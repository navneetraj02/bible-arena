```
import { useState, useEffect } from 'react';
import { collection, query, where, getCountFromServer, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useOnlineCount() {
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        // Count users online in the last 5 minutes
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const activeThreshold = Timestamp.fromDate(fiveMinutesAgo);
        
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('lastOnline', '>', activeThreshold));
        
        const snapshot = await getCountFromServer(q);
        setOnlineCount(snapshot.data().count);
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
```
