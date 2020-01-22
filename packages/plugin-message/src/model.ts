import { Model as M } from 'dva';

import * as qs from '@zcorky/query-string';
import { message, notification } from 'antd';
import router from 'umi/router';

import { NAMESPACE } from './constants';

message.config({
  maxCount: 1,
  duration: 1,
});

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
    
      },
    
      reducers: {
    
      },
    
      effects: {
        *'tip/success'({ payload: text }) {
          message.success(text);
        },
        *'tip/error'({ payload: text }) {
          message.error(text);
        },
        *'tip/warn'({ payload: text }) {
          message.warn(text);
        },
        *'tip/info'({ payload: text }) {
          message.info(text);
        },
        *'tip/loading'({ payload: text }) {
          message.loading(text);
        },
        *'notification'({ payload }) {
          const {
            type,
            placement,
            duration = 4.5,
            message = '未知错误',
            description = message,
          } = payload || {};
    
          if (!type) {
            notification.open({ placement, duration, message, description });
          } else {
            notification[type]({ placement, duration, message, description });
          }
        },
        *'error/fatal'({ payload: error }, { select, call }) {
          // @TODO here to handle fatal error
          const store = yield select(state => state);
          const info = {
            store,
            error,
          };
    
          /* tslint:disable */
          console.log('fatal error: ', info);
          /* tslint:enable */
        },
    
        // business on url error + error_description
        *'url/error'(action, { put }) {
          const { pathname, search } = window.location;
          const { error, error_description, ...rest } = qs.parse(search);
    
          if (!error) {
            return ;
          }
      
          router.replace({
            pathname,
            query: rest,
          });
    
          yield put({
            type: 'notification',
            payload: {
              type: 'error',
              message: error,
              description: error_description,
            },
          });
        },
      },
    };
  }
}
