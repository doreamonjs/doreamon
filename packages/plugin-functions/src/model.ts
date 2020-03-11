import { Model as M } from 'dva';

import { NAMESPACE } from './constants';

export interface Options {

}

export class Model {
  constructor(public readonly options?: Options) {

  }

  build(): M {
    const options = this.options;

    return {
      namespace: NAMESPACE,
    
      state: {
        // 1.Full Screen
        'global.system.settings.fullscreen': true,
    
        // 2.Lock Screen
        'global.system.settings.lockscreen': true,
    
        // 3.FAQ
        'global.system.faq': true,
    
        // 4.Notice: Notification + Message + TODO
        'global.system.notice': false,
    
        // 5.Search
        'global.system.search': false,
    
        // 6.Menu Collapse
        'global.system.menu.collapse': false,
    
        // 7.Allow Query Layout
        'global.system.query.layout': true,
    
        // 8.Logo
        'global.system.logo': false,
    
        // 9.Env
        'global.system.env': false,
      },
    
      reducers: {
        save(state, { payload: { name, enable } }) {
          return {
            ...state,
            [name]: enable,
          };
        },
      },
    
      effects: {
        *enable({ payload: name }, { put }) {
          yield put({ type: 'save', payload: { name, enable: true } });
        },
        *disable({ payload: name }, { put }) {
          yield put({ type: 'save', payload: { name, enable: false } });
        },
      },
    };
  }
}
