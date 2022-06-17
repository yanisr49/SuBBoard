import React from 'react';

interface Props {
    id: string;
    label: string;
    checked: boolean | undefined;
    onChange: () => void;
}

export function Select({
    id, label, checked, onChange,
}: Props) {
    return (
        <input
            type="radio"
            id={id}
            onChange={() => onChange()}
            checked={checked}
        />
    );
}
