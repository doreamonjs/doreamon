export type GlobalState = any;

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => any | Promise<any>;

export interface User {
  username: string;
  nickname: string;
  avatar?: string;
  description?: string;
  email?: string;
  openid?: string;
}