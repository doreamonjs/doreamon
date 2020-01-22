export type GlobalState = any;

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => any | Promise<any>;

/**
 * Functions
 */
export type Functions = Record<string, boolean>;
