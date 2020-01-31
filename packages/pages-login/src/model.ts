import { Model as M } from 'dva';

import { User } from './types';
import { NAMESPACE } from './constants';


export interface Options {
  getUser(): Promise<User>;
}

export class Model {
  constructor(public readonly options: Options) {

  }

  build(): M {
    const getUser = this.options.getUser;

    return {
      namespace: NAMESPACE,
    
      state: {
        
      },
    
      reducers: {
        
      },
    
      effects: {
        
      },
    
      subscriptions: {
    
      },
    };
  }
}
