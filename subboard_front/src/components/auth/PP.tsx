/** @jsxImportSource @emotion/react */
import Skeleton from 'react-loading-skeleton';
import { useMutation } from 'react-query';
import { Select } from '../../resources/common/Select';
import { updateTheme } from '../../redux/themeSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { isThemesKey, ThemesKeys, themesKeys } from '../../theme';
import { ProfilStyle } from './ProfilStyle';
import { selectTheme } from '../../redux/store';
import { changeThemeMutation } from '../../graphql/mutations';

interface Props {
    loading?: boolean;
    profilPicture: string;
    email: string;
    expended: boolean;
    onLogOut: () => void;
}

export default function PP({ loading, profilPicture, email, expended, onLogOut } : Props) {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const style = ProfilStyle(theme.value, expended, true, expended);

    const changeTheme = useMutation(changeThemeMutation, {
        onSuccess: (data) => {
            if (data.theme && isThemesKey(data.theme)) {
                dispatch(updateTheme(data.theme));
            }
        },
    });

    const handleChange = (option: ThemesKeys) => {
        changeTheme.mutate(option);
    };

    return (
        <div>
            <div
                css={style.PPContainer}
            >
                {loading ? (
                    <Skeleton
                        baseColor={theme.value.backgroundColor.primary}
                        highlightColor={theme.value.color.primary}
                        css={style.ProfilPicture}
                    />
                ) : (
                    <img
                        css={style.ProfilPicture}
                        src={profilPicture}
                        referrerPolicy="no-referrer"
                        alt="Profil"
                    />
                )}
                <p>{email}</p>
            </div>
            <div
                css={style.Preferences}
            >
                <Select
                    id="themes"
                    label="Thème"
                    options={themesKeys}
                    getOptionLabel={(option) => option}
                    onChange={handleChange}
                    value={theme.key}
                    extraCSS={style.Select}
                    tabIndex={expended ? 0 : -1}
                    loading={changeTheme.isLoading}
                />
                <button
                    css={style.logoutButton}
                    onClick={onLogOut}
                    type="button"
                    tabIndex={expended ? 0 : -1}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
