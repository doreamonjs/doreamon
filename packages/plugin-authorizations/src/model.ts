import { Model as M } from 'dva';
import { delay } from '@zcorky/delay';
import { parse } from '@zcorky/query-string';

import { Captcha } from './types';
import { NAMESPACE } from './constants';

export interface Options {
  login(username: string, password: string, captcha: string): Promise<void>;
  logout(username: string): Promise<void>;
  register(username: string, password: string, confirmPassword: string, captcha: string): Promise<void>;
  //
  captcha(): Promise<Captcha>;
  //
  sendCaptchaToEmailOrOther(username: string): Promise<void>;
}

export class Model {
  constructor(public readonly options: Options) {

  }

  build(): M {
    const {
      login, logout, register,
      captcha, sendCaptchaToEmailOrOther,
    } = this.options;

    return {
      namespace: NAMESPACE,
    
      state: {
        captcha: `/captcha?_t=${Date.now()}`,
      },
    
      reducers: {
        'captcha/save'(state, { payload: captcha }) {
          return { ...state, captcha };
        },
      },
    
      effects: {
        *login({ payload: { username, password, captcha } }, { race, call, put }) {
          yield call(delay, 1000);
    
          try {
            const { timeout } = yield race({
              data: call(login, username, password, captcha),
              timeout: call(delay, 10000),
            });
      
            if (!!timeout) {
              yield put({ type: 'message/tip/error', payload: '服务器开小差啦' });
              return false;
            }
          } catch (err) {
            yield put({ type: 'refresh/captcha' });
    
            setTimeout(() => {
              // @TODO hack clear captcha
              const node = document.querySelector<HTMLInputElement>('input#captcha');
              if (node) {
                node.value = '';
              }
            }, 0);
    
            throw err;
          }
    
          yield call(delay, 1000);
    
          // router change
          // @TODO should support redirect
          const query = parse(window.location.search);
          const redirect = query.redirect as string || '/';
    
          window.location.href = redirect;
        },
    
        *logout(action, { select, race, call, put }) {
          // @TODO request call backend api
          const { username } = yield select(state => state.user.values);
          const { timeout } = yield race({
            data: call(logout, username),
            timeout: call(delay, 10000),
          });
    
          if (!!timeout) {
            yield put({ type: 'message/tip/error', payload: '服务器开小差啦' });
            return false;
          }
    
          // solution @2
          // const currentPath = window.location.pathname;
          // window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
          
          window.location.href = `/logout`;
        },
    
        *register({ payload }, { race, call, put }) {
          const { username, password, confirmPassword, captcha } = payload
         
          const { data, timeout } = yield race({
            data: call(register, username, password, confirmPassword, captcha),
            timeout: call(delay, 10000)
          });
    
          if (!!timeout) {
            yield put({ type: 'message/tip/error', payload: '服务器开小差啦' });
            return false;
          }
    
          yield put({ type: 'message/tip/success', payload: '注册成功, 正在跳转登陆界面...' });
    
          yield call(delay, 1000);
    
          window.location.href = '/';
        },
    
        // login
        *'refresh/captcha'(action, { race, call, put }) {
          const { data, timeout } = yield race({
            data: call(captcha),
            timeout: call(delay, 10000)
          });
    
          if (!!timeout) {
            yield put({ type: 'message/tip/error', payload: '服务器开小差啦' });
            return false;
          }
    
          yield put({ type: 'captcha/save', payload: data.url });
        },
    
        *'send/captcha/to/email_or_other'({ payload: { username } }, { race, call, put }) {
          const { timeout } = yield race({
            data: call(sendCaptchaToEmailOrOther, username),
            timeout: call(delay, 10000)
          });
    
          if (!!timeout) {
            yield put({ type: 'message/tip/error', payload: '服务器开小差啦' });
            return false;
          }
    
          yield put({ type: 'message/tip/success', payload: '验证码发送成功，请查看邮箱' });
        },
      },
    };
  }
}
