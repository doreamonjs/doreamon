import { Model as M } from 'dva';

import router from 'umi/router';
import produce from 'immer';
import { delay } from '@zcorky/delay';

import { MenuItem } from './types';
import { NAMESPACE } from './constants';


export interface Options {
  getMenu(): Promise<MenuItem>;
}

export class Model {
  constructor(public readonly options: Options) {

  }

  build(): M {
    const { getMenu } = this.options;

    return {
      namespace: NAMESPACE,
    
      state: {
        nav: {
          type: 'tag', // breadcrumb | tag
          history: [],
          current: '/',
          prev: '/',
        },
    
        data: [
          {
            name: '首页',
            icon: 'appstore',
            path: '/',
          },
        ],
      },
    
      reducers: {
        'save/menus'(state, { payload: menus }) {
          return produce(state, (draft) => {
            draft.data = menus;
          });
        },
        'save/nav'(state, { payload: nav }: any) {
          return produce(state, (draft) => {
            draft.nav = nav;
          });
        },
        'save/browser/history'(state, { payload: path }: any) {
          if (path === state.nav.current) return state;
    
          return produce(state, draft => {
            draft.nav.prev = draft.nav.current;
            draft.nav.current = path;
            
            if (!draft.nav.history.includes(path)) {
              draft.nav.history.push(path);
            }
          });
        },
      },
      
      effects: {
        *'navigate'({ payload: path }, { select, put }) {
          const { nav } = yield select(state => state.menu);
          const hasInHistory = nav.history.includes(path);
    
          const history = hasInHistory ? nav.history : [...nav.history, path];
          const prev = nav.current;
          const next = path;
    
          yield put({
            type: 'save/nav',
            payload: {
              ...nav,
              history,
              current: next,
              prev,
            },
          });
        
          router.push(path);
        },
        *'navigate/replace'({ payload: path }, { select, put }) {
          const { nav } = yield select(state => state.menu);
          const hasInHistory = nav.history.includes(path);
    
          // replace current
          let history = nav.history.filter(e => e !== nav.current);
          history = hasInHistory ? history : [...history, path];
    
          const prev = history[0];
          const next = path;
    
          yield put({
            type: 'save/nav',
            payload: {
              ...nav,
              history,
              current: next,
              prev,
            },
          });
        
          router.replace(path);
        },
        *'nav/close'({ payload: path }, { select, put }) {
          const { nav } = yield select(state => state.menu);
          
          const history = nav.history.filter(h => h !== path);
          const current = path === nav.current ? nav.prev : nav.current;
          const prev = path === nav.prev ? history[0] : nav.prev;
          
          const _nav = {
            ...nav,
            history,
            current,
            prev,
          };
    
          yield put({
            type: 'save/nav',
            payload: _nav,
          });
    
          if (current !== nav.current) {
            yield put({ type: 'navigate', payload: current });
          }
        },
        *'nav/close/others'({ payload: path }, { select, put }) {
          const { nav } = yield select(state => state.menu);
          
          const history = nav.history.filter(h => h === path);
          const current = nav.current;
          const prev = current;
          const _nav = { ...nav, history, current, prev };
    
          yield put({ type: 'save/nav', payload: _nav });
        },
        *'nav/close/all'({ payload: path }, { select, put }) {
          const { nav } = yield select(state => state.menu);
    
          const history = [];
          const current = '/';
          const prev = current;
          const _nav = { ...nav, history, current, prev };
    
          yield put({ type: 'save/nav', payload: _nav });
    
          yield put({ type: 'navigate', payload: current });
        },
        *'nav/refresh'({ payload: path }, { select, put, call }) {
          const { nav } = yield select(state => state.menu);
          
          // @TODO
          // yield put({ type: 'navigate', payload: '/force-to-make-refresh' });
          router.replace('/force-to-make-refresh');
    
          // yield put({ type: 'navigate/replace', payload: nav.current });
          router.replace(nav.current);
        },
    
        *'fetch/menus'(action, { select, call, put }) {
          const { layout } = yield select(state => state.application);
          const menus = yield call(getMenu, layout.rootPath, layout.safePaths);
    
          yield put({ type: 'save/menus', payload: menus });
        },
      },
    
      subscriptions: {
        listenBrowserHistory({ dispatch, history }) {
          return history.listen(async ({ pathname }) => {
            if (history.action === 'POP') {
              // @TODO should delay when listen on POP, or has some weird errors
              await delay(50);
              dispatch({ type: 'save/browser/history', payload: pathname });
            }
          });
        },
      },
    };
  }
}
