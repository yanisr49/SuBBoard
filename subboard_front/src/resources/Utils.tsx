import { TtDays } from '../graphql/generated/graphql';

const Utils = {
    hex2rgba: (hex: string, alpha = 1): string => {
        if (alpha > 1 || alpha < 0) {
            throw new Error('alpha is not correct!');
        }

        const red = parseInt(hex.slice(0, 2), 16);
        const green = parseInt(hex.slice(2, 4), 16);
        const blue = parseInt(hex.slice(4, 6), 16);

        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    },
};

export const compareTTDays = (day1: TtDays, day2: Date) => {
    const date1 = new Date(day1.year, day1.month - 1, day1.day);
    if (date1 < day2) return -1;
    if (date1 > day2) return 1;
    return 0;
};

export default Utils;
