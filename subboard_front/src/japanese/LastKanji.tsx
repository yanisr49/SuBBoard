/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { IKanji } from './kanji';
import './lastKanji.scss';

interface Props {
    kanji?: IKanji;
    success?: boolean;
}

export default function LastKanji({ kanji, success }: Props) {
    const [color, setColor] = React.useState<'lime' | 'red' | ''>('');

    useEffect(() => {
        if (success !== undefined) {
            setColor(success ? 'lime' : 'red');
            const timeoutID = setTimeout(() => {
                setColor('');
            }, 500);
            return () => clearTimeout(timeoutID);
        }
    }, [kanji]);

    return (
        <div
            id="lastKanji"
            style={{
                backgroundColor: color,
            }}
        >
            {kanji && (
                <>
                    <p className="kanji">
                        {kanji.kanji}
                    </p>
                    <div>
                        <p>{kanji.hiragana}</p>
                        <p>{kanji.francais}</p>
                    </div>
                </>
            )}
        </div>
    );
}
