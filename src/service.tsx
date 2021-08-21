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

export class BaseData {
    code: number;
    token: string;

    constructor() {
        this.code = 0;
        this.token = '';
    }
}

export class TokenData {
    token: string;
    tokenHead: string;

    constructor() {
        this.token = "";
        this.tokenHead = "";
    }
}

export class AccessData extends BaseData {
    data: TokenData;

    constructor() {
        super();

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

export class AllArticleData extends BaseData {
    data: Article[];

    constructor() {
        super();
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

export class ArticleData extends BaseData {
    data: Article;

    constructor() {
        super();
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
    icon: string;

    constructor() {
        this.id = 0;
        this.name = 'name';
        this.followed = false;
        this.icon = '';
    }
}

export class UserData extends BaseData {
    data: UserDetail;

    constructor() {
        super();
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

export const getCurrentUser = (
    resolve: (data: UserData) => void,
    reject?: (data: Error) => void,
): Promise<UserData> => {
    const authHead = getTokenString();
    return rawObjectGet(getUserDetailUrl, resolve, { 'Authorization': authHead }, reject);
};

export class FollowResponse {
    followed: boolean;

    constructor() {
        this.followed = false;
    }
}

export class FollowResponseData extends BaseData {
    data: FollowResponse;

    constructor() {
        super();
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

export class OneCommentData extends BaseData {
    data: ArticleComment;

    constructor() {
        super();
        this.data = new ArticleComment();
    }
}

const createCommentUrl = 'http://localhost:8080/article/create_comment/';
export const createComment = (
    id: string,
    content: string,
    resolve: (data: OneCommentData) => void,
    reject?: (data: Error) => void,
): Promise<OneCommentData> => {
    const authHead = getTokenString();
    return rawObjectPut(createCommentUrl + id, { content: content }, resolve, { 'Authorization': authHead }, reject);
};

export class ArticleComment {
    id: number;
    articleCommentArticleId: number;
    articleCommentUserId: number;
    articleCommentUserName: string;
    articleCommentContent: string;

    constructor() {
        this.id = 0;
        this.articleCommentArticleId = 0;
        this.articleCommentUserId = 0;
        this.articleCommentUserName = 'name';
        this.articleCommentContent = 'content';
    }
}

export class CommentsData extends BaseData {
    data: ArticleComment[];

    constructor() {
        super();
        this.data = [];
    }
}

const getArticleCommentsUrl = 'http://localhost:8080/article/article_comments/';
export const getArticleComments = (
    id: string,
    resolve: (data: CommentsData) => void,
    reject?: (data: Error) => void,
): Promise<CommentsData> => {
    const authHead = getTokenString();
    return rawObjectGet(getArticleCommentsUrl + id, resolve, { 'Authorization': authHead }, reject);
};

class ChangeIconResponse {
    name: string;
    url: string;

    constructor() {
        this.name = '';
        this.url = '';
    }
}

class ChangeIconResponseData extends BaseData {
    data: ChangeIconResponse;

    constructor() {
        super();
        this.data = new ChangeIconResponse();
    }
}

const uploadIconUrl = 'http://localhost:8080/user/change_icon';
export const uploadIcon = (data: FormData, resolve: (data: ChangeIconResponse) => void): Promise<ChangeIconResponse> => {
    const authHead = getTokenString();

    return fileObjectPost(uploadIconUrl, data, resolve, {
        Authorization: authHead,
    });
};

function fileObjectPost<T>(
    url: string,
    data: FormData,
    resolve: (data: T) => void,
    headerContent: object = {},
): Promise<T> {
    return axios
        .post(url, data, {
            headers: {
                ...headerContent,
            },
        })
        .then(response => {
            const { data } = response;
            resolve(data);
            return data;
        })
        .catch(err => {
            return err;
        });
}