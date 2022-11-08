/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { MouseEventHandler } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

const style = (open: boolean) => css`
    background-color: blue;
    height: 40px;

    & > button {
        display: block;
        height: 100%;
        width: 200px;
    }

    & > div {
        visibility: ${open ? 'visible' : 'hidden'};

        & > a {
            display: block;
            color: white;
        }
    }
`;

interface Props<T> {
    id: string;
    label: string;
    readonly options: T[];
    initialValue?: T;
    onChange: (value: T) => void;
    getOptionLabel: (option: T) => string;
}

export function Select<T>({ id, label, options, initialValue, onChange, getOptionLabel }: Props<T>) {
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(options.length);
    const [selectedValue, setSelectedValue] = React.useState<T | undefined>(initialValue);
    const selectedValueLabel = selectedValue ? getOptionLabel(selectedValue) : '';

    const handleClick = (option: T) => {
        setSelectedValue(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div css={style(isOpen)}>
            <button {...buttonProps} type="button">{selectedValueLabel}</button>
            <div role="menu">
                {options.map((option, index) => (
                    <a
                        key={id + getOptionLabel(option)}
                        {...itemProps[index]}
                        onClick={() => handleClick(option)}
                        style={{
                            backgroundColor: 'red',
                            fontSize: '2rem',
                        }}
                    >
                        {getOptionLabel(option)}
                    </a>
                ))}
            </div>
        </div>
    );
}
