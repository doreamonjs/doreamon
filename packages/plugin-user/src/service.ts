import { Action, Dispatch } from './types';
import { NAMESPACE } from './constants';

export class Service {
  constructor(private readonly dispatcher?: Dispatch) {}

  protected dispatch(action: Action) {
    if (this.dispatcher) {
      return this.dispatcher(action);
    }

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

