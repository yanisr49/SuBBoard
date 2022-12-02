import { useEffect, useState, useRef } from 'react';

export default function useDelayedState<T>(initialState: T) {
    const [state, setState] = useState<T>(initialState);
    const [nextState, setNextState] = useState<T>(initialState);
    const timeoutRef = useRef<number | null>(null);

    const setStateAfter = (actifState: T, bufferedState?: T, delay?: number) => {
        setState(actifState);
        if (bufferedState !== undefined) {
            setNextState(bufferedState);
        }
        if (delay) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = window.setTimeout(() => {
                setNextState(actifState);
                timeoutRef.current = null;
            }, delay);
        }
    };

    useEffect(() => () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    return [state, nextState, setStateAfter] as const;
}
