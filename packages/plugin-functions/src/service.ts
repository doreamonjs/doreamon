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

  public enable(functionName: string) {
    return this.dispatch({ type: `${NAMESPACE}/enable`, payload: functionName });
  }

  public disable(functionName: string) {
    return this.dispatch({ type: `${NAMESPACE}/disable`, payload: functionName });
  }
}

