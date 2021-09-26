import { TokenData } from "./service";
import { validate } from "email-validator";
import jwt_decode from "jwt-decode";
import cookie from "react-cookies";

const TOKEN = "TOKEN";
const TOKEN_HEAD = "TOKEN_HEAD";
const LOGIN_FLAG = "LOGIN_FLAG";
const USER_NAME_COOKIE = "USER_NAME_COOKIE";
const USER_ICON_COOKIE = "USER_ICON_COOKIE";

const COOKIE_OPTION = {
  path: "/",
  maxAge: 3600,
};

export const setLoginFlag = (flag: boolean): void => {
  const strFlag = flag ? "1" : "0";
  cookie.save(LOGIN_FLAG, strFlag, COOKIE_OPTION);
};

export const getLoginFlag = (): boolean => {
  console.log("GET LOGIN FLAG");

  let strFlag = "0";
  strFlag = cookie.load(LOGIN_FLAG);

  return strFlag === "1";
};

export const setUserNameIntoCookie = (name: string): void => {
  cookie.save(USER_NAME_COOKIE, name, COOKIE_OPTION);
};

export const getUserNameFromCookie = (): string => {
  let name = "";
  name = cookie.load(USER_NAME_COOKIE);

  return name;
};

export const setUserIconIntoCookie = (icon: string): void => {
  cookie.save(USER_ICON_COOKIE, icon, COOKIE_OPTION);
};

export const getUserIconFromCookie = (): string => {
  let icon = "";
  icon = cookie.load(USER_ICON_COOKIE);

  return icon;
};

export const setToken = (token: string): void => {
  cookie.save(TOKEN, token, COOKIE_OPTION);
};

export const getToken = (): string => {
  return cookie.load(TOKEN);
};

export const setTokenHead = (head: string): void => {
  cookie.save(TOKEN_HEAD, head, COOKIE_OPTION);
};

export const getTokenHead = (): string => {
  return cookie.load(TOKEN_HEAD);
};

interface DecodedType {
  sub: string;
  created: number;
  current_user_id: number;
  exp: number;
}

export const getCurrentUserId = (): number => {
  const decoded_obj = jwt_decode(getToken()) as DecodedType;
  if (decoded_obj) {
    return decoded_obj.current_user_id;
  }

  return 0;
};

export const getTokenObject = (): TokenData => {
  return {
    token: getToken(),
    tokenHead: getTokenHead(),
  };
};

export const getTokenString = (): string => {
  return getTokenHead() + " " + getToken();
};

export const PASSWORD_MIN_LEN = 4;
export const PASSWORD_MAX_LEN = 6;

const isValidLength = (
  str: string,
  minLen: number,
  maxLen: number
): boolean => {
  const len = str.length;

  if (len < minLen) return false;
  if (len > maxLen) return false;

  return true;
};

export const isValidPassowrd = (password: string): boolean => {
  return isValidLength(password, PASSWORD_MIN_LEN, PASSWORD_MAX_LEN);
};

const getLengthHelpText = (minLen: number, maxLen: number): string => {
  return "(" + minLen + " - " + maxLen + ") characters";
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
