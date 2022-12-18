/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/** @jsxImportSource @emotion/react */
import React, {
    CSSProperties, useCallback, useRef, useState, useEffect, useLayoutEffect,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { current } from '@reduxjs/toolkit';
import { createNoSubstitutionTemplateLiteral, ListFormat } from 'typescript';
import { debounce, throttle } from 'lodash';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Chip from '../../chip/Chip';
import image from '../../../resources/img/netflix_logo.png';
import SubscriptionModel from '../../../models/SubscriptionModel';
import { useAppSelector } from '../../../redux/reduxHooks';
import { selectTheme } from '../../../redux/store';
import Input from '../../../resources/common/input/Input';
import { Subscription } from '../../../graphql/generated/graphql';
import { editSubscription } from '../../../graphql/mutations';
import ROUTES_PATHS from '../../../router/RoutesPath';
import themes from '../../../theme';
import { NewSubStyle } from './NewSubStyle';

interface Props {
  subscription: Subscription;
  expended: boolean;
}

function NewSub() {
    // const navigate = useNavigate();
    const theme = useAppSelector(selectTheme).value;
    const ref = useRef<HTMLDivElement>(null);

    const [position, setPosition] = React.useState<{
        top?: number;
        left?: number;
    }>();

    const style = NewSubStyle(theme, position);

    useEffect(() => {
        const debouncedHandleResize = debounce(() => {
            const tds = document.getElementsByTagName('td');
            if (tds.length > 0) {
                setPosition({
                    top: tds[0].getBoundingClientRect().top + 10,
                    left: tds[0].getBoundingClientRect().left + 10,
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

    const test = (lastChangeTimestamp: number, oldTop: number, oldLeft: number) => {
        if (lastChangeTimestamp > Date.now() - 500) {
            const tds = document.getElementsByTagName('td');

            let top = 0;
            let left = 0;
            if (tds.length > 0) {
                top = tds[0].getBoundingClientRect().top + 10;
                left = tds[0].getBoundingClientRect().left + 10;
            }

            setPosition({
                top,
                left,
            });

            const hasChanged = oldTop !== top || oldLeft !== left;
            setTimeout(() => {
                test(hasChanged ? Date.now() : lastChangeTimestamp, top, left);
            }, 10);
        }
    };

    useLayoutEffect(() => {
        test(Date.now(), 0, 0);
    }, []);

    return (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            css={style.NewSubContainer}
            ref={ref}
            className="subscription"
        >
            <div
                css={style.NewSub}
            >
                +
            </div>
        </div>
    );
}
const NewSubComponent = React.memo(NewSub);
export default NewSubComponent;
