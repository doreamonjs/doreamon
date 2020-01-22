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

  public toggleFullscreen() {
    return this.dispatch({ type: `${NAMESPACE}/fullscreen/toggle` });
  }

  public lockscreen() {
    return this.dispatch({ type: `${NAMESPACE}/lock` });
  }

  public unlockscreen() {
    return this.dispatch({ type: `${NAMESPACE}/unlock` });
  }
}

