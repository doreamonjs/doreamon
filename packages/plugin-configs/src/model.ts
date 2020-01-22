import { Model as M } from 'dva';

import router from 'umi/router';
import * as qs from '@zcorky/query-string';

import { Env } from './types';
import { NAMESPACE } from './constants';

export interface Options {
  updateEnv(env: Env): Promise<void>;
}

export class Model {
  constructor(public readonly options: Options) {

  }

  build(): M {
    const options = this.options;

    return {
      namespace: NAMESPACE,
    
      state: {
        env: 'prd', // dev | test | uat | prd
        debug: false,
    
        docs: {
          env: [
            { label: '开发', value: 'dev' },
            { label: '测试', value: 'test' },
            { label: 'UAT', value: 'uat' },
            { label: '生产', value: 'prd' },
          ],
        },
      },
    
      reducers: {
        'save/env'(state, { payload: env }: any) {
          return { ...state, env };
        },
        'save/debug'(state, { payload: debug }: any) {
          return { ...state, debug };
        },
      },
    
      effects: {
        *'set/env'({ payload: env }, { call, put }) {
          // call api
          yield call(options.updateEnv, env);
    
          // save
          yield put({ type: 'save/env', payload: env });
        },
        *'open/debug'(action, { put }) {
          yield put({ type: 'save/debug', payload: true });
        },
        *'close/debug'(action, { put }) {
          yield put({ type: 'save/debug', payload: false });
        },
      },
    
      subscriptions: {
        setup({ dispatch }) {
          const { pathname, search } = window.location;
          const { env, ...query } = qs.parse(search);
    
          if (env) {
            dispatch({ type: 'save/env', payload: env });
    
            // remove env query
            router.replace({ pathname, query });
          }
        },
      },
    };
  }
}
