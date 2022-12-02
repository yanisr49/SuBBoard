import { css, Theme } from '@emotion/react';

export const PPStyle = (theme: Theme) => ({
    PPContainer: css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: theme.color.text,
        p: {
            margin: '0 20px',
        },
    }),
    ProfilPicture: css({
        display: 'block',
        width: '75px',
        height: '75px',
        borderRadius: '37.5px',
    }),
    Preferences: css({
        textAlign: 'center',
    }),
    Select: css({
        margin: '10px',
    }),
    logoutButton: css({
        backgroundColor: theme.color.error,
        color: theme.backgroundColor.ternary,
        minWidth: '50%',
        marginTop: '10px',
        padding: '10px',
        fontSize: '15px',
        border: 'none',
        borderRadius: '5px',
        ':hover': {
            cursor: 'pointer',
        },
    }),
    signInButton: css({
        position: 'absolute',
        top: '-40px',
        right: '0',
    }),
});
