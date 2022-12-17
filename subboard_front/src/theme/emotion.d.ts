import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    backgroundColor: {
      primary: string
      primaryIntermediate: string;
      secondary: string;
      secondaryIntermediate: string;
      ternary: string;
      light: string;
      light2: string;
    },
    color: {
        text: string
        primary: string
        error: string
    }
  }
}
