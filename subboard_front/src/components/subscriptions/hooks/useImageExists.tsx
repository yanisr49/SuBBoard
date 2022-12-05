import { useState } from 'react';

export default function useImageExists(src: string, alt: string, fallback: string) {
    const [source, setSource] = useState(src);
    const [isError, setIsError] = useState(false);

    const onError = () => {
        setIsError(true);
    };

    const setSrc = (newSrc: string) => {
        setSource(newSrc);
        setIsError(false);
    };

    return [<img src={isError ? fallback : source} alt={isError ? 'logo par défaut' : alt} onError={onError} />, source, setSrc] as const;
}
