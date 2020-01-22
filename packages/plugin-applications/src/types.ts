export type GlobalState = any;

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => any | Promise<any>;

//
export interface Applications {
  theme: Theme;
  site: Site;
  search: Search;
  layout: Layout;
  apps: Apps;
  routerSecurityStrategy: RouterSecurityStrategy;
}
//

export type Theme = 'light' | 'dark';

export type Site = {
  name: string;
  logo?: string;
};

export type Collapsed = boolean;

export type Search = {
  value: string;
  placeholder: string;
  dataSource: string[];
};

export type Layout = {
  rootPath: string;
  safePaths: string[];
  fallback: string;
  rules: Record<string, string>;
};

export type Apps = {
  visible: boolean;
  data: App[];
};

export type RouterSecurityStrategy = {
  enable: boolean;
  whiteRoutes: string[];
}

export type App = {
  name: string;
  logo?: string;
  homepage: string;
  active?: boolean;
  hidden?: boolean;
}