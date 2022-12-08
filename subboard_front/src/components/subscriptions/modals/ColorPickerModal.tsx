import MaterialColors from 'material-colors';
import Modal from 'react-pure-modal';

// eslint-disable-next-line max-len
const colorNames = ['red', 'pink', 'purple', 'deepPurple', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange'] as const;
const intensities = ['300', '400', '500', '600', '700', '800', '900'] as const;

interface Props {
    color: string;
    onChange: (color: string) => void;
    replace?: boolean;
    className?: string;
    header?: JSX.Element | string;
    footer?: JSX.Element | string;
    scrollable?: boolean;
    draggable?: boolean;
    width?: string;
    isOpen?: boolean;
    onClose?: () => void;
    closeButton?: JSX.Element | string;
    closeButtonPosition?: string;
    portal?: boolean;
}

export default function ColorPicker({ color, onChange, ...props }: Props) {
    return (
        <Modal
            {...props}
        >
            <div className="containerStyle">
                {colorNames.map((colorName) => (
                    <div
                        key={`ColorColumn-${colorName}`}
                    >
                        {intensities.map((intensity) => (
                            <div
                                key={`Color-${colorName}-${intensity}`}
                                className={color === MaterialColors[colorName][intensity] ? 'optionStyle optionSelected' : 'optionStyle'}
                                style={{
                                    backgroundColor: MaterialColors[colorName][intensity],
                                    boxShadow: color === MaterialColors[colorName][intensity]
                                        ? `0px 0px 4px 2px ${MaterialColors[colorName][intensity]}`
                                        : '',
                                }}
                                onClick={() => onChange(MaterialColors[colorName][intensity])}
                                onKeyDown={(ev) => ev.key === 'Enter' && onChange(MaterialColors[colorName][intensity])}
                                role="button"
                                tabIndex={0}
                            >
                                {colorName}
                                -
                                {intensity}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Modal>
    );
}
