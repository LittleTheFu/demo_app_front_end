import { TokenData } from "./service";
import { validate } from 'email-validator';
import jwt_decode from "jwt-decode";

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


interface DecodedType {
    sub: string;
    created: number;
    current_user_id: number;
    exp: number;
};

export const getCurrentUserId = (): number => {
    const decoded_obj = jwt_decode(getToken()) as DecodedType;
    if (decoded_obj) {
        return decoded_obj.current_user_id;
    }

    return 0;
}

export const getTokenObject = (): TokenData => {
    return {
        token: getToken(),
        tokenHead: getTokenHead(),
    }
}

export const getTokenString = (): string => {
    return getTokenHead() + ' ' + getToken();
}

export const PASSWORD_MIN_LEN = 4;
export const PASSWORD_MAX_LEN = 6;

const isValidLength = (str: string, minLen: number, maxLen: number): boolean => {
    const len = str.length;

    if (len < minLen) return false;
    if (len > maxLen) return false;

    return true;
};

export const isValidPassowrd = (password: string): boolean => {
    return isValidLength(password, PASSWORD_MIN_LEN, PASSWORD_MAX_LEN);
};

const getLengthHelpText = (minLen: number, maxLen: number): string => {
    return '(' + minLen + ' - ' + maxLen + ') characters';
};

export const getPassowrdHelpText = (): string => {
    return getLengthHelpText(PASSWORD_MIN_LEN, PASSWORD_MAX_LEN);
};

export const USERNAME_MIN_LEN = 4;
export const USERNAME_MAX_LEN = 6;

export const isValidUserName = (name: string): boolean => {
    return isValidLength(name, USERNAME_MIN_LEN, USERNAME_MAX_LEN);
};

export const getUsernameHelpText = (): string => {
    return getLengthHelpText(USERNAME_MIN_LEN, USERNAME_MAX_LEN);
};

export const EMAIL_MIN_LEN = 4;
export const EMAIL_MAX_LEN = 30;

export const isValidEmail = (email: string): boolean => {
    return isValidLength(email, EMAIL_MIN_LEN, EMAIL_MAX_LEN) && validate(email);
};

export const getEmailHelpText = (): string => {
    return getLengthHelpText(EMAIL_MIN_LEN, EMAIL_MAX_LEN);
};
