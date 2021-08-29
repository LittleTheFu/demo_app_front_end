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
} from './types';

const initialState: AllState = {
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