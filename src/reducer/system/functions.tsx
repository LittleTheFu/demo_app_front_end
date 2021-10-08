import {
  SystemActionTypes,
  SET_CURRENT_USER_NAME,
  SET_CURRENT_USER_ICON,
  SET_CURRENT_USER,
  OPEN_HINT,
  OPEN_MASK,
  CLOSE_MASK,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  UPDATE_PLAY_STATE,
  UPDATE_UNREAD_MAIL_COUNT,
  INCREASE_UNREAD_MAIL_COUNT,
  DECREASE_UNREAD_MAIL_COUNT,
  REFRESH_MAIL_PAGE,
  CLOSE_HINT,
} from "./types";

import { Dispatch } from "redux";

export const setCurrentIcon = (
  dispatch: Dispatch<SystemActionTypes>,
  icon: string
): void => {
  dispatch({
    type: SET_CURRENT_USER_ICON,
    payload: {
      icon: icon,
    },
  });
};

export const setCurrentName = (
  dispatch: Dispatch<SystemActionTypes>,
  name: string
): void => {
  dispatch({
    type: SET_CURRENT_USER_NAME,
    payload: {
      name: name,
    },
  });
};

export const setCurrentUser = (
  dispatch: Dispatch<SystemActionTypes>,
  name: string,
  icon: string
): void => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: {
      name: name,
      icon: icon,
    },
  });
};

export const closeHint = (dispatch: Dispatch<SystemActionTypes>): void => {
  dispatch({ type: CLOSE_HINT });
};

export const openHint = (
  dispatch: Dispatch<SystemActionTypes>,
  message: string
): void => {
  dispatch({ type: OPEN_HINT, payload: { hintMsg: message } });
};

export const openMask = (dispatch: Dispatch<SystemActionTypes>): void => {
  dispatch({ type: OPEN_MASK });
};

export const closeMask = (dispatch: Dispatch<SystemActionTypes>): void => {
  dispatch({ type: CLOSE_MASK });
};

export const openDrawer = (dispatch: Dispatch<SystemActionTypes>): void => {
  dispatch({ type: OPEN_DRAWER });
};

export const closeDrawer = (dispatch: Dispatch<SystemActionTypes>): void => {
  dispatch({ type: CLOSE_DRAWER });
};

export const updatePlayState = (
  dispatch: Dispatch<SystemActionTypes>,
  isPlaying: boolean
): void => {
  dispatch({ type: UPDATE_PLAY_STATE, payload: { isPlaying: isPlaying } });
};

export const updateUnreadMailCount = (
  dispatch: Dispatch<SystemActionTypes>,
  unreadMailCnt: number
): void => {
  dispatch({
    type: UPDATE_UNREAD_MAIL_COUNT,
    payload: { unreadMailCnt: unreadMailCnt },
  });
};

export const increaseUnreadMailCount = (
  dispatch: Dispatch<SystemActionTypes>
): void => {
  dispatch({ type: INCREASE_UNREAD_MAIL_COUNT });
};

export const decreaseUnreadMailCount = (
  dispatch: Dispatch<SystemActionTypes>
): void => {
  dispatch({ type: DECREASE_UNREAD_MAIL_COUNT });
};

export const refreshMailPage = (
  dispatch: Dispatch<SystemActionTypes>
): void => {
  dispatch({ type: REFRESH_MAIL_PAGE });
};
