import { Action, Dispatch, Tables } from './types';
import { NAMESPACE } from './constants';

export class Service {
  constructor(private readonly dispatcher?: Dispatch) {}

  protected dispatch(action: Action) {
    if (this.dispatcher) {
      return this.dispatcher(action);
    }

    return (window as any).g_app._store.dispatch(action);
  }

  public open(options: Omit<Tables, 'visible'>) {
    return this.dispatch({ type: `${NAMESPACE}/open`, payload: options });
  }

  public close() {
    return this.dispatch({ type: `${NAMESPACE}/close` });
  }

  public submit() {
    return this.dispatch({ type: `${NAMESPACE}/submit` });
  }
}

