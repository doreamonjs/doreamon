import { Model as M } from 'dva';
import { NAMESPACE } from './constants';

export interface User {
  username: string;
  nickname: string;
  avatar?: string;
  description?: string;
  email?: string;
  openid?: string;
}

export interface Options {
  getUser(): Promise<User>;
}

export class Model {
  constructor(public readonly options: Options) {

  }

  build(): M {
    const getUser = this.options.getUser;

    return {
      namespace: NAMESPACE,
    
      state: {
        attributes: {
          menus: [
            { key: 'profile', icon: 'user', title: '个人中心', disabled: true },
            { key: 'setting', icon: 'setting', title: '设置', withDivider: true },
            { key: 'fullscreen', icon: 'fullscreen', title: '全屏' },
            { key: 'lockscreen', icon: 'lock', title: '锁屏', withDivider: true },
            { key: 'logout', icon: 'logout', title: '退出登录' },
          ],
        },
    
        values: {
          username: 'zero',
          nickname: 'Zero',
          avatar: 'https://avatars1.githubusercontent.com/u/7463687?s=460&v=4',
        },
      },
    
      reducers: {
        save(state, { payload }) {
          return { ...state, values: { ...state.values, ...payload } };
        },
        'save/user'(state, { payload: user }) {
          return { ...state, values: user };
        },
        'fullscreen/toggle'(state) {
          return { ...state, fullscreen: !state.fullscreen };
        },
        'fullscreen/change'(state, { payload: fullscreen }) {
          if (state.fullscreen === fullscreen) return state;
    
          return { ...state, fullscreen };
        },
      },
    
      effects: {
        // menu effect
        *'header/menu/navigate'({ payload: menu }, { select, put }) {
          const { key } = menu;
          yield put({ type: `click/${key}/menu` });
        },
    
        // 
        *'click/logout/menu'(action, { put }) {
          yield put({ type: 'authorization/logout' });
        },
        *'click/profile/menu'(action, { put }) {
          // @TODO
        },
        *'click/setting/menu'(action, { put }) {
          const settingPath = '/setting';
          yield put({ type: 'menu/navigate', payload: settingPath });
        },
        *'click/fullscreen/menu'(action, { select, call, put }) {
          yield put({ type: 'screen/fullscreen/toggle' });
        },
        *'click/lockscreen/menu'(action, { select, put }) {
          // const state = yield select(state => state);
          // console.log('lockscreen: ', state);
          // const { current = '/' } = nav || {};
    
          // yield put({
          //   type: 'lockscreen/request/lock',
          //   payload: {
          //     password: '123456',
          //     redirectUri: current,
          //   },
          // });
          yield put({ type: 'screen/lock' });
        },
        // business
        *'avatar/change'({ payload: avatar }, { put }) {
          yield put({ type: 'save', payload: { avatar } });
        },
        *'fetch/user'(action, { call, put }) {
          const user = yield call(getUser);
    
          yield put({ type: 'save/user', payload: user });
        },
      },
    
      subscriptions: {
    
      },
    };
  }
}
