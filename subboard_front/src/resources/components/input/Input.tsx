/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useAppSelector } from '../../../redux/reduxHooks';
import { selectTheme } from '../../../redux/store';
import { InputStyle } from './InputStyle';

interface Props {
    id: string;
    name: string;
    handleChange?: (text: string) => void;
    handleBlur?: (text: string) => void;
}

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function Input({ id, name, handleChange, handleBlur, ...inputProps }: InputProps & Props) {
    const theme = useAppSelector(selectTheme).value;
    const style = InputStyle(theme);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (handleChange) {
            handleChange(event.target.value);
        }
    };

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        if (handleBlur) {
            handleBlur(event.target.value);
        }
    };

    return (
        <div css={style.InputContainer}>
            <label htmlFor={id}>{name}</label>
            <input
                id={id}
                type="text"
                onChange={handleChange && handleOnChange}
                onBlur={handleBlur && handleOnBlur}
                {...inputProps}
            />
        </div>
    );
}
