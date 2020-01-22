import { Action, Dispatch, App } from './types';
import { NAMESPACE } from './constants';

export class Service {
  constructor(private readonly dispatcher?: Dispatch) {}

  protected dispatch(action: Action) {
    if (this.dispatcher) {
      return this.dispatcher(action);
    }

    return (window as any).g_app._store.dispatch(action);
  }

  public fetchSite() {
    return this.dispatch({ type: `${NAMESPACE}/fetch/site` });
  }

  public fetchApps() {
    return this.dispatch({ type: `${NAMESPACE}/fetch/apps` });
  }

  public openApps() {
    return this.dispatch({ type: `${NAMESPACE}/open/apps` });
  }

  public closeApps() {
    return this.dispatch({ type: `${NAMESPACE}/close/apps` });
  }

  public selectApp(app: App) {
    return this.dispatch({ type: `${NAMESPACE}/close/apps` });
  }
}

