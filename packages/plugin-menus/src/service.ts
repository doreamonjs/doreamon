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

  public navigate(path: string) {
    return this.dispatch({ type: `${NAMESPACE}/navigate`, payload: path });
  }

  public navigateReplace(path: string) {
    return this.dispatch({ type: `${NAMESPACE}/navigate/replace`, payload: path });
  }

  public navigateClose(path: string) {
    return this.dispatch({ type: `${NAMESPACE}/nav/close`, payload: path });
  }

  public refresh(path: string) {
    return this.dispatch({ type: `${NAMESPACE}/nav/refresh`, payload: path });
  }
}

