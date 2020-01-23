import { Model as M } from 'dva';

import router from 'umi/router';
import { message } from 'antd';
import produce from 'immer';

import { App } from './types';
import { NAMESPACE } from './constants';

export interface Options {
  getSite(): Promise<App>;
  getApps(): Promise<App[]>;
}

const DEFAULT_LAYOUT = process.env.DEFAULT_LAYOUT;
const DEFAULT_LAYOUT_ROOT_PATH = process.env.DEFAULT_LAYOUT_ROOT_PATH;
const DEFAULT_LAYOUT_SAFE_PATHS = process.env.DEFAULT_LAYOUT_SAFE_PATHS
  ? process.env.DEFAULT_LAYOUT_SAFE_PATHS.split(',') : null;
const ENABLE_ROUTER_SECURITY_STRATEGY = process.env.ENABLE_ROUTER_SECURITY_STRATEGY === 'true';


export class Model {
  constructor(public readonly options: Options) {

  }

  build(): M {
    const options = this.options;

    return {
      namespace: NAMESPACE,
    
      state: {
        theme: 'light', // options: 'dark'
        
        site: {
          name: 'ADMIN',
          // logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        },
    
        collapsed: false,
    
        search: {
          value: '',
          placeholder: '搜索，默认当前页面',
          dataSource: [],
        },
    
        notice: {},
    
        layout: {
          // use to filter menus
          rootPath: DEFAULT_LAYOUT_ROOT_PATH || '/',
    
          // use to keep hide menus, let it allow by router security strategy
          safePaths: DEFAULT_LAYOUT_SAFE_PATHS || ['/'],
          
          fallback: DEFAULT_LAYOUT || 'blank',
    
          rules: {
            '^/login': 'blank',
            '^/register': 'blank',
            '^/logout': 'blank',
            '^/demo': 'blank',
            '^/g/': 'blank',
            '^/admin/': 'console',
            '^/console/': 'console',
          },
        },
    
        apps: {
          visible: false,
          // title: '',
          data: [],
        },
    
        // router security strategy
        //  1.enable
        //  2.from
        //    2.1 whiteRoutes (first)
        //    2.2 menus
        routerSecurityStrategy: {
          enable: ENABLE_ROUTER_SECURITY_STRATEGY,
          whiteRoutes: [
            '/login',
            '/register',
            '/logout',
            '/404',
            '/403',
            '/500',
            '/g/',
          ],
        },
      },
      
      reducers: {
        'save/theme'(state, { payload: theme }) {
          return produce(state, (draft: any) => {
            draft.theme = theme;
          });
        },
        'save/site'(state, { payload }: any) {
          return produce(state, (draft: any) => {
            draft.site = payload;
          });
        },
        'save/apps'(state, { payload }: any) {
          return produce(state, (draft: any) => {
            draft.apps = payload;
          });
        },
        'save/apps/visible'(state, { payload }: any) {
          return produce(state, (draft: any) => {
            draft.apps.visible = payload;
          });
        },
        'sider/toggle'(state) {
          return produce(state, (draft: any) => {
            draft.collapsed = !draft.collapsed;
          });
        },
      },
    
      effects: {
        //
        *'fetch/site'(action, { call, put }) {
          const site = yield call(options.getSite);
    
          yield put({ type: 'save/site', payload: site });
        },
        *'fetch/apps'(action, { call, put }) {
          const apps = yield call(options.getApps);
    
          yield put({
            type: 'save/apps',
            payload: {
              visible: false,
              data: apps || [], // @TODO
            },
          });
        },
        //
        *'open/apps'(action, { put }) {
          yield put({ type: 'save/apps/visible', payload: true });
        },
        *'close/apps'(action, { put }) {
          yield put({ type: 'save/apps/visible', payload: false });
        },
        *'select/app'({ payload: app = {} }, { put }) {
          // @TODO home page
          if (!app.homepage) {
            return put({ type: 'messages/tip/error', payload: `${app.name} 应用已损坏，请联系管理员` });
          }
    
          if (app.active === false) {
            return message.warn(`应用${app.name}拼命迁移中...`);
          }
    
          // internal
          if (app.homepage.startsWith('/')) {
            return router.push(app.homepage);
          }
    
          // outer
          return window.location.href = app.homepage;
        },
      },
    
      subscriptions: {
        setup({ dispatch }) {
          // @TODO process steps
          dispatch({ type: 'fetch/site' });
    
          // @TODO
          if (/^\/(login|register|logout|404|403|500|g\/)/.test(window.location.pathname)) {
            return ;
          }
    
          dispatch({ type: 'user/fetch/user' });
    
          dispatch({ type: 'menus/fetch/menus' });
    
          dispatch({ type: 'fetch/apps' });
        },
      },
    };
  }
}
