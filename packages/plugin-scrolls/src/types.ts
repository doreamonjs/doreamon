export type GlobalState = any;

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => any | Promise<any>;

/**
 * Scrolls
 */
export type Scrolls = {
  threshold: number;

  isTop: boolean;

  isBottom: boolean;
};
