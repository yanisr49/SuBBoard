/** @jsxImportSource @emotion/react */
import { SerializedStyles } from '@emotion/react';
import React from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { selectTheme } from '../../redux/store';
import { SelectStyle } from './SelectStyle';
import { useAppSelector } from '../../redux/reduxHooks';
import Spinner from './Spinner';

interface Props<T> {
    id: string;
    label: string;
    options: readonly T[];
    value?: T;
    extraCSS?: SerializedStyles;
    onChange: (value: T) => void;
    getOptionLabel: (option: T) => string;
    tabIndex: number;
    loading?: boolean;
}

export function Select<T>({ id, label, options, value, extraCSS, onChange, getOptionLabel, tabIndex, loading }: Props<T>) {
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(options.length);
    const selectedValueLabel = value ? getOptionLabel(value) : '';

    const theme = useAppSelector(selectTheme).value;
    const style = SelectStyle(theme, isOpen);

    const handleClick = (option: T) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div css={[style.Select, extraCSS]}>
            <p>{label}</p>
            <button
                {...buttonProps}
                type="button"
                tabIndex={tabIndex}
            >
                {selectedValueLabel}
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <Spinner
                loading={loading}
                success={!loading}
                color={theme.color.primary}
                cssStyle={style.SelectSpinner}
            />
            <div role="menu" css={style.Menu}>
                {options.map((option, index) => (
                    <a
                        key={id + getOptionLabel(option)}
                        {...itemProps[index]}
                        onClick={() => handleClick(option)}
                        onKeyDown={(ev) => ev.key === 'Enter' && handleClick(option)}
                        role="button"
                        tabIndex={0}
                    >
                        {getOptionLabel(option)}
                    </a>
                ))}
            </div>
        </div>
    );
}
