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