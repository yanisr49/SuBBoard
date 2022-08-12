import React from 'react';
import { IKanji } from './kanji';
import './currentKanji.scss';

interface Props {
    kanji?: IKanji;
    handleResponse: (result: boolean) => void;
}

export default function CurrentKanji({ kanji, handleResponse } : Props) {
    const [streak, setStreak] = React.useState<number>(0);
    const [tries, setTries] = React.useState<number>(0);
    const [value, setValue] = React.useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && value !== '') {
            setValue('');
            setTries(tries + 1);
            handleResponse(kanji?.romaji === value);
            setStreak(kanji?.romaji === value ? streak + 1 : 0);
        }
    };

    return (
        <div id="currentKanji">
            <div
                className="kanji"
            >
                {kanji?.kanji ?? '?'}
            </div>
            <input type="text" id="input" onKeyDown={handleOnKeyDown} onChange={handleChange} value={value} autoComplete="off" />
            <div id="scores">
                <span>
                    Tries :
                    {' '}
                    {tries}
                </span>
                <span>
                    Streak :
                    {' '}
                    {streak}
                </span>
            </div>
        </div>
    );
}
