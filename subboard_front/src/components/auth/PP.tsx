/** @jsxImportSource @emotion/react */
import { Select } from '../../resources/common/Select';
import { changeTheme } from '../../redux/themeSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { themesKeys } from '../../theme';
import { ProfilStyle } from './ProfilStyle';
import { selectTheme } from '../../redux/store';

interface Props {
    profilPicture: string;
    email: string;
    expended: boolean;
    onLogOut: () => void;
}

export default function PP({ profilPicture, email, expended, onLogOut } : Props) {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);

    const style = ProfilStyle(theme.value, expended);

    return (
        <div>
            <div
                css={style.PPContainer}
            >
                <img
                    css={style.ProfilPicture}
                    src={profilPicture}
                    referrerPolicy="no-referrer"
                    alt="Profil"
                />
                <p>{email}</p>
            </div>
            <div
                css={style.Preferences}
            >
                <Select
                    id="themes"
                    label="Thème"
                    options={[...themesKeys]}
                    getOptionLabel={(option) => option}
                    onChange={(option) => { dispatch(changeTheme(option)); }}
                    initialValue={theme.key}
                    extraCSS={style.Select}
                />
                <button
                    css={style.logoutButton}
                    onClick={onLogOut}
                    type="button"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
