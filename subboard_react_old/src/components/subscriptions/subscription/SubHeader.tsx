import { useState, FocusEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPalette } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from 'react-query';
import ColorPicker from '../modals/ColorPickerModal';
import Spinner from '../../../resources/components/Spinner';
import { editSubscription } from '../../../graphql/mutations';
import { Subscription } from '../../../graphql/generated/graphql';
import LogoPlaceholder from '../../../resources/img/SubLogoPlaceholder.png';
import '../modals/ColorPickerModal.css';
import LogoPicker from '../modals/LogoPickerModal';
import useImageExists from '../hooks/useImageExists';

interface Props {
    subscription: Subscription;
    expended: boolean;
}

export default function SubHeader({ subscription, expended }: Props) {
    const [displayLogoPicker, setDisplayLogoPicker] = useState<boolean>(false);
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
    const colorPickerRef = useRef<HTMLDivElement>(null);
    const [subName, setSubname] = useState<string>(subscription.name ?? '');
    const [subColor, setSubcolor] = useState<string>(subscription.color ?? 'red');
    const [Img, subLogo, setSublogo] = useImageExists(subscription.logo ?? '', 'logo', LogoPlaceholder);
    const inputRef = useRef<HTMLInputElement>(null);

    const editSubLogoMutation = useMutation(editSubscription, {
        mutationKey: 'logo',
        onMutate: async (data) => {
            const previousData = {
                ...subscription,
            };
            previousData.logo = subLogo;
            const newData = {
                ...subscription,
            };
            newData.logo = data.logo ?? '';
            setSublogo(newData.logo);
            return {
                previousData, newData,
            };
        },
        onError: (err, newData, context) => {
            setSublogo(context?.previousData.logo ?? '');
        },
    });

    const handleChangeLogo = (value: string) => {
        editSubLogoMutation.mutate({
            id: subscription.id,
            logo: value,
        });
    };

    const editSubNameMutation = useMutation(editSubscription, {
        mutationKey: 'name',
        onMutate: async (data) => {
            const previousData = {
                ...subscription,
            };
            previousData.name = subName;
            const newData = {
                ...subscription,
            };
            newData.name = data.name ?? '';
            setSubname(newData.name);
            return {
                previousData, newData,
            };
        },
        onError: (err, newData, context) => {
            setSubname(context?.previousData.name ?? '');
        },
    });

    const handleOnBlurName = (event: FocusEvent<HTMLInputElement, Element>) => {
        if (event.target.value !== subName) {
            editSubNameMutation.mutate({
                id: subscription.id,
                name: event.target.value,
            });
        }
    };

    const editSubColorMutation = useMutation(editSubscription, {
        mutationKey: 'color',
        onMutate: async (data) => {
            const previousData = {
                ...subscription,
            };
            previousData.color = subColor;
            const newData = {
                ...subscription,
            };
            newData.color = data.color ?? '';
            setSubcolor(newData.color);
            return {
                previousData, newData,
            };
        },
        onError: (err, newData, context) => {
            setSubcolor(context?.previousData.name ?? '');
        },
    });

    const handleChangeColor = (value: string) => {
        editSubColorMutation.mutate({
            id: subscription.id,
            color: value,
        });
    };

    // eslint-disable-next-line max-len
    // https://cdn.vox-cdn.com/thumbor/SEEvZdiXcs0CS-YbPj2gm6AJ8qc=/0x0:3151x2048/1400x1400/filters:focal(1575x1024:1576x1025)/cdn.vox-cdn.com/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png
    return (
        <div
            className="cardHeader"
            style={{
                backgroundColor: subColor,
            }}
        >
            <div
                className="cardImage"
                onClick={() => setDisplayLogoPicker(!displayLogoPicker)}
                onKeyDown={(ev) => ev.key === 'Enter' && setDisplayLogoPicker(!displayLogoPicker)}
                tabIndex={0}
                role="button"
            >
                {Img}
                <FontAwesomeIcon icon={faPenToSquare} className="penToSquare" />
            </div>
            <LogoPicker
                isOpen={displayLogoPicker}
                className="logoPicker"
                logo={subLogo}
                onChange={handleChangeLogo}
                onClose={() => { setDisplayLogoPicker(false); return true; }}
            />
            <input
                className="cardName"
                defaultValue={subName}
                placeholder="Nom"
                onBlur={handleOnBlurName}
                disabled={!expended}
                ref={inputRef}
                onKeyDown={(ev) => ev.key === 'Enter' && inputRef.current?.blur()}
            />
            <div className="headerRightOptions">
                <Spinner
                    className="spinner"
                    loading={editSubNameMutation.isLoading || editSubColorMutation.isLoading || editSubLogoMutation.isLoading}
                    success={editSubNameMutation.isSuccess || editSubColorMutation.isSuccess || editSubLogoMutation.isSuccess}
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
                </div>
            </div>
            <ColorPicker
                color={subColor}
                onChange={handleChangeColor}
                isOpen={displayColorPicker}
                className="colorPicker"
                onClose={() => { setDisplayColorPicker(false); return true; }}
            />
        </div>
    );
}
