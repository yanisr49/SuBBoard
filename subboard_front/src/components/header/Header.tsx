/** @jsxImportSource @emotion/react */
import Profil from '../auth/Profil';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectTheme } from '../../redux/store';
import SubboardLogo from '../../img/logo.png';
import { HeaderStyle } from './HeaderStyle';
import themes from '../../theme';

export default function Header() {
    const theme = useAppSelector(selectTheme);
    const style = HeaderStyle(themes[theme.key]);

    return (
        <header css={style.header}>
            <img
                src={SubboardLogo}
                alt="logo"
            />
            <Profil />
        </header>
    );
}
