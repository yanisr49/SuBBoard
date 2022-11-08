import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    backgroundColor: {
      primary: string
      secondary: string
      ternary: string
    },
    color: {
        primary: string
    }
  }
}
