/** @jsxImportSource @emotion/react */
import React from 'react';
import { useMutation } from 'react-query';
import { Frequency } from '../../../graphql/generated/graphql';
import { createSubscription } from '../../../graphql/mutations';
import { useAppSelector } from '../../../redux/reduxHooks';
import { selectTheme } from '../../../redux/store';
import { InputStyle } from './InputStyle';

interface Props {
    id: string;
    name: string;
    onBlur: (text: string) => void;
}

export default function Input({ id, name, onBlur }: Props) {
    const theme = useAppSelector(selectTheme).value;
    const style = InputStyle(theme);

    const createSubscriptionMutation = useMutation(createSubscription);

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        onBlur(event.target.value);
        createSubscriptionMutation.mutate();
    };

    return (
        <div css={style.InputContainer}>
            <label htmlFor={id}>{name}</label>
            <input id={id} type="text" onBlur={handleOnBlur} />
        </div>
    );
}
