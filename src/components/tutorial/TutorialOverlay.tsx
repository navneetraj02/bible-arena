import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import guideCharacter from '@/assets/guide-character.png'; // Ensure this path is correct
import { TutorialStep } from '@/hooks/useTutorial';

interface TutorialOverlayProps {
    isOpen: boolean;
    step: TutorialStep;
    currentStepIndex: number;
    totalSteps: number;
    onNext: () => void;
    onSkip: () => void;
}

export function TutorialOverlay({
    isOpen,
    step,
    currentStepIndex,
    totalSteps,
    onNext,
    onSkip
}: TutorialOverlayProps) {
    const [displayedText, setDisplayedText] = useState('');

    // Typewriter effect
    useEffect(() => {
        setDisplayedText('');
        if (!isOpen || !step) return;

        let index = 0;
        const speed = 30; // ms per char
        const timer = setInterval(() => {
            if (index < step.message.length) {
                setDisplayedText((prev) => prev + step.message.charAt(index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [step, isOpen]);

    if (!isOpen || !step) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-end pb-10 sm:justify-end sm:pb-20">
                {/* Dim background */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 pointer-events-auto"
                    onClick={onNext} // Click outside to advance
                />

                {/* Character & Dialog Container */}
                <div className="container max-w-4xl mx-auto relative z-10 flex flex-col sm:flex-row items-end sm:items-end gap-4 px-6 pointer-events-none">

                    {/* Character Image */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="w-40 sm:w-64 -mb-8 sm:-mb-12 pointer-events-auto shrink-0 order-2 sm:order-1"
                    >
                        <img
                            src={guideCharacter}
                            alt="The Keeper"
                            className="w-full h-auto drop-shadow-2xl filter brightness-110"
                        />
                    </motion.div>

                    {/* Speech Bubble */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-card/95 backdrop-blur-md border border-gold/50 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] w-full sm:flex-1 pointer-events-auto order-1 sm:order-2 mb-4 relative"
                    >
                        {/* Triangle arrow for speech bubble */}
                        <div className="absolute left-1/2 bottom-[-10px] -translate-x-1/2 sm:left-[-10px] sm:top-auto sm:bottom-8 sm:transform-none w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-card/95 border-r-[10px] border-r-transparent sm:border-t-[10px] sm:border-t-transparent sm:border-r-[10px] sm:border-r-card/95 sm:border-b-[10px] sm:border-b-transparent rotate-0 sm:rotate-0" />

                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-serif font-bold text-gold tracking-wide">
                                The Keeper
                            </h3>
                            <button
                                onClick={onSkip}
                                className="text-muted-foreground hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
                            >
                                Skip
                            </button>
                        </div>

                        <div className="min-h-[80px]">
                            <p className="text-lg leading-relaxed text-foreground/90 font-medium">
                                {displayedText}
                            </p>
                        </div>

                        <div className="flex justify-between items-center mt-6 border-t border-white/10 pt-4">
                            <div className="flex gap-1">
                                {Array.from({ length: totalSteps }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStepIndex ? 'w-8 bg-gold' : 'w-2 bg-white/20'}`}
                                    />
                                ))}
                            </div>

                            <Button
                                onClick={onNext}
                                className="bg-gold hover:bg-gold/80 text-black font-bold group"
                            >
                                {currentStepIndex === totalSteps - 1 ? 'Start Journey' : 'Next'}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    );
}
