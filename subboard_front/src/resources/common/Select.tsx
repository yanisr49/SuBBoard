/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/** @jsxImportSource @emotion/react */
import { SerializedStyles } from '@emotion/react';
import React, { MouseEventHandler } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectTheme } from '../../redux/store';
import { SelectStyle } from './SelectStyle';

interface Props<T> {
    id: string;
    label: string;
    readonly options: T[];
    initialValue?: T;
    extraCSS?: SerializedStyles;
    onChange: (value: T) => void;
    getOptionLabel: (option: T) => string;
}

export function Select<T>({ id, label, options, initialValue, extraCSS, onChange, getOptionLabel }: Props<T>) {
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(options.length);
    const [selectedValue, setSelectedValue] = React.useState<T | undefined>(initialValue);
    const selectedValueLabel = selectedValue ? getOptionLabel(selectedValue) : '';

    const theme = useAppSelector(selectTheme);
    const style = SelectStyle(theme.value, isOpen);

    const handleClick = (option: T) => {
        setSelectedValue(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div css={[style.Select, extraCSS]}>
            <p>{label}</p>
            <button {...buttonProps} type="button">
                {selectedValueLabel}
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div role="menu">
                {options.map((option, index) => (
                    <a
                        key={id + getOptionLabel(option)}
                        {...itemProps[index]}
                        onClick={() => handleClick(option)}
                    >
                        {getOptionLabel(option)}
                    </a>
                ))}
            </div>
        </div>
    );
}
