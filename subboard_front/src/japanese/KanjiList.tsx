import React from 'react';
import { IKanji } from './kanji';
import './kanjiList.scss';
import { firstWords } from './kanjis/PremierMots';

interface IKanjiSet {
    name: string;
    kanjiList: IKanji[];
    selected: boolean;
}

interface Props {
    handleSelectedKanjis: (kanjis: IKanji[]) => void;
}

export default function KanjiList({ handleSelectedKanjis }: Props) {
    const [kanjiSets, setKanjiSets] = React.useState<IKanjiSet[]>([
        {
            name: 'Premier mots',
            kanjiList: firstWords,
            selected: true,
        },
    ]);

    const handleClick = (kanji: IKanjiSet) => {
        const clickedkanjiIndex = kanjiSets.findIndex((kanjiSet) => kanjiSet.name === kanji.name);
        if (clickedkanjiIndex !== -1) {
            kanjiSets[clickedkanjiIndex].selected = !kanjiSets[clickedkanjiIndex].selected;
            setKanjiSets([...kanjiSets]);
            handleSelectedKanjis(kanjiSets.filter((kanjiSet) => kanjiSet.selected).flatMap((kanjiSet) => kanjiSet.kanjiList));
        }
    };

    return (
        <div id="list">
            {kanjiSets.map((kanji) => (
                <button className={`kanjiList ${kanji.selected ? 'selected' : ''}`} type="button" onClick={() => handleClick(kanji)}>
                    {kanji.name}
                </button>
            ))}
        </div>
    );
}
