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