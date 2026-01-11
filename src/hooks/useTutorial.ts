import { useState, useEffect } from 'react';

export interface TutorialStep {
    targetId?: string; // ID of the element to highlight (optional)
    title: string;
    message: string;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export function useTutorial(steps: TutorialStep[]) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem('bible_quest_tutorial_seen');
        if (seen) {
            setHasSeenTutorial(true);
        } else {
            // Delay start slightly for effect
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const nextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            completeTutorial();
        }
    };

    const skipTutorial = () => {
        completeTutorial();
    };

    const completeTutorial = () => {
        setIsOpen(false);
        setHasSeenTutorial(true);
        localStorage.setItem('bible_quest_tutorial_seen', 'true');
    };

    const resetTutorial = () => {
        setIsOpen(true);
        setCurrentStepIndex(0);
        setHasSeenTutorial(false);
        localStorage.removeItem('bible_quest_tutorial_seen');
    };

    return {
        isOpen,
        currentStep: steps[currentStepIndex],
        currentStepIndex,
        totalSteps: steps.length,
        nextStep,
        skipTutorial,
        resetTutorial,
        hasSeenTutorial
    };
}
