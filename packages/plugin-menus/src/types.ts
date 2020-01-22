export type GlobalState = any;

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => any | Promise<any>;

export interface MenuItem {
  name: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
  [key: string]: any;
}

export interface Menus {
  nav: {
    type: 'tag' | 'breadcrumb';
    history: string[];
    current: string;
    prev: string;
  };

  data: MenuItem[];
}