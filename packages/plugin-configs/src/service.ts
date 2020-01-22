import { Action, Dispatch, Env } from './types';
import { NAMESPACE } from './constants';

export class Service {
  constructor(private readonly dispatcher?: Dispatch) {}

  protected dispatch(action: Action) {
    if (this.dispatcher) {
      return this.dispatcher(action);
    }

    return (window as any).g_app._store.dispatch(action);
  }

  public setEnv(env: Env) {
    return this.dispatch({ type: `${NAMESPACE}/set/env`, payload: env });
  }

  public openDebug() {
    return this.dispatch({ type: `${NAMESPACE}/open/debug` });
  }

  public closeDebug() {
    return this.dispatch({ type: `${NAMESPACE}/close/debug` });
  }
}

