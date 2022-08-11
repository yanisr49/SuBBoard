import React from 'react';
import './kanji.css';

interface IKanji {
    francais: string;
    japonais: string;
    hiragana: string;
    katakana: string;
    romaji: string;
}

export default function Kanji() {
    const kanjis: IKanji[] = [
        {
            francais: 'la personne',
            japonais: '人',
            hiragana: 'ひと',
            katakana: 'ヒト',
            romaji: 'hito',
        },
        {
            francais: 'l\'homme',
            japonais: '男',
            hiragana: 'おとこ',
            katakana: 'オトコ',
            romaji: 'otoko',
        },
        {
            francais: 'la femme',
            japonais: '女',
            hiragana: 'おんな',
            katakana: 'オンナ',
            romaji: 'onna',
        },
        {
            francais: 'l\'enfant',
            japonais: '子',
            hiragana: 'こ',
            katakana: 'コ',
            romaji: 'ko',
        },
        {
            francais: 'Le soleil',
            japonais: '日',
            hiragana: 'ひ',
            katakana: 'ヒ',
            romaji: 'hi',
        },
        {
            francais: 'La lune',
            japonais: '月',
            hiragana: 'つき',
            katakana: 'ツキ',
            romaji: 'tsuki',
        },
        {
            francais: 'Le temps',
            japonais: '時',
            hiragana: 'とき',
            katakana: 'トキ',
            romaji: 'toki',
        },
        {
            francais: 'L\'eau',
            japonais: '水',
            hiragana: 'みず',
            katakana: 'ミズ',
            romaji: 'mizu',
        },
        {
            francais: 'Le feu',
            japonais: '火',
            hiragana: 'ひ',
            katakana: 'ヒ',
            romaji: 'hi',
        },
        {
            francais: 'La terre',
            japonais: '土',
            hiragana: 'つち',
            katakana: 'ツチ',
            romaji: 'tsuchi',
        },
        {
            francais: 'Le vent',
            japonais: '風',
            hiragana: 'かぜ',
            katakana: 'カゼ',
            romaji: 'kaze',
        },
        {
            francais: 'le ciel',
            japonais: '空',
            hiragana: 'そら',
            katakana: 'ソラ',
            romaji: 'sora',
        },
        {
            francais: 'La montagne',
            japonais: '山',
            hiragana: 'やま',
            katakana: 'ヤマ',
            romaji: 'yama',
        },
        {
            francais: 'La rivière',
            japonais: '川',
            hiragana: 'かわ',
            katakana: 'カワ',
            romaji: 'kawa',
        },
        {
            francais: 'L\'arbre',
            japonais: '木',
            hiragana: 'き',
            katakana: 'キ',
            romaji: 'ki',
        },
        {
            francais: 'La fleur',
            japonais: '花',
            hiragana: 'はな',
            katakana: 'ハナ',
            romaji: 'hana',
        },
        {
            francais: 'La pluie',
            japonais: '雨',
            hiragana: 'あめ',
            katakana: 'アメ',
            romaji: 'ame',
        },
        {
            francais: 'La neige',
            japonais: '雪',
            hiragana: 'ゆき',
            katakana: 'ユキ',
            romaji: 'yuki',
        },
        {
            francais: 'L\'argent',
            japonais: '金',
            hiragana: 'かね',
            katakana: 'カネ',
            romaji: 'kane',
        },
        {
            francais: 'Le sabre',
            japonais: '刀',
            hiragana: 'かたな',
            katakana: 'カタナ',
            romaji: 'katana',
        },
    ];

    const [indexes, setIndexes] = React.useState<number[]>([...Array(kanjis.length).keys()]);
    const [streak, setStreak] = React.useState<number>(0);
    const [tries, setTries] = React.useState<number>(0);
    const [value, setValue] = React.useState<string>('');

    const [lastIndex, setLastIndex] = React.useState<number>();
    const [currentIndex, setCurrentIndex] = React.useState<number>(indexes[Math.floor(Math.random() * indexes.length)]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && value !== '') {
            setLastIndex(currentIndex);
            setValue('');
            setTries(tries + 1);

            const newIndexes = indexes.filter((index) => index !== currentIndex);
            if (newIndexes.length) {
                setIndexes(newIndexes);
                setCurrentIndex(newIndexes[Math.floor(Math.random() * newIndexes.length)]);
            } else {
                setIndexes([...Array(kanjis.length).keys()]);
                setCurrentIndex(Math.floor(Math.random() * newIndexes.length));
            }

            if (kanjis[currentIndex].romaji === value) {
                setStreak(streak + 1);
            } else {
                setStreak(0);
            }
        }
    };

    console.log(indexes.length);

    return (
        <div id="japanese">
            <div id="kanji">
                {lastIndex && kanjis[lastIndex].japonais}
            </div>
            <div id="kanji">
                {kanjis[currentIndex].japonais}
            </div>
            <div>
                <input type="text" id="input" onKeyDown={handleOnKeyDown} onChange={handleChange} value={value} />
            </div>
            <div>
                Tries :
                {' '}
                {tries}
            </div>
            <div>
                Streak :
                {' '}
                {streak}
            </div>
            {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
            <div>
                {kanjis.map((kanji) => (
                    <div key={kanji.francais}>
                        {kanji.japonais}
                        {kanji.hiragana}
                        {kanji.katakana}
                        {kanji.romaji}
                        {kanji.francais}
                    </div>
                ))}
            </div>
        </div>
    );
}
