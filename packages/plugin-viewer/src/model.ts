import { Model as M } from 'dva';
import viewer from '@zcorky/previewer';

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
    
      },
    
      reducers: {
    
      },
    
      effects: {
        *'preview'({ payload: url }) {
          if (Array.isArray(url)) {
            viewer.setUrls(url);

            return viewer.preview();
          }

          return viewer.preview({ source: url });
        },
        *'preview/image'({ payload }, { put }) {
          yield put({ type: 'preview', payload });
        },

      },
    };
  }
}
