import { getTokenString } from "./common";
import {
  rawObjectPost,
  rawObjectGet,
  rawObjectPut,
  fileObjectPost,
  rawObjectDelete,
} from "./net";

export class TokenData {
  token: string;
  tokenHead: string;

  constructor() {
    this.token = "";
    this.tokenHead = "";
  }
}

export interface INullData {}

export type ISimpleData = IBaseData<INullData>;

export type ISimpleStringData = IBaseData<string>;

export type IAccessData = IBaseData<TokenData>;

export interface RetMsgObj {
  msg: string;
}

const wantResetPasswordUrl =
  "http://localhost:8080/account/want_reset_password";
export const wantResetPassword = (
  email: string,
  resolve: (data: ISimpleStringData) => void,
  reject?: (code: number, message: string) => void
): Promise<string> => {
  return rawObjectPost(
    wantResetPasswordUrl,
    { email: email },
    resolve,
    {},
    reject
  );
};

const resetPasswordUrl = "http://localhost:8080/account/reset_password";
export const resetPassword = (
  email: string,
  password: string,
  code: string,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  return rawObjectPost(
    resetPasswordUrl,
    { email: email, password: password, code: code },
    resolve,
    {},
    reject
  );
};

const registerUrl = "http://localhost:8080/account/register";
export const postRegister = (
  email: string,
  password: string,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  return rawObjectPost(
    registerUrl,
    { password: password, email: email },
    resolve,
    {},
    reject
  );
};

const loginUrl = "http://localhost:8080/account/login";
export const postLogin = (
  email: string,
  password: string,
  resolve: (data: IAccessData) => void,
  reject?: (code: number, message: string) => void
): Promise<TokenData> => {
  return rawObjectPost(
    loginUrl,
    { email: email, password: password },
    resolve,
    {},
    reject
  );
};

const greetingUrl = "http://localhost:8080/greeting";
export const getGreeting = (
  resolve: (data: IAccessData) => void,
  reject?: (code: number, message: string) => void
): Promise<TokenData> => {
  const authHead = getTokenString();
  console.log(authHead);
  return rawObjectGet(
    greetingUrl,
    resolve,
    { Authorization: authHead },
    reject
  );
};

export interface IArticle {
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
  tags: string[];
}

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
  tags: string[];

  constructor() {
    this.id = 0;
    this.title = "title";
    this.content = "content";
    this.author = "author";
    this.authorIcon = "";
    this.authorId = 0;
    this.thumb = 0;
    this.thumbState = false;
    this.deletable = false;
    this.editable = false;
    this.bookmarked = false;
    this.tags = [];
  }
}

export interface PageWrapper<T> {
  pages: number;
  pageNum: number;

  content: T;
}

//////////////////////////////////////////////////
export interface IBaseData<T> {
  code: number;
  message: string;

  data: T;
}

export interface IPageWrapper<T> {
  pages: number;
  pageNum: number;

  content: T;
}

export type IAllArticleData = IBaseData<IPageWrapper<Article[]>>;

const allArticleUrl = "http://localhost:8080/article/all";
export const getAllTitles = (
  page: number,
  resolve: (data: IPagedArticleTitle) => void,
  reject?: (code: number, message: string) => void
): Promise<IPageWrapper<ArticleTitle[]>> => {
  const authHead = getTokenString();
  return rawObjectGet(
    allArticleUrl + "?page=" + page,
    resolve,
    { Authorization: authHead },
    (data) => {
      console.log(data);
    }
  );
};

export type IArticleData = IBaseData<Article>;

const getArticleUrl = "http://localhost:8080/article/";
export const getArticleById = (
  id: string,
  resolve: (data: IArticleData) => void,
  reject?: (code: number, message: string) => void
): Promise<Article> => {
  const authHead = getTokenString();
  return rawObjectGet(
    getArticleUrl + id,
    resolve,
    { Authorization: authHead },
    reject
  );
};

const thumbCommentUrl = "http://localhost:8080/article/comment_thumb/";
export const thumbComment = (
  id: number,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  const authHead = getTokenString();
  return rawObjectPut(
    thumbCommentUrl + id,
    {},
    resolve,
    { Authorization: authHead },
    reject
  );
};

const unThumbCommentUrl = "http://localhost:8080/article/comment_unthumb/";
export const unThumbComment = (
  id: number,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  const authHead = getTokenString();
  return rawObjectPut(
    unThumbCommentUrl + id,
    {},
    resolve,
    { Authorization: authHead },
    reject
  );
};

const thumbArticleUrl = "http://localhost:8080/article/thumb/";
export const thumbArticle = (
  id: number,
  resolve: (data: IArticleData) => void,
  reject?: (code: number, message: string) => void
): Promise<Article> => {
  const authHead = getTokenString();
  return rawObjectPut(
    thumbArticleUrl + id,
    {},
    resolve,
    { Authorization: authHead },
    reject
  );
};

const unthumbArticleUrl = "http://localhost:8080/article/unthumb/";
export const unthumbArticle = (
  id: number,
  resolve: (data: IArticleData) => void,
  reject?: (code: number, message: string) => void
): Promise<Article> => {
  const authHead = getTokenString();
  return rawObjectPut(
    unthumbArticleUrl + id,
    {},
    resolve,
    { Authorization: authHead },
    reject
  );
};

export class UserDetail {
  id: number;
  name: string;
  followed: boolean;
  icon: string;

  constructor() {
    this.id = 0;
    this.name = "name";
    this.followed = false;
    this.icon = "";
  }
}

export type IUserData = IBaseData<UserDetail>;

const getUserDetailUrl = "http://localhost:8080/user/";
export const getUserById = (
  id: string,
  resolve: (data: IUserData) => void,
  reject?: (code: number, message: string) => void
): Promise<UserDetail> => {
  const authHead = getTokenString();
  return rawObjectGet(
    getUserDetailUrl + id,
    resolve,
    { Authorization: authHead },
    reject
  );
};

export const getCurrentUser = (
  resolve: (data: IUserData) => void,
  reject?: (code: number, message: string) => void
): Promise<UserDetail> => {
  const authHead = getTokenString();
  return rawObjectGet(
    getUserDetailUrl,
    resolve,
    { Authorization: authHead },
    reject
  );
};

interface FollowResponse {
  followed: boolean;
}

export type IFollowResponseData = IBaseData<FollowResponse>;

const followUserUrl = "http://localhost:8080/user/follow/";
export const followUser = (
  id: number,
  resolve: (data: IFollowResponseData) => void,
  reject?: (code: number, message: string) => void
): Promise<FollowResponse> => {
  const authHead = getTokenString();
  return rawObjectPut(
    followUserUrl + id,
    {},
    resolve,
    { Authorization: authHead },
    reject
  );
};

const unfollowUserUrl = "http://localhost:8080/user/unfollow/";
export const unfollowUser = (
  id: number,
  resolve: (data: IFollowResponseData) => void,
  reject?: (code: number, message: string) => void
): Promise<FollowResponse> => {
  const authHead = getTokenString();
  return rawObjectPut(
    unfollowUserUrl + id,
    {},
    resolve,
    { Authorization: authHead },
    reject
  );
};

export type IOneCommentData = IBaseData<ArticleComment>;

const createCommentUrl = "http://localhost:8080/article/create_comment/";
export const createComment = (
  id: string,
  content: string,
  resolve: (data: IOneCommentData) => void,
  reject?: (code: number, message: string) => void
): Promise<ArticleComment> => {
  const authHead = getTokenString();
  return rawObjectPut(
    createCommentUrl + id,
    { content: content },
    resolve,
    { Authorization: authHead },
    reject
  );
};

export interface ArticleComment {
  id: number;
  articleCommentArticleId: number;
  articleCommentUserId: number;
  articleCommentUserName: string;
  articleCommentUserIcon: string;
  articleCommentContent: string;
  articleCommentDate: Date;
  thumbState: boolean;
  articleCommentThumbNum: number;
}

export type ICommentsData = IBaseData<IPageWrapper<ArticleComment[]>>;

const getArticleCommentsUrl = "http://localhost:8080/article/article_comments/";
export const getArticleComments = (
  id: string,
  page: number,
  sortType: string,
  resolve: (data: ICommentsData) => void,
  reject?: (code: number, message: string) => void
): Promise<IPageWrapper<ArticleComment[]>> => {
  const authHead = getTokenString();
  return rawObjectGet(
    getArticleCommentsUrl + id + "?sort=" + sortType + "&page=" + page,
    resolve,
    { Authorization: authHead },
    reject
  );
};

export interface ChangeIconResponse {
  name: string;
  url: string;
}

export type IChangeIconResponseData = IBaseData<ChangeIconResponse>;

const updateNameUrl = "http://localhost:8080/user/change_name";
export const updateName = (
  name: string,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  const authHead = getTokenString();
  return rawObjectPut(
    updateNameUrl,
    { name: name },
    resolve,
    { Authorization: authHead },
    reject
  );
};

const uploadIconUrl = "http://localhost:8080/user/change_icon";
export const uploadIcon = (
  data: FormData,
  resolve: (data: IChangeIconResponseData) => void
): Promise<ChangeIconResponse> => {
  const authHead = getTokenString();

  return fileObjectPost(uploadIconUrl, data, resolve, {
    Authorization: authHead,
  });
};

const uploadImageUrl = "http://localhost:8080/file/upload";
export const uploadImage = (
  data: FormData,
  resolve: (data: IChangeIconResponseData) => void
): Promise<ChangeIconResponse> => {
  const authHead = getTokenString();

  return fileObjectPost(uploadImageUrl, data, resolve, {
    Authorization: authHead,
  });
};

export interface CreateArticleResponse {
  id: number;
}

export type ICreateArticleResponseData = IBaseData<CreateArticleResponse>;

const createArticleUrl = "http://localhost:8080/article/create_article";
export const createArticle = (
  title: string,
  content: string,
  resolve: (data: ICreateArticleResponseData) => void,
  reject?: (code: number, message: string) => void
): Promise<CreateArticleResponse> => {
  const authHead = getTokenString();
  return rawObjectPut(
    createArticleUrl,
    { title: title, content: content },
    resolve,
    { Authorization: authHead },
    reject
  );
};

const deleteArticlTageUrl = "http://localhost:8080/article/delete_article_tag";
export const deleteArticleTag = (
  id: number,
  tag: string,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  const authHead = getTokenString();
  return rawObjectDelete(
    deleteArticlTageUrl + "?id=" + id + "&tag=" + tag,
    resolve,
    { Authorization: authHead },
    reject
  );
};

const addArticlTageUrl = "http://localhost:8080/article/add_article_tag/";
export const addArticleTag = (
  id: number,
  tag: string,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  const authHead = getTokenString();
  return rawObjectPut(
    addArticlTageUrl + id,
    { tag: tag },
    resolve,
    { Authorization: authHead },
    reject
  );
};

const deleteArticleUrl = "http://localhost:8080/article/delete/";
export const deleteArticle = (
  id: number,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  const authHead = getTokenString();
  return rawObjectDelete(
    deleteArticleUrl + id,
    resolve,
    { Authorization: authHead },
    reject
  );
};

const updateArticleUrl = "http://localhost:8080/article/";
export const updateArticle = (
  id: number,
  title: string,
  content: string,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  const authHead = getTokenString();
  return rawObjectPut(
    updateArticleUrl + id,
    { id: id, title: title, content: content },
    resolve,
    { Authorization: authHead },
    reject
  );
};

export type IFollowersData = IBaseData<UserDetail[]>;

const getFollowingsUrl = "http://localhost:8080/user/followings/";
export const getFollowings = (
  id: string,
  resolve: (data: IFollowersData) => void,
  reject?: (code: number, message: string) => void
): Promise<UserDetail[]> => {
  const authHead = getTokenString();
  return rawObjectGet(
    getFollowingsUrl + id,
    resolve,
    { Authorization: authHead },
    reject
  );
};

const getFollowersUrl = "http://localhost:8080/user/followers/";
export const getFollowers = (
  id: string,
  resolve: (data: IFollowersData) => void,
  reject?: (code: number, message: string) => void
): Promise<UserDetail[]> => {
  const authHead = getTokenString();
  return rawObjectGet(
    getFollowersUrl + id,
    resolve,
    { Authorization: authHead },
    reject
  );
};

const createMailUrl = "http://localhost:8080/mail/create_mail";
export const createMail = (
  mailToId: number,
  content: string,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  const authHead = getTokenString();
  return rawObjectPost(
    createMailUrl,
    { mailToId: mailToId, content: content },
    resolve,
    { Authorization: authHead },
    reject
  );
};

export interface Mail {
  id: number;
  mailFromId: number;
  mailToId: number;
  content: string;
  authorName: string;
  authorIcon: string;
}

export type IMailsResponseData = IBaseData<Mail[]>;

const getMailsUrl = "http://localhost:8080/mail/get_mails";
export const getMails = (
  resolve: (data: IMailsResponseData) => void,
  reject?: (code: number, message: string) => void
): Promise<Mail[]> => {
  const authHead = getTokenString();
  return rawObjectGet(
    getMailsUrl,
    resolve,
    { Authorization: authHead },
    reject
  );
};

const deleteMailUrl = "http://localhost:8080/mail/";
export const deleteMail = (
  id: number,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  const authHead = getTokenString();
  return rawObjectDelete(
    deleteMailUrl + id,
    resolve,
    { Authorization: authHead },
    reject
  );
};

export interface ArticleTitle {
  id: number;
  title: string;
  authorName: string;
  authorIcon: string;
  authorId: number;
}

// export class ArticleTitleResponseData extends BaseData {
//     data: ArticleTitle[];

//     constructor() {
//         super();
//         this.data = [];
//     }
// }

const userTitlesUrl = "http://localhost:8080/article/get_titles_by_user/";
export const getUserTitles =
  (id: string) =>
  (
    page: number,
    resolve: (data: IPagedArticleTitle) => void,
    reject?: (code: number, message: string) => void
  ): Promise<IPageWrapper<ArticleTitle[]>> => {
    const authHead = getTokenString();
    return rawObjectGet(
      userTitlesUrl + id + "?page=" + page,
      resolve,
      { Authorization: authHead },
      reject
    );
  };

const titlesTagUrl = "http://localhost:8080/article/get_titles_by_tag";
export const getTitlesBytag = (
  tag: string,
  page: number,
  resolve: (data: IPagedArticleTitle) => void,
  reject?: (code: number, message: string) => void
): Promise<IPageWrapper<ArticleTitle[]>> => {
  const authHead = getTokenString();
  console.log(authHead);
  return rawObjectGet(
    titlesTagUrl + "?tag=" + tag + "&page=" + page,
    resolve,
    { Authorization: authHead },
    reject
  );
};

export type IPagedArticleTitle = IBaseData<IPageWrapper<ArticleTitle[]>>;

const historyUrl = "http://localhost:8080/history";
export const getHistory = (
  page: number,
  resolve: (data: IPagedArticleTitle) => void,
  reject?: (code: number, message: string) => void
): Promise<IPageWrapper<ArticleTitle[]>> => {
  const authHead = getTokenString();
  console.log(authHead);
  return rawObjectGet(
    historyUrl + "?page=" + page,
    resolve,
    { Authorization: authHead },
    reject
  );
};

const bookmarkArticleUrl = "http://localhost:8080/article/bookmark/";
export const bookmarkArticle = (
  id: number,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  const authHead = getTokenString();
  return rawObjectPut(
    bookmarkArticleUrl + id,
    {},
    resolve,
    { Authorization: authHead },
    reject
  );
};

const unBookmarkArticleUrl = "http://localhost:8080/article/unbookmark/";
export const unBookmarkArticle = (
  id: number,
  resolve: (data: ISimpleData) => void,
  reject?: (code: number, message: string) => void
): Promise<INullData> => {
  const authHead = getTokenString();
  return rawObjectPut(
    unBookmarkArticleUrl + id,
    {},
    resolve,
    { Authorization: authHead },
    reject
  );
};

const allBookmarkArticleUrl =
  "http://localhost:8080/article/get_bookmark_articles";
export const getBookmarkArticles = (
  page: number,
  resolve: (data: IPagedArticleTitle) => void,
  reject?: (code: number, message: string) => void
): Promise<IPageWrapper<ArticleTitle[]>> => {
  const authHead = getTokenString();
  console.log(authHead);
  return rawObjectGet(
    allBookmarkArticleUrl + "?page=" + page,
    resolve,
    { Authorization: authHead },
    reject
  );
};
