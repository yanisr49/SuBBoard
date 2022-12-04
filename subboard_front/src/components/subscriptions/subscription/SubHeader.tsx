import { useState, FocusEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPalette } from '@fortawesome/free-solid-svg-icons';
import { ColorResult, SwatchesPicker } from 'react-color';
import MaterialColors from 'material-colors';
import useOutsideClick from '../../../resources/hooks/useOutsideClick';

// eslint-disable-next-line max-len
const colorNames = ['red', 'pink', 'purple', 'deepPurple', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange'] as const;
const intensity = ['300', '400', '500', '600', '700', '800', '900'] as const;

// eslint-disable-next-line max-len
const colors = colorNames.map((colorName) => intensity.map((intens) => MaterialColors[colorName][intens]));

interface Props {
    name: string;
    handleChangeName: (value: string) => void;
    color: string;
    handleChangeColor: (value: string) => void;
    expended: boolean;
}

export default function SubHeader({ name, handleChangeName, color, handleChangeColor, expended }: Props) {
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
    const colorPickerRef = useRef<HTMLDivElement>(null);
    useOutsideClick(colorPickerRef, () => setDisplayColorPicker(false));

    // const style = SubStyle(theme, expended);

    const handleOnBlurName = (event: FocusEvent<HTMLInputElement, Element>) => {
        if (event.target.value !== name) {
            handleChangeName(event.target.value);
        }
    };

    const handleOnChangeColor = (event: ColorResult) => {
        if (event.hex !== color) {
            handleChangeColor(event.hex);
        }
    };

    return (
        <div className="cardHeader">
            <div className="cardImage">
                {/* eslint-disable-next-line max-len */}
                <img src="https://cdn.vox-cdn.com/thumbor/SEEvZdiXcs0CS-YbPj2gm6AJ8qc=/0x0:3151x2048/1400x1400/filters:focal(1575x1024:1576x1025)/cdn.vox-cdn.com/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png" alt="logo Netflix" />
                <FontAwesomeIcon icon={faPenToSquare} className="penToSquare" />
            </div>
            <input
                className="cardName"
                defaultValue={name}
                placeholder="Nom"
                onBlur={handleOnBlurName}
                disabled={!expended}
            />
            <div
                ref={colorPickerRef}
                className="buttonColorPicker"
                onClick={() => setDisplayColorPicker(!displayColorPicker)}
                onKeyDown={(ev) => ev.key === 'Enter' && setDisplayColorPicker(!displayColorPicker)}
                tabIndex={0}
                role="button"
            >
                <FontAwesomeIcon icon={faPalette} />
                <div
                    style={{
                        display: displayColorPicker ? 'block' : 'none',
                    }}
                >
                    <SwatchesPicker
                        color={color}
                        colors={colors}
                        onChangeComplete={handleOnChangeColor}
                        className="colorPicker"
                    />
                </div>
            </div>
        </div>
    );
}
