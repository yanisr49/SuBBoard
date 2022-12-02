/** @jsxImportSource @emotion/react */
import React from 'react';
import { useMutation } from 'react-query';
import { Frequency } from '../../../graphql/generated/graphql';
import { addSubscription } from '../../../graphql/mutations';
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

    const addSubscriptionMutation = useMutation(addSubscription);

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        onBlur(event.target.value);
        // addSubscriptionMutation.mutate({
        //     color: 'red',
        //     dueDate: new Date(2024, 0, 1),
        //     endDatePromotion: new Date(2023, 5, 1),
        //     frequency: Frequency.Monthly,
        //     logo: 'https://www.numerama.com/wp-content/uploads/2016/06/netflix-nouveau-logo.jpg',
        //     name: 'Netflix',
        //     price: 13.99,
        //     promotion: 3.29,
        // });
    };

    return (
        <div css={style.InputContainer}>
            <label htmlFor={id}>{name}</label>
            <input id={id} type="text" onBlur={handleOnBlur} />
        </div>
    );
}
