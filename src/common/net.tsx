import axios from "axios";
import { IBaseData } from "./service";
import { store } from "../reducer/rootReducer";
import { openHint } from "../reducer/system/functions";

const STATE_CODE_OK = 200;

function runActionByStateCode<T>(
  baseData: IBaseData<T>,
  resolve: (data: IBaseData<T>) => void,
  reject?: (code: number, message: string) => void
): void {
  const { code, message } = baseData;

  if (code === STATE_CODE_OK) {
    resolve(baseData);
  } else {
    if (reject) {
      reject(code, message);
    } else {
      openHint(store.dispatch, message);
    }
  }
}

export function fileObjectPost<T>(
  url: string,
  data: FormData,
  resolve: (responseData: IBaseData<T>) => void,
  headerContent: object = {}
): Promise<T> {
  return axios
    .post(url, data, {
      headers: {
        ...headerContent,
      },
    })
    .then((response) => {
      const basedata = response.data as IBaseData<T>;
      runActionByStateCode(basedata, resolve);

      return basedata;
    })
    .catch((err) => {
      return err;
    });
}

export function rawObjectGet<T>(
  url: string,
  resolve: (data: IBaseData<T>) => void,
  headerContent: object = {},
  reject?: (code: number, message: string) => void
): Promise<T> {
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        ...headerContent,
      },
    })
    .then((response) => {
      const basedata = response.data as IBaseData<T>;
      runActionByStateCode(basedata, resolve, reject);
    })
    .catch((err) => {
      return err;
    });
}

export function rawObjectDelete<T>(
  url: string,
  resolve: (data: IBaseData<T>) => void,
  headerContent: object = {},
  reject?: (code: number, message: string) => void
): Promise<T> {
  return axios
    .delete(url, {
      headers: {
        "Content-Type": "application/json",
        ...headerContent,
      },
    })
    .then((response) => {
      const basedata = response.data as IBaseData<T>;
      runActionByStateCode(basedata, resolve, reject);
    })
    .catch((err) => {
      return err;
    });
}

export function rawObjectPut<T>(
  url: string,
  data: object,
  resolve: (data: IBaseData<T>) => void,
  headerContent: object = {},
  reject?: (code: number, message: string) => void
): Promise<T> {
  return axios
    .put(url, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        ...headerContent,
      },
    })
    .then((response) => {
      const basedata = response.data as IBaseData<T>;
      runActionByStateCode(basedata, resolve, reject);
    })
    .catch((err) => {
      return err;
    });
}

export function rawObjectPost<T>(
  url: string,
  data: object,
  resolve: (data: IBaseData<T>) => void,
  headerContent: object = {},
  reject?: (code: number, message: string) => void
): Promise<T> {
  return axios
    .post(url, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        ...headerContent,
      },
    })
    .then((response) => {
      const basedata = response.data as IBaseData<T>;
      runActionByStateCode(basedata, resolve, reject);
    })
    .catch((err) => {
      return err;
    });
}
