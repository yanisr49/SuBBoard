/** @jsxImportSource @emotion/react */
import Skeleton from 'react-loading-skeleton';
import { useMutation, useQueryClient } from 'react-query';
import { Select } from '../../resources/common/Select';
import { updateTheme } from '../../redux/themeSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { isThemesKey, ThemesKeys, themesKeys } from '../../theme';
import { selectTheme, selectUser } from '../../redux/store';
import { changeThemeMutation } from '../../graphql/mutations';
import { QUERY_NAMES } from '../../resources/Constants';
import { Query } from '../../graphql/generated/graphql';
import { PPStyle } from './PPStyle';

interface Props {
    loading?: boolean;
    profilPicture: string;
    email: string;
    expended: boolean;
    onLogOut: () => void;
}

export default function PP({ loading, profilPicture, email, expended, onLogOut } : Props) {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const user = useAppSelector(selectUser);
    const style = PPStyle(theme.value);

    const changeTheme = useMutation(changeThemeMutation, {
        onSuccess: (data) => {
            if (data.theme && isThemesKey(data.theme)) {
                dispatch(updateTheme(data.theme));
            }
        },
        onMutate: async (data) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_NAMES.fetchUser, user],
            });

            // Snapshot the previous value
            const previousData: Pick<Query, 'user'> | undefined = queryClient.getQueryData([QUERY_NAMES.fetchUser, user]);

            const newData = queryClient.setQueryData(
                [QUERY_NAMES.fetchUser, user],
                (oldData: Pick<Query, 'user'> | undefined) => {
                    dispatch(updateTheme(data));

                    if (oldData?.user) {
                        return {
                            ...oldData,
                            user: {
                                ...oldData.user,
                                theme: data,
                            },
                        };
                    }
                    return {
                        user: {
                            email: 'TODO',
                            theme: data,
                        },
                    };
                },
            );

            return {
                previousData, newData,
            };
        },
        onError: (err, newData, context) => {
            queryClient.setQueryData(
                [QUERY_NAMES.fetchUser, user],
                context?.previousData,
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_NAMES.fetchUser, user],
            });
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
