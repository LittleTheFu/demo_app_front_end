import axios from 'axios';

export function fileObjectPost<T>(
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

export function rawObjectGet<T>(
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

export function rawObjectDelete<T>(
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


export function rawObjectPut<T>(
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

export function rawObjectPost<T>(
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