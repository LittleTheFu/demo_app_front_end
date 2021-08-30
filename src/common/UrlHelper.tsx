export const getUserDetailPageUrl = (id: number): string => {
    return '/main/user/' + id;
}

export const getWriteNewMailUrl = (): string => {
    return '/main/new_mail/';
}

export const getHistoryUrl = (): string => {
    return '/main/history';
}

export const getArticleDetailUrl = (id: number): string => {
    return '/main/article/' + id;
}

export const getNewArticleUrl = (): string => {
    return '/main/new_article';
}

export const getSharedUrl = (url: string): string => {
    const LOCAL_HOST = 'http://localhost:3000';
    return LOCAL_HOST + url;
}

export const getFriendUrl = (): string => {
    return '/main/friend';
}

export const getMailUrl = (): string => {
    return '/main/mail';
}

export const getProfileUrl = (): string => {
    return '/main/profile';
}

export const getAllArticleUrl = (): string => {
    return '/main/articles';
}

export const getLoginUrl = (): string => {
    return '/login';
}

export const getUserUrl = (id: number): string => {
    return '/main/user/' + id;
}

export const getArticleUrl = (id: number): string => {
    return '/main/article/' + id;
}

export const getFavoriteUrl = (): string => {
    return '/main/favorite/';
}