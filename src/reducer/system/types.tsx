// src/store/system/types.ts
export interface LoginState {
  isLogin: boolean;
}

export interface AvatarState {
  name: string;
  icon: string;
}

export interface HintState {
  hintOpen: boolean;
  hintMsg: string;
}

export interface MaskState {
  showBannedMask: boolean;
}

export interface DrawerState {
  drawerOpen: boolean;
}

export interface PlayState {
  isPlaying: boolean;
}

export interface MailState {
  refreshMailPage: boolean;
  unreadMailCnt: number;
}

///////////////////

export interface AllState
  extends LoginState,
    AvatarState,
    HintState,
    MaskState,
    DrawerState,
    PlayState,
    MailState {}

export const OPEN_HINT = "OPEN_HINT";

interface OpenHintAction {
  type: typeof OPEN_HINT;
  payload: { hintMsg: string };
}

export const SET_CURRENT_USER_NAME = "SET_CURRENT_USER_NAME";
interface SetCurrentUserNameAction {
  type: typeof SET_CURRENT_USER_NAME;
  payload: { name: string };
}

export const SET_CURRENT_USER_ICON = "SET_CURRENT_USER_ICON";
interface SetCurrentUserIconAction {
  type: typeof SET_CURRENT_USER_ICON;
  payload: { icon: string };
}

export const SET_CURRENT_USER = "SET_CURRENT_USER";
interface SetAvatarAction {
  type: typeof SET_CURRENT_USER;
  payload: { name: string; icon: string };
}

export const CLOSE_HINT = "CLOSE_HINT";
interface CloseHintAction {
  type: typeof CLOSE_HINT;
}

export const OPEN_MASK = "OPEN_MASK";
export const CLOSE_MASK = "CLOSE_MASK";
interface OpenMaskAction {
  type: typeof OPEN_MASK;
}
interface CloseMaskAction {
  type: typeof CLOSE_MASK;
}

export const OPEN_DRAWER = "OPEN_DRAWER";
export const CLOSE_DRAWER = "CLOSE_DRAWER";
interface OpenDrawerAction {
  type: typeof OPEN_DRAWER;
}
interface CloseDrawerAction {
  type: typeof CLOSE_DRAWER;
}

export const UPDATE_LOGIN_STATE = "UPDATE_LOGIN_STATE";
interface UpdateLoginStateAction {
  type: typeof UPDATE_LOGIN_STATE;
  payload: {
    isLogin: boolean;
  };
}

export const UPDATE_PLAY_STATE = "UPDATE_PLAY_STATE";
interface UpdatePlayStateAction {
  type: typeof UPDATE_PLAY_STATE;
  payload: {
    isPlaying: boolean;
  };
}

export const UPDATE_UNREAD_MAIL_COUNT = "UPDATE_UNREAD_MAIL_COUNT";
interface UpdateUnreadMailCountAction {
  type: typeof UPDATE_UNREAD_MAIL_COUNT;
  payload: {
    unreadMailCnt: number;
  };
}

export const INCREASE_UNREAD_MAIL_COUNT = "INCREASE_UNREAD_MAIL_COUNT";
interface IncreaseUnreadMailCountAction {
  type: typeof INCREASE_UNREAD_MAIL_COUNT;
}

export const DECREASE_UNREAD_MAIL_COUNT = "DECREASE_UNREAD_MAIL_COUNT";
interface DecreaseUnreadMailCountAction {
  type: typeof DECREASE_UNREAD_MAIL_COUNT;
}

export const REFRESH_MAIL_PAGE = "REFRESH_MAIL_PAGE";
interface RefreashMailPageAction {
  type: typeof REFRESH_MAIL_PAGE;
}

export type SystemActionTypes =
  | SetCurrentUserNameAction
  | SetCurrentUserIconAction
  | SetAvatarAction
  | OpenHintAction
  | CloseHintAction
  | OpenMaskAction
  | CloseMaskAction
  | OpenDrawerAction
  | CloseDrawerAction
  | UpdateLoginStateAction
  | UpdatePlayStateAction
  | UpdateUnreadMailCountAction
  | IncreaseUnreadMailCountAction
  | DecreaseUnreadMailCountAction
  | RefreashMailPageAction;
