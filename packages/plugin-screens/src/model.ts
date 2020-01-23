import { Model as M } from 'dva';

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
        full: false,
        lock: false,
    
        raiseError: false,
        password: '666',
        redirectUri: null,
      },
    
      reducers: {
        'fullscreen/save'(state, { payload: full }) {
          if (state.full === full) return state;
    
          return { ...state, full };
        },
        'lockscreen/save'(state, { payload }) {
          return { ...state, ...payload };
        },
      },
    
      effects: {
        *'fullscreen/toggle'(action, { select, put }) {
          const { full } = yield select((state: any) => state.screens);
          const next = !full;
    
          if (next) {
            openFullscreen();
          } else {
            existFullscreen();
          }
    
          yield put({ type: 'fullscreen/save', payload: next });
        },
        *'lock'(action, { select, put }) {
          const { location } = yield select((state: any) => state.router);
          const { password } = yield select((state: any) => state.screens);
          
          // if no password, input password
          if (!password) {
            // return ;
          }
    
          yield put({ type: 'menu/navigate', payload: '/' });
    
          const redirectUri = `${location.pathname}${location.search}${location.hash}`;
          yield put({
            type: 'lockscreen/save',
            payload: {
              lock: true,
              redirectUri,
            },
          });
        },
        *'lock/detect'(action, { select, put }) {
          const { location } = yield select((state: any) => state.router);
          const { lock, redirectUri } = yield select((state: any) => state.screens);
        
          // locked, stay the state
          if (lock) return ;
    
          // if no redirectUri or redirectUri is equal to location, only return
          if (!redirectUri || redirectUri === location.pathname) {
            // return yield put({ type: 'menu/navigate', payload: '/' });
            // return yield put({ type: 'menu/refresh', payload: redirectUri || '/' });
            return ;
          }
    
          yield put({ type: 'menu/navigate', payload: redirectUri });
        },
    
        // unlock
        *'unlock'({ payload }, { select, put }) {
          const { password, redirectUri } = yield select((state: any) => state.screens);
          
          // if password doesnot match, raise error
          if (payload !== password) {
            return yield put({ type: 'unlock/raise/error' });
          }
    
          yield put({ type: 'lockscreen/save', payload: { lock: false } });
          yield put({ type: 'menu/navigate', payload: redirectUri });
        },
        *'unlock/raise/error'(action, { put }) {
          yield put({ type: 'lockscreen/save', payload: { raiseError: true } });
        },
        *'unlock/raise/error/end'(action, { put }) {
          yield put({ type: 'lockscreen/save', payload: { raiseError: false } });
        },
      },
    
      subscriptions: {
        fullscreen({ dispatch }) {
          document.addEventListener('fullscreenchange', function () {
            if ((document as any).fullscreenElement) {
              dispatch({ type: 'fullscreen/save', payload: true });
            } else {
              dispatch({ type: 'fullscreen/save', payload: false });
            }
          });
        },
        lockscreenSetup({ dispatch, history }) {
          // return history.listen(({ pathname }) => {
            // if (pathname === '/lockscreen') {
              dispatch({ type: 'lock/detect' });
            // }
          // });
        },
      },
    };
  }
}

function openFullscreen() {
  if (document.body.requestFullscreen) {
    return document.body.requestFullscreen();
  } else if ((document.body as any).mozRequestFullScreen) { /* Firefox */
    return (document.body as any).mozRequestFullScreen();
  } else if ((document.body as any).webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    return (document.body as any).webkitRequestFullscreen();
  } else if ((document.body as any).msRequestFullscreen) { /* IE/Edge */
    return (document.body as any).msRequestFullscreen();
  }
}

function existFullscreen() {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  }
}