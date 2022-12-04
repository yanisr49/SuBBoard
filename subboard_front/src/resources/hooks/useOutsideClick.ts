import { useLayoutEffect, RefObject } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOutsideClick = <T extends Element>(ref: RefObject<T>, callback: () => void) => {
    const handleClick = (e: MouseEvent) => {
        console.log(ref.current, e.target, ref.current && !ref.current.contains(e.target as Node));
        if (ref.current && !ref.current.contains(e.target as Node)) {
            callback();
        }
    };

    useLayoutEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [ref]);
};

export default useOutsideClick;
