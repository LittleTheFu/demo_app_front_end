import axios from 'axios';
import { getTokenString } from './common';

function rawObjectGet<T>(
    url: string,
    resolve: (data: T) => void,
    headerContent: object = {},
    reject?: (error: Error) => void,
): Promise<T> {
    return axios
        .get(url, {
            headers: {
                'Content-Type': 'application/json',
                ...headerContent,
            },
        })
        .then(response => {
            const { data } = response;
            // console.log(data);
            resolve(data);
        })
        .catch(err => {
            if (err.response) {

            } else if (err.request) {

            } else {

            }

            return err;
        });
}

function rawObjectDelete<T>(
    url: string,
    resolve: (data: T) => void,
    headerContent: object = {},
    reject?: (error: Error) => void,
): Promise<T> {
    return axios
        .get(url, {
            headers: {
                'Content-Type': 'application/json',
                ...headerContent,
            },
        })
        .then(response => {
            const { data } = response;
            // console.log(data);
            resolve(data);
        })
        .catch(err => {
            if (err.response) {

            } else if (err.request) {

            } else {

            }

            return err;
        });
}


function rawObjectPut<T>(
    url: string,
    data: object,
    resolve: (data: T) => void,
    headerContent: object = {},
    reject?: (error: Error) => void,
): Promise<T> {
    return axios
        .put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                ...headerContent,
            },
        })
        .then(response => {
            const { data } = response;
            // console.log(data);
            resolve(data);
        })
        .catch(err => {
            if (err.response) {

            } else if (err.request) {

            } else {

            }

            return err;
        });
}

function rawObjectPost<T>(
    url: string,
    data: object,
    resolve: (data: T) => void,
    headerContent: object = {},
    reject?: (error: Error) => void,
): Promise<T> {
    return axios
        .post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                ...headerContent,
            },
        })
        .then(response => {
            const { data } = response;
            // console.log(data);
            resolve(data);
        })
        .catch(err => {
            if (err.response) {
                // console.log('err.response');
                // console.log(err.response.data);
                // console.log(err.response.status);
                // console.log(err.response.headers);

                // if ('error' in err.response.data) {
                //     if (reject) {
                //         reject(new Error(err.response.data.error));
                //     } else {
                //         store.dispatch({ type: OPEN_HINT, payload: { hintMsg: err.response.data.error } });
                //     }
                // }
            } else if (err.request) {
                // console.log('err.request');
                // console.log(err.request);
            } else {
                // console.log('Error', err.message);
            }
            // console.log(err.config);

            return err;
        });
}

export class TokenData {
    token: string;
    tokenHead: string;

    constructor() {
        this.token = "";
        this.tokenHead = "";
    }
}

export class AccessData {
    code: number;
    token: string;
    data: TokenData;

    constructor() {
        this.code = 0;
        this.token = "";

        this.data = new TokenData();
    }
}

const loginUrl = 'http://localhost:8080/account/login';
export const postLogin = (
    email: string,
    password: string,
    resolve: (data: AccessData) => void,
    reject?: (data: Error) => void,
): Promise<AccessData> => {
    return rawObjectPost(loginUrl, { email: email, password: password }, resolve, {}, reject);
};


const greetingUrl = 'http://localhost:8080/greeting';
export const getGreeting = (
    resolve: (data: AccessData) => void,
    reject?: (data: Error) => void,
): Promise<AccessData> => {
    const authHead = getTokenString();
    console.log(authHead);
    return rawObjectGet(greetingUrl, resolve, { 'Authorization': authHead }, reject);
};

export class Article {
    id: number;
    title: string;
    content: string;
    author: string;
    authorId: number;
    thumb: number;
    thumbState: boolean;

    constructor() {
        this.id = 0;
        this.title = 'title';
        this.content = 'content';
        this.author = 'author';
        this.authorId = 0;
        this.thumb = 0;
        this.thumbState = false;
    }
}

export class AllArticleData {
    code: number;
    token: string;
    data: Article[];

    constructor() {
        this.code = 0;
        this.token = "";

        this.data = [];
    }
}

const allArticleUrl = 'http://localhost:8080/article/all';
export const getAllArticles = (
    resolve: (data: AllArticleData) => void,
    reject?: (data: Error) => void,
): Promise<AllArticleData> => {
    const authHead = getTokenString();
    return rawObjectGet(allArticleUrl, resolve, { 'Authorization': authHead }, reject);
};

export class ArticleData {
    code: number;
    token: string;
    data: Article;

    constructor() {
        this.code = 0;
        this.token = "";

        this.data = new Article();
    }
}
const getArticleUrl = 'http://localhost:8080/article/';
export const getArticleById = (
    id: string,
    resolve: (data: ArticleData) => void,
    reject?: (data: Error) => void,
): Promise<ArticleData> => {
    const authHead = getTokenString();
    return rawObjectGet(getArticleUrl + id, resolve, { 'Authorization': authHead }, reject);
};


const thumbArticleUrl = 'http://localhost:8080/article/thumb/'
export const thumbArticle = (
    id: number,
    resolve: (data: ArticleData) => void,
    reject?: (data: Error) => void,
): Promise<ArticleData> => {
    const authHead = getTokenString();
    return rawObjectPut(thumbArticleUrl + id, {}, resolve, { 'Authorization': authHead }, reject);
};

const unthumbArticleUrl = 'http://localhost:8080/article/unthumb/';
export const unthumbArticle = (
    id: number,
    resolve: (data: ArticleData) => void,
    reject?: (data: Error) => void,
): Promise<ArticleData> => {
    const authHead = getTokenString();
    return rawObjectPut(unthumbArticleUrl + id, {}, resolve, { 'Authorization': authHead }, reject);
};

export class UserDetail {
    id: number;
    name: string;
    followed: boolean;

    constructor() {
        this.id = 0;
        this.name = 'name';
        this.followed = false;
    }
}

export class UserData {
    code: number;
    token: string;
    data: UserDetail;

    constructor() {
        this.code = 0;
        this.token = "";

        this.data = new UserDetail();
    }
}

const getUserDetailUrl = 'http://localhost:8080/user/';
export const getUserById = (
    id: string,
    resolve: (data: UserData) => void,
    reject?: (data: Error) => void,
): Promise<UserData> => {
    const authHead = getTokenString();
    return rawObjectGet(getUserDetailUrl + id, resolve, { 'Authorization': authHead }, reject);
};

export class FollowResponse {
    followed: boolean;

    constructor() {
        this.followed = false;
    }
}

export class FollowResponseData {
    code: number;
    token: string;
    data: FollowResponse;

    constructor() {
        this.code = 0;
        this.token = "";

        this.data = new FollowResponse();
    }
}


const followUserUrl = 'http://localhost:8080/user/follow/';
export const followUser = (
    id: number,
    resolve: (data: FollowResponseData) => void,
    reject?: (data: Error) => void,
): Promise<FollowResponseData> => {
    const authHead = getTokenString();
    return rawObjectPut(followUserUrl + id, {}, resolve, { 'Authorization': authHead }, reject);
};


const unfollowUserUrl = 'http://localhost:8080/user/unfollow/';
export const unfollowUser = (
    id: number,
    resolve: (data: FollowResponseData) => void,
    reject?: (data: Error) => void,
): Promise<FollowResponseData> => {
    const authHead = getTokenString();
    return rawObjectPut(unfollowUserUrl + id, {}, resolve, { 'Authorization': authHead }, reject);
};