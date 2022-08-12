import React from 'react';
import CurrentKanji from './CurrentKanji';
import KanjiList from './KanjiList';
import LastKanji from './LastKanji';
import { firstWords } from './kanjis/PremierMots';
import './kanji.scss';

export interface IKanji {
    francais: string;
    kanji: string;
    hiragana: string;
    katakana: string;
    romaji: string;
}

export default function Kanji() {
    const [kanjis, setKanjis] = React.useState<IKanji[]>(firstWords);
    const [indexes, setIndexes] = React.useState<number[]>([...Array(firstWords.length).keys()]);
    const [lastIndex, setLastIndex] = React.useState<number>();
    const [currentIndex, setCurrentIndex] = React.useState<number>(indexes[Math.floor(Math.random() * indexes.length)]);
    const [lastKanjiSuccess, setLastKanjiSuccess] = React.useState<boolean>();

    const handleResponse = (result: boolean) => {
        setLastIndex(currentIndex);
        setLastKanjiSuccess(result);

        const newIndexes = indexes.filter((index) => index !== currentIndex);
        if (newIndexes.length) {
            setIndexes(newIndexes);
            setCurrentIndex(newIndexes[Math.floor(Math.random() * newIndexes.length)]);
        } else {
            setIndexes([...Array(firstWords.length).keys()]);
            setCurrentIndex(Math.floor(Math.random() * newIndexes.length));
        }
    };

    const handleSelectedKanjis = (newKanjis: IKanji[]) => {
        setKanjis(newKanjis);
        setIndexes([...Array(newKanjis.length).keys()]);
    };

    const currentKanji = currentIndex ? kanjis[currentIndex] : undefined;
    const lastKanji = lastIndex ? kanjis[lastIndex] : undefined;

    return (
        <div id="japanese">
            <KanjiList handleSelectedKanjis={handleSelectedKanjis} />
            <CurrentKanji
                kanji={currentKanji}
                handleResponse={handleResponse}
            />
            <LastKanji kanji={lastKanji} success={lastKanjiSuccess} />
        </div>
    );
}
