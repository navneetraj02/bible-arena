import { useCallback, useRef } from 'react';

export const useGameSound = () => {
    // We use a ref to hold the audio context so it persists between renders but can be initialized lazily
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize AudioContext on user interaction
    const initAudio = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    }, []);

    const playTone = useCallback((freq: number, type: OscillatorType, duration: number, startTime = 0, volume = 0.1) => {
        initAudio();
        const ctx = audioContextRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        gainNode.gain.setValueAtTime(volume, ctx.currentTime + startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
    }, [initAudio]);

    const playClick = useCallback(() => {
        // High pitch blip for UI interactions
        playTone(800, 'sine', 0.1, 0, 0.05);
    }, [playTone]);

    const playHover = useCallback(() => {
        // Very subtle tick
        playTone(400, 'triangle', 0.05, 0, 0.02);
    }, [playTone]);

    const playSuccess = useCallback(() => {
        // Major chord arpeggio (C-E-G)
        playTone(523.25, 'sine', 0.3, 0, 0.1); // C5
        playTone(659.25, 'sine', 0.3, 0.1, 0.1); // E5
        playTone(783.99, 'sine', 0.5, 0.2, 0.1); // G5
    }, [playTone]);

    const playError = useCallback(() => {
        // Discordant buzz
        playTone(150, 'sawtooth', 0.3, 0, 0.1);
        playTone(140, 'sawtooth', 0.3, 0.05, 0.1);
    }, [playTone]);

    const playWin = useCallback(() => {
        // Victory Fanfare
        const now = 0;
        playTone(523.25, 'square', 0.2, now, 0.1);       // C5
        playTone(523.25, 'square', 0.2, now + 0.2, 0.1); // C5
        playTone(523.25, 'square', 0.2, now + 0.4, 0.1); // C5
        playTone(783.99, 'square', 0.6, now + 0.6, 0.1); // G5 (Long)

        // Harmony
        setTimeout(() => {
            playTone(659.25, 'sine', 0.6, 0.6, 0.05); // E5
        }, 0);
    }, [playTone]);

    return { playClick, playHover, playSuccess, playError, playWin };
};
