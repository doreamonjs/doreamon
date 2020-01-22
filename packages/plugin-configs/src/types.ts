export type GlobalState = any;

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => any | Promise<any>;

export type Env = 'prd' | 'dev' | 'test' | 'uat';

export type EnvDoc = {
  label: string;
  value: string;
};

/**
 * Configs
 */
export type Configs = {
  /**
   * Current Env
   */
  env: Env;

  /**
   * Debug Mode
   */
  debug: boolean;

  /**
   * Docs
   */
  docs: {
    env: EnvDoc[];
  };
};
