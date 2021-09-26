// src/store/index.ts

import { systemReducer } from "./system/reducers";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import { UPDATE_LOGIN_STATE } from "./system/types";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";

const rootReducer = combineReducers({
  system: systemReducer,
});

export const selectNameState = (state: RootState): string => {
  return state.system.name;
};

export const selectIconState = (state: RootState): string => {
  return state.system.icon;
};

export const selectHintState = (state: RootState): boolean => {
  return state.system.hintOpen;
};

export const selectHintMsg = (state: RootState): string => {
  return state.system.hintMsg;
};

export const selectLoginState = (state: RootState): boolean => {
  return state.system.isLogin;
};

export const selectMaskState = (state: RootState): boolean => {
  return state.system.showBannedMask;
};

export const selectDrawerState = (state: RootState): boolean => {
  return state.system.drawerOpen;
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () =>
  useDispatch<AppDispatch>() as ThunkDispatch<RootState, void, AnyAction>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//thunk action
//###############################################################
export const enableLoginFlag = () => (dispatch: AppDispatch) => {
  dispatch({
    type: UPDATE_LOGIN_STATE,
    payload: {
      isLogin: true,
    },
  });
  return Promise.resolve();
};
