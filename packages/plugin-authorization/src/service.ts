import { NAMESPACE } from './constants';

export interface Action {
  type: string;
  payload?: any;
}

export class Service {
  protected dispatch(action: Action) {
    return (window as any).g_app._store.dispatch(action);
  }

  public login(username: string, password: string, captcha: string) {
    return this.dispatch({ type: `${NAMESPACE}/login`, payload: { username, password, captcha } });
  }

  public logout() {
    return this.dispatch({ type: `${NAMESPACE}/logout` });
  }

  public register(username: string, password: string, confirmPassword: string, captcha: string) {
    return this.dispatch({ type: `${NAMESPACE}/register`, payload: { username, password, confirmPassword, captcha } });
  }

  public refreshCaptcha() {
    return this.dispatch({ type: `${NAMESPACE}/refresh/captcha` });
  }

  public sendCaptchaToEmailOrOther(username: string) {
    return this.dispatch({ type: `${NAMESPACE}/send/captcha/to/email_or_other`, payload: { username } });
  }
}

