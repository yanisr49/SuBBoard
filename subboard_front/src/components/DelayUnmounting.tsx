/** @jsxImportSource @emotion/react */
// Create a component that delays dismount of children with delay props and assign class before and at the time of dismounting

import { Interpolation, Theme } from '@emotion/react';
import { useEffect, useState } from 'react';

interface Props {
    delay: number;
    children: React.ReactNode;
    mounted: boolean | undefined;
}

export default function DelayUnmounting({ delay, children, mounted }: Props) {
    const [display, setDisplay] = useState<boolean>(mounted ?? false);

    useEffect(() => {
        if (mounted && !display) {
            setDisplay(true);
        } else if (!mounted && display) {
            setTimeout(() => setDisplay(false), delay);
        }
    }, [mounted, display]);

    return (
        <div>
            {(mounted || display) && children}
        </div>
    );
}
