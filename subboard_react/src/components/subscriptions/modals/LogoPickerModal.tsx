import Modal from 'react-pure-modal';

interface Props {
    logo: string;
    onChange: (url: string) => void;
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

export default function LogoPicker({ logo, onChange, ...props }: Props) {
    return (
        <Modal
            {...props}
        >
            <input
                type="text"
                defaultValue={logo}
                placeholder="URL de l'image"
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(ev) => ev.key === 'Enter' && props.onClose && props.onClose()}
                onBlur={props.onClose}
            />
        </Modal>
    );
}
