export type GlobalState = any;

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => any | Promise<any>;

export interface Authorization {
  captcha: string;
}

export interface Captcha {
  url: string;
}