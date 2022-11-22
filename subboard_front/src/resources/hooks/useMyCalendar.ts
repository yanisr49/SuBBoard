import { useEffect, useState, useRef } from 'react';

export default function useMyCalendar() {
    const [state, setState] = useState('wohoo');

    console.log('TODO');

    return [state, setState] as const;
}
