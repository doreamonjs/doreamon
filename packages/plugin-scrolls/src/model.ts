import { Model as M } from 'dva';

import { Event } from '@zcorky/event';

import { NAMESPACE } from './constants';

export interface Options {
  
}

export class Model {
  constructor(public readonly options: Options) {

  }

  build(): M {
    const options = this.options;

    return {
      namespace: NAMESPACE,
    
      state: {
        threshold: 300,
        isTop: false,
        isBottom: false,
      },
    
      reducers: {
        'save'(state, { payload }) {
          return { ...state, ...payload };
        },
      },
    
      effects: {
        *'at/top'(action, { put }) {
          // const state = yield select(state => state[NAMESPACE]);
          // if (state.isTop) return state;
    
          yield put({ type: 'save', payload: { isTop: true } });
          subscriber.emit('scroll', { isTop: true });
        },
        *'at/bottom'(action, { put }) {
          // const state = yield select(state => state[NAMESPACE]);
          // if (state.isBottom) return state;
          
          yield put({ type: 'save', payload: { isBottom: true } });
          subscriber.emit('scroll', { isBottom: true });
        },
        *'idle'(action, { put }) {
          // const state = yield select(state => state[NAMESPACE]);
          // if (state.isTop === false && state.isBottom === false) return state;
    
          yield put({ type: 'save', payload: { isTop: false, isBottom: false } });
          subscriber.emit('scroll', { isIdle: true });
        },
      },
    
      subscriptions: {
    
      },
    };
  }
}

export const subscriber = new Event<{
  isTop?: boolean;
  isBottom?: boolean;
  isIdle?: boolean;
}>();