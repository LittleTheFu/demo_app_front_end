import { TokenData } from "./service";

export const setToken = (token: string): void => {
    sessionStorage.setItem('token', token);
};

export const getToken = (): string => {
    return sessionStorage.getItem('token') || '';
};

export const setTokenHead = (head: string): void => {
    sessionStorage.setItem('tokenHead', head);
};

export const getTokenHead = (): string => {
    return sessionStorage.getItem('tokenHead') || '';
};

export const getTokenObject = (): TokenData => {
    return {
        token: getToken(),
        tokenHead: getTokenHead(),
    }
}

export const getTokenString = (): string => {
    return getTokenHead() + ' ' + getToken();
}