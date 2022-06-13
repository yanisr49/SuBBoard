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

export default Utils;
