import { Model as M } from 'dva';

import { delay } from '@zcorky/delay';

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
        visible: false,
    
        attributes: {
          type: 'modal',
          title: '新建应用',
          submitText: '创建',
          // layout: 'vertical',
          layout: 'horizontal',
          // itemLayout: {
          //   labelCol: {
          //     xs: { span: 2 },
          //     sm: { span: 5 },
          //   },
          //   wrapperCol: {
          //     xs: { span: 16 },
          //     sm: { span: 16 },
          //   },
          // },
    
          fields: [],
        },
    
        datasets: {},
      },
    
      reducers: {
        'save': (state, { payload }) => ({ ...state, ...payload }),
        'value/change'(state, { payload }) {
          return { ...state, datasets: { ...state.datasets, ...payload } };
        },
      },
    
      effects: {
        // ui
        *open({ payload }, { put }) {
          const { attributes, datasets = {} } = payload || {} as any;
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
        *close(action, { put }) {
          yield put({ type: 'save', payload: { visible: false }});
        },
        // data
        *submit({ payload: { values: updates } }, { select, put, call, take }) {
          const { attributes, datasets: originals } = yield select(state => state[NAMESPACE]);
          const { target } = attributes || {};
    
          if (!target) {
            throw new Error(`require attributes.target`);
          }
    
          const { namespace, effect } = target || {};
          const nextEffect = `${namespace}/${effect}`;
    
          const datasets = { ...originals, ...updates };
          yield put({ type: 'save', payload: { datasets } });
    
          // @TODO business
          yield call(delay, 300);
    
          yield put({ type: nextEffect, payload: datasets });
          yield take(`${nextEffect}/@@end`);
    
          yield put({ type: 'close' });
        },
      },
    };
  }
}
