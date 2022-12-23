/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { throttle } from 'lodash';
import { SubStyle } from './SubStyle';
import { useAppSelector } from '../../../redux/reduxHooks';
import { selectTheme } from '../../../redux/store';
import SubHeader from './SubHeader';
import { Query, Subscription } from '../../../graphql/generated/graphql';
import { deleteSubscription } from '../../../graphql/mutations';
import { QUERY_NAMES, TRANSITION_TIME } from '../../../resources/Constants';

interface Props {
  subscription: Subscription;
  expended: boolean;
  index: number;
  loading: boolean;
  setDraggedSub: (sub?: Subscription) => void;
}

let cursorX: number;
let cursorY: number;

function Sub({ subscription, expended, index, loading, setDraggedSub }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const theme = useAppSelector(selectTheme).value;
    const ref = useRef<HTMLDivElement>(null);
    const refChild = useRef<HTMLDivElement>(null);

    const deleteSubscriptionMutation = useMutation(deleteSubscription, {
        onSuccess: (data) => {
            navigate(-1);

            setTimeout(() => {
                queryClient.setQueryData([QUERY_NAMES.fetchSubscription], (oldData: Pick<Query, 'subscriptions'> | undefined) => {
                    const newSubscriptions = {
                        subscriptions: [],
                    } as Pick<Query, 'subscriptions'>;

                    if (oldData?.subscriptions?.length) {
                        newSubscriptions.subscriptions = oldData.subscriptions.filter((sub) => sub?.id !== data.deleteSubscription);
                    }

                    return newSubscriptions;
                });
            }, TRANSITION_TIME.short);
        },
    });

    const [position, setPosition] = React.useState<{
        top?: number;
        left?: number;
    }>();

    const style = SubStyle(theme, loading, expended, position, document.getElementsByTagName('html')[0].scrollTop);

    const relocate = () => {
        const tds = document.getElementsByTagName('td');
        if (tds.length > index) {
            setPosition({
                top: tds[index].getBoundingClientRect().top + 10,
                left: tds[index].getBoundingClientRect().left + 10,
            });
        }
    };

    useEffect(() => {
        relocate();

        window.addEventListener('resize', relocate);
        return () => {
            window.removeEventListener('resize', relocate);
        };
    }, [index]);

    useEffect(() => {
        const getCursorPosition = (e: MouseEvent) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        };

        document.addEventListener('mousemove', getCursorPosition);

        return () => document.removeEventListener('mousemove', getCursorPosition);
    }, []);

    const handleMouse = throttle(() => {
        if (ref.current?.firstElementChild && !expended) {
            if (refChild.current) {
                const rect = ref.current.getBoundingClientRect();
                refChild.current.style.transform = `
                    perspective(700px)
                    rotateX(${-((cursorY - ((rect.bottom - rect.top) / 2) - rect.top) / 50)}deg)
                    rotateY(${(cursorX - ((rect.left - rect.right) / 2) - rect.right) / 50}deg)
                    translateZ(0px)
                `;
            }
        }
    }, 50);

    const handleOnMouseLeave = () => {
        if (!expended) {
            setTimeout(() => {
                if (refChild.current) {
                    refChild.current.style.transform = 'none';
                }
            }, 60);
        }
    };

    const handleDelete = () => {
        deleteSubscriptionMutation.mutate(subscription.id);
    };

    return (
        <div
            className="subscription"
            css={style.CardContainer}
            ref={ref}
            onMouseMove={() => requestAnimationFrame(handleMouse)}
            onPointerLeave={handleOnMouseLeave}
            onClick={handleOnMouseLeave}
            onKeyDown={(ev) => ev.key === 'Enter' && handleOnMouseLeave()}
            role="button"
            tabIndex={0}
            draggable
            onDragStart={() => setDraggedSub(subscription)}
            onDragEnd={() => setDraggedSub()}
        >
            <div
                css={style.Card}
                ref={refChild}
            >
                <SubHeader
                    subscription={subscription}
                    expended={expended}
                />
                {expended && (
                    <div
                        onClick={handleDelete}
                        onKeyDown={(ev) => ev.key === 'Enter' && handleDelete()}
                        role="button"
                        tabIndex={0}
                    >
                        Delete
                    </div>
                )}
            </div>
        </div>
    );
}
const SubComponent = React.memo(Sub);
export default SubComponent;
