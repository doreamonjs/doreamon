import { Action, Dispatch, Confirms } from './types';
import { NAMESPACE } from './constants';

export class Service {
  constructor(private readonly dispatcher?: Dispatch) {}

  protected dispatch(action: Action) {
    if (this.dispatcher) {
      return this.dispatcher(action);
    }

    return (window as any).g_app._store.dispatch(action);
  }

  public open(options: Omit<Confirms, 'visible'>) {
    return this.dispatch({ type: `${NAMESPACE}/open`, payload: options });
  }

  public submit() {
    return this.dispatch({ type: `${NAMESPACE}/submit` });
  }
}

