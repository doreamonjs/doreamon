export type GlobalState = any;

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => any | Promise<any>;

/**
 * Screens
 */
export type Screens = {
  full: boolean;
  lock: boolean;
  //
  raiseError: boolean;
  //
  password: string;
  //
  redirectUri: string | null;
};
