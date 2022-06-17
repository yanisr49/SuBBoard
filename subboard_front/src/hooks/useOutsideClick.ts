import { MutableRefObject, useEffect } from 'react';

// Custom hook to detect outside click in typescript
export const useOutsideClick = (ref: MutableRefObject<HTMLElement | null>, callback: () => void) => {
    useEffect(
        () => {
            const handleClick = (e: MouseEvent) => {
                if (ref.current && !ref.current.contains(e.target as Node)) {
                    callback();
                }
            };

            document.addEventListener('click', handleClick);

            return () => {
                document.removeEventListener('click', handleClick);
            };
        },
        [],
    );
};
