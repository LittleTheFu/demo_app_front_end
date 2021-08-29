// src/store/index.ts

import { systemReducer } from './system/reducers';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    system: systemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const selectNameState = (state: RootState): string => {
    return state.system.name;
}

export const selectIconState = (state: RootState): string => {
    return state.system.icon;
}

export const selectHintState = (state: RootState): boolean => {
    return state.system.hintOpen;
};

export const selectHintMsg = (state: RootState): string => {
    return state.system.hintMsg;
};

export const selectMaskState = (state: RootState): boolean => {
    return state.system.showBannedMask;
};

export const selectDrawerState = (state: RootState): boolean => {
    return state.system.drawerOpen;
};

export const store = createStore(rootReducer, composeWithDevTools());