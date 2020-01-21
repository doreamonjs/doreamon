import { NAMESPACE } from './constants';

export interface Action {
  type: string;
  payload?: any;
}

export class Service {
  protected dispatch(action: Action) {
    return (window as any).g_app._store.dispatch(action);
  }

  public lockscreen() {
    return this.dispatch({ type: `${NAMESPACE}/click/lockscreen/menu` });
  }

  public toggleFullScreen() {
    return this.dispatch({ type: `${NAMESPACE}/click/fullscreen/menu` });
  }

  public logout() {
    return this.dispatch({ type: `${NAMESPACE}/click/logout/menu` });
  }
}

