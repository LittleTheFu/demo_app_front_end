import axios from 'axios';
import { getTokenString } from './common';

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
        .delete(url, {
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

export class RetMsgObj {
    msg: string | undefined;
}

const registerUrl = 'http://localhost:8080/account/register';
export const postRegister = (
    email: string,
    password: string,
    resolve: (data: RetMsgObj) => void,
    reject?: (data: Error) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(registerUrl, { password: password, email: email }, resolve, {}, reject);
};

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
    authorIcon: string;
    authorId: number;
    thumb: number;
    thumbState: boolean;
    deletable: boolean;
    editable: boolean;
    bookmarked: boolean;

    constructor() {
        this.id = 0;
        this.title = 'title';
        this.content = 'content';
        this.author = 'author';
        this.authorIcon = '';
        this.authorId = 0;
        this.thumb = 0;
        this.thumbState = false;
        this.deletable = false;
        this.editable = false;
        this.bookmarked = false;
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

const thumbCommentUrl = 'http://localhost:8080/article/comment_thumb/'
export const thumbComment = (
    id: number,
    resolve: (data: BaseData) => void,
    reject?: (data: Error) => void,
): Promise<BaseData> => {
    const authHead = getTokenString();
    return rawObjectPut(thumbCommentUrl + id, {}, resolve, { 'Authorization': authHead }, reject);
};

const unThumbCommentUrl = 'http://localhost:8080/article/comment_unthumb/'
export const unThumbComment = (
    id: number,
    resolve: (data: BaseData) => void,
    reject?: (data: Error) => void,
): Promise<BaseData> => {
    const authHead = getTokenString();
    return rawObjectPut(unThumbCommentUrl + id, {}, resolve, { 'Authorization': authHead }, reject);
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
    articleCommentUserIcon: string;
    articleCommentContent: string;
    articleCommentDate: Date;
    thumbState: boolean;
    articleCommentThumbNum: number;

    constructor() {
        this.id = 0;
        this.articleCommentArticleId = 0;
        this.articleCommentUserId = 0;
        this.articleCommentUserName = 'name';
        this.articleCommentUserIcon = '';
        this.articleCommentContent = 'content';
        this.articleCommentDate = new Date();
        this.thumbState = false;
        this.articleCommentThumbNum = 0;
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

const updateNameUrl = 'http://localhost:8080/user/change_name';
export const updateName = (
    name: string,
    resolve: (data: BaseData) => void,
    reject?: (data: Error) => void,
): Promise<BaseData> => {
    const authHead = getTokenString();
    return rawObjectPut(updateNameUrl, {name: name}, resolve, { 'Authorization': authHead }, reject);
};

const uploadIconUrl = 'http://localhost:8080/user/change_icon';
export const uploadIcon = (data: FormData, resolve: (data: ChangeIconResponseData) => void): Promise<ChangeIconResponseData> => {
    const authHead = getTokenString();

    return fileObjectPost(uploadIconUrl, data, resolve, {
        Authorization: authHead,
    });
};

class CreateArticleResponse {
    id: number;

    constructor() {
        this.id = 0;
    }
}

export class CreateArticleResponseData extends BaseData {
    data: CreateArticleResponse;

    constructor() {
        super();
        this.data = new CreateArticleResponse();
    }
}

const createArticleUrl = 'http://localhost:8080/article/create_article';
export const createArticle = (
    title: string,
    content: string,
    resolve: (data: CreateArticleResponseData) => void,
    reject?: (data: Error) => void,
): Promise<CreateArticleResponseData> => {
    const authHead = getTokenString();
    return rawObjectPut(createArticleUrl, { title: title, content: content }, resolve, { 'Authorization': authHead }, reject);
};

const deleteArticleUrl = 'http://localhost:8080/article/delete/';
export const deleteArticle = (
    id: number,
    resolve: (data: BaseData) => void,
    reject?: (data: Error) => void,
): Promise<BaseData> => {
    const authHead = getTokenString();
    return rawObjectDelete(deleteArticleUrl + id, resolve, { 'Authorization': authHead }, reject);
};

const updateArticleUrl = 'http://localhost:8080/article/';
export const updateArticle = (
    id: number,
    title: string,
    content: string,
    resolve: (data: BaseData) => void,
    reject?: (data: Error) => void,
): Promise<BaseData> => {
    const authHead = getTokenString();
    return rawObjectPut(updateArticleUrl + id, { id: id, title: title, content: content }, resolve, { 'Authorization': authHead }, reject);
};

export class FollowersData extends BaseData {
    data: UserDetail[];

    constructor() {
        super();
        this.data = [];
    }
}

const getFollowingsUrl = 'http://localhost:8080/user/followings/';
export const getFollowings = (
    id: string,
    resolve: (data: FollowersData) => void,
    reject?: (data: Error) => void,
): Promise<FollowersData> => {
    const authHead = getTokenString();
    return rawObjectGet(getFollowingsUrl + id, resolve, { 'Authorization': authHead }, reject);
};

const getFollowersUrl = 'http://localhost:8080/user/followers/';
export const getFollowers = (
    id: string,
    resolve: (data: FollowersData) => void,
    reject?: (data: Error) => void,
): Promise<FollowersData> => {
    const authHead = getTokenString();
    return rawObjectGet(getFollowersUrl + id, resolve, { 'Authorization': authHead }, reject);
};

const createMailUrl = 'http://localhost:8080/mail/create_mail';
export const createMail = (
    mailToId: number,
    content: string,
    resolve: (data: BaseData) => void,
    reject?: (data: Error) => void,
): Promise<BaseData> => {
    const authHead = getTokenString();
    return rawObjectPost(createMailUrl, { mailToId: mailToId, content: content }, resolve, { 'Authorization': authHead }, reject);
};

export class Mail {
    id: number;
    mailFromId: number;
    mailToId: number;
    content: string;
    authorName: string;
    authorIcon: string;

    constructor() {
        this.id = 0;
        this.mailFromId = 0;
        this.mailToId = 0;
        this.content = 'content';
        this.authorName = 'author';
        this.authorIcon = 'icon';
    }
}

export class MailsResponseData extends BaseData {
    data: Mail[];

    constructor() {
        super();
        this.data = [];
    }
}

const getMailsUrl = 'http://localhost:8080/mail/get_mails';
export const getMails = (
    resolve: (data: MailsResponseData) => void,
    reject?: (data: Error) => void,
): Promise<MailsResponseData> => {
    const authHead = getTokenString();
    return rawObjectGet(getMailsUrl, resolve, { 'Authorization': authHead }, reject);
};

const deleteMailUrl = 'http://localhost:8080/mail/';
export const deleteMail = (
    id: number,
    resolve: (data: BaseData) => void,
    reject?: (data: Error) => void,
): Promise<BaseData> => {
    const authHead = getTokenString();
    return rawObjectDelete(deleteMailUrl + id, resolve, { 'Authorization': authHead }, reject);
};

export class ArticleTitle {
    id: number;
    title: string;
    authorName: string;
    authorIcon: string;
    authorId: number;

    constructor() {
        this.id = 0;
        this.title = 'title';
        this.authorName = 'author_name';
        this.authorIcon = 'icon';
        this.authorId = 0;
    }
}

export class ArticleTitleResponseData extends BaseData {
    data: ArticleTitle[];

    constructor() {
        super();
        this.data = [];
    }
}

const historyUrl = 'http://localhost:8080/history';
export const getHistory = (
    resolve: (data: ArticleTitleResponseData) => void,
    reject?: (data: Error) => void,
): Promise<ArticleTitleResponseData> => {
    const authHead = getTokenString();
    console.log(authHead);
    return rawObjectGet(historyUrl, resolve, { 'Authorization': authHead }, reject);
};

const bookmarkArticleUrl = 'http://localhost:8080/article/bookmark/'
export const bookmarkArticle = (
    id: number,
    resolve: (data: BaseData) => void,
    reject?: (data: Error) => void,
): Promise<BaseData> => {
    const authHead = getTokenString();
    return rawObjectPut(bookmarkArticleUrl + id, {}, resolve, { 'Authorization': authHead }, reject);
};

const unBookmarkArticleUrl = 'http://localhost:8080/article/unbookmark/'
export const unBookmarkArticle = (
    id: number,
    resolve: (data: BaseData) => void,
    reject?: (data: Error) => void,
): Promise<BaseData> => {
    const authHead = getTokenString();
    return rawObjectPut(unBookmarkArticleUrl + id, {}, resolve, { 'Authorization': authHead }, reject);
};

const allBookmarkArticleUrl = 'http://localhost:8080/article/get_bookmark_articles';
export const getBookmarkArticles = (
    resolve: (data: ArticleTitleResponseData) => void,
    reject?: (data: Error) => void,
): Promise<ArticleTitleResponseData> => {
    const authHead = getTokenString();
    console.log(authHead);
    return rawObjectGet(allBookmarkArticleUrl, resolve, { 'Authorization': authHead }, reject);
};