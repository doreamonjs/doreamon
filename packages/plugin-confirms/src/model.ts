import { Model as M } from 'dva';

import { delay } from '@zcorky/delay';

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
        visible: false,
        attributes: {
          type: 'modal',
          prevEffect: null,
          nextEffect: null,
          title: null,
          description: null,
          confirmText: null,
        },
        datasets: {},
      },
    
      reducers: {
        save: (state, { payload }) => ({ ...state, ...payload }),
      },
    
      effects: {
        *open({ payload: { attributes, datasets } }, { put }) {
          const { target } = attributes || {};
    
          if (!target) {
            throw new Error(`require attributes.target`);
          }
    
          yield put({
            type: 'save',
            payload: {
              visible: true,
              attributes,
              datasets,
            },
          });
        },
        *submit(action, { select, put, call, take }) {
          yield call(delay, 300);
    
          const { attributes, datasets } = yield select(state => state.confirm);
          const { target } = attributes || {};
    
          if (!target) {
            throw new Error(`require attributes.target`);
          }
          
          // @TODO business
          yield call(delay, 300);
    
          const { namespace, effect } = target || {};
          const nextEffect = `${namespace}/${effect}`;
          yield put({ type: nextEffect, payload: datasets });
          yield take(`${nextEffect}/@@end`);
    
          yield put({ type: 'save', payload: { visible: false } });
        },
        *cancel(action, { put }) {
          yield put({ type: 'save', payload: { visible: false } });
        },
      },
    };
  }
}
