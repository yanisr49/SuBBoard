import { useEffect, useState, useRef } from 'react';

export default function useMyCalendar() {
    const [state, setState] = useState('wohoo');

    const t = new Date();
    console.log(t);

    console.log('TODO');

    return [state, setState] as const;
}
