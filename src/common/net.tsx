import axios from 'axios';
import { IBaseData } from './service';
import { store } from '../reducer/rootReducer';
import { OPEN_HINT } from '../reducer/system/types';

export function fileObjectPost<T>(
    url: string,
    data: FormData,
    resolve: (responseData: IBaseData<T>) => void,
    headerContent: object = {},
): Promise<T> {
    return axios
        .post(url, data, {
            headers: {
                ...headerContent,
            },
        })
        .then(response => {
            const data = response.data as IBaseData<T>;

            store.dispatch({ type: OPEN_HINT, payload: { hintMsg: data.message } });
            resolve(data);

            return data;
        })
        .catch(err => {
            return err;
        });
}

export function rawObjectGet<T>(
    url: string,
    resolve: (data: IBaseData<T>) => void,
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
            const data = response.data as IBaseData<T>;

            store.dispatch({ type: OPEN_HINT, payload: { hintMsg: data.message } });
            resolve(data);
        })
        .catch(err => {
            console.log(err);

            if (err.response) {

            } else if (err.request) {

            } else {

            }

            return err;
        });
}

export function rawObjectDelete<T>(
    url: string,
    resolve: (data: IBaseData<T>) => void,
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
            const data = response.data as IBaseData<T>;

            store.dispatch({ type: OPEN_HINT, payload: { hintMsg: data.message } });
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
    resolve: (data: IBaseData<T>) => void,
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
            const data = response.data as IBaseData<T>;

            store.dispatch({ type: OPEN_HINT, payload: { hintMsg: data.message } });
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
    resolve: (data: IBaseData<T>) => void,
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
            const data = response.data as IBaseData<T>;

            store.dispatch({ type: OPEN_HINT, payload: { hintMsg: data.message } });
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