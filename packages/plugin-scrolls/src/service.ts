import { Action, Dispatch, Scrolls } from './types';
import { NAMESPACE } from './constants';

export class Service {
  constructor(private readonly dispatcher?: Dispatch) {}

  protected dispatch(action: Action) {
    if (this.dispatcher) {
      return this.dispatcher(action);
    }

    return (window as any).g_app._store.dispatch(action);
  }

  public atTop() {
    return this.dispatch({ type: `${NAMESPACE}/at/top` });
  }

  public atBottom() {
    return this.dispatch({ type: `${NAMESPACE}/at/bottom` });
  }

  public idle() {
    return this.dispatch({ type: `${NAMESPACE}/idle` });
  }
}

