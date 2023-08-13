import { useEffect, useState, useRef } from 'react';

export default function useDelayedState<T>(initialState: T, nextState?: T, delay?: number) {
    const [state, setState] = useState<T>(initialState);
    const timeoutRef = useRef<number | null>(null);

    const setNewState = (newCurrentState: T, newNextState: T, newDelay: number) => {
        setState(newCurrentState);
        if (newDelay && newNextState) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = window.setTimeout(() => {
                setState(newNextState);
                timeoutRef.current = null;
            }, newDelay);
        }
    };

    useEffect(() => {
        if (nextState && delay) setNewState(initialState, nextState, delay);
    }, []);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    return [state, setNewState] as const;
}
