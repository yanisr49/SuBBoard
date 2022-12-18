/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/** @jsxImportSource @emotion/react */
import React, {
    CSSProperties, useCallback, useRef, useState, useEffect, useLayoutEffect, RefObject,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { current } from '@reduxjs/toolkit';
import { debounce, throttle } from 'lodash';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useDrag } from 'react-dnd';
import Chip from '../../chip/Chip';
import image from '../../../resources/img/netflix_logo.png';
import SubscriptionModel from '../../../models/SubscriptionModel';
import { SubStyle } from './SubStyle';
import { useAppSelector } from '../../../redux/reduxHooks';
import { selectTheme } from '../../../redux/store';
import Input from '../../../resources/common/input/Input';
import SubHeader from './SubHeader';
import { Query, Subscription } from '../../../graphql/generated/graphql';
import { deleteSubscription, editSubscription } from '../../../graphql/mutations';
import ROUTES_PATHS from '../../../router/RoutesPath';
import themes from '../../../theme';
import { QUERY_NAMES, TRANSITION_TIME } from '../../../resources/Constants';

interface Props {
  subscription: Subscription;
  expended: boolean;
  index: number;
  setDraggedSub: (sub: Subscription) => void;
}

let cursorX: number;
let cursorY: number;

function Sub({ subscription, expended, index, setDraggedSub }: Props) {
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

    const style = SubStyle(theme, expended, position, document.getElementsByTagName('html')[0].scrollTop);

    const test = (lastChangeTimestamp: number, oldTop: number, oldLeft: number) => {
        if (lastChangeTimestamp > Date.now() - 150) {
            const tds = document.getElementsByTagName('td');

            let top = 0;
            let left = 0;
            if (tds.length > index) {
                top = tds[index].getBoundingClientRect().top + 10;
                left = tds[index].getBoundingClientRect().left + 10;
            }

            if (position?.top !== top || position?.left !== left) {
                setPosition({
                    top,
                    left,
                });
            }

            const hasChanged = oldTop !== top || oldLeft !== left;
            setTimeout(() => {
                test(hasChanged ? Date.now() : lastChangeTimestamp, top, left);
            }, 10);
        }
    };

    useLayoutEffect(() => {
        test(Date.now(), 0, 0);
    }, [index]);

    useEffect(() => {
        const getCursorPosition = (e: MouseEvent) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        };

        document.addEventListener('mousemove', getCursorPosition);

        return () => document.removeEventListener('mousemove', getCursorPosition);
    }, []);

    useEffect(() => {
        const debouncedHandleResize = debounce(() => {
            const tds = document.getElementsByTagName('td');
            if (tds.length > index) {
                setPosition({
                    top: tds[index].getBoundingClientRect().top + 10,
                    left: tds[index].getBoundingClientRect().left + 10,
                });
            }
        }, 0);

        window.addEventListener('resize', debouncedHandleResize);
        document.getElementsByTagName('html')[0].addEventListener('scroll', debouncedHandleResize, true);
        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
            document.getElementsByTagName('html')[0].removeEventListener('scroll', debouncedHandleResize, true);
        };
    }, []);

    const handleMouse = throttle(() => {
        if (ref.current?.firstElementChild && !expended) {
            if (refChild.current) {
                const rect = ref.current.getBoundingClientRect();
                refChild.current.style.transform = `perspective(700px) rotateX(${-((cursorY - ((rect.bottom - rect.top) / 2) - rect.top) / 50)}deg) rotateY(${(cursorX - ((rect.left - rect.right) / 2) - rect.right) / 50}deg) translateZ(0px)`;
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
        >
            <div
                css={style.Card}
                ref={refChild}
            >
                <SubHeader
                    subscription={subscription}
                    expended={expended}
                />
                <div
                    onClick={handleDelete}
                    onKeyDown={(ev) => ev.key === 'Enter' && handleDelete()}
                    role="button"
                    tabIndex={0}
                >
                    Delete
                </div>
            </div>
        </div>
    );
}
const SubComponent = React.memo(Sub);
export default SubComponent;
