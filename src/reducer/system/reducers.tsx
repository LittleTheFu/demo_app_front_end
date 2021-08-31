// src/store/system/reducers.ts

import {
    AllState,
    SystemActionTypes,
    CLOSE_HINT,
    OPEN_HINT,
    OPEN_MASK,
    CLOSE_MASK,
    OPEN_DRAWER,
    CLOSE_DRAWER,
    UPDATE_UNREAD_MAIL_COUNT,
    INCREASE_UNREAD_MAIL_COUNT,
    DECREASE_UNREAD_MAIL_COUNT,
    REFRESH_MAIL_PAGE,
    SET_CURRENT_USER,
    SET_CURRENT_USER_NAME,
    SET_CURRENT_USER_ICON,
} from './types';

const initialState: AllState = {
    name: 'name',
    icon: 'http://101.132.41.44:9000/mall/20210821/213.jpg',

    hintOpen: false,
    hintMsg: 'msg',

    showBannedMask: false,
    drawerOpen: false,

    isPlaying: false,

    refreshMailPage: false,
    unreadMailCnt: 0,
};

export function systemReducer(state = initialState, action: SystemActionTypes): AllState {
    console.log(action);
    switch (action.type) {
        case UPDATE_UNREAD_MAIL_COUNT:
        case REFRESH_MAIL_PAGE: {
            return {
                ...state,
                refreshMailPage: !state.refreshMailPage,
            };
        }
        case INCREASE_UNREAD_MAIL_COUNT: {
            return {
                ...state,
                unreadMailCnt: state.unreadMailCnt + 1,
            };
        }
        case DECREASE_UNREAD_MAIL_COUNT: {
            return {
                ...state,
                unreadMailCnt: state.unreadMailCnt - 1,
            };
        }
        case CLOSE_HINT: {
            return {
                ...state,
                hintOpen: false,
            };
        }
        case SET_CURRENT_USER_ICON:
        case SET_CURRENT_USER_NAME:
        case SET_CURRENT_USER: {
            console.log(action);
            return {
                ...state,
                ...action.payload,
            }
        }
        case OPEN_HINT: {
            return {
                ...state,
                ...action.payload,
                hintOpen: true,
            };
        }
        case OPEN_MASK: {
            return {
                ...state,
                showBannedMask: true,
            };
        }
        case CLOSE_MASK: {
            return {
                ...state,
                showBannedMask: false,
            };
        }
        case OPEN_DRAWER: {
            return {
                ...state,
                drawerOpen: true,
            };
        }
        case CLOSE_DRAWER: {
            return {
                ...state,
                drawerOpen: false,
            };
        }
        default:
            return state;
    }
}