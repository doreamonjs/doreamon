import { Action, Dispatch, MessageType, NotificationContent } from './types';
import { NAMESPACE } from './constants';

export class Service {
  constructor(private readonly dispatcher?: Dispatch) {}

  protected dispatch(action: Action) {
    if (this.dispatcher) {
      return this.dispatcher(action);
    }

    return (window as any).g_app._store.dispatch(action);
  }

  public tip(message: string, type: MessageType = 'info') {
    return this.dispatch({ type: `${NAMESPACE}/tip/${type}`, payload: message });
  }

  public notify(content: NotificationContent) {
    return this.dispatch({ type: `${NAMESPACE}/notification`, payload: content });
  }

  public error(error: string | Error) {
    return this.dispatch({ type: `${NAMESPACE}/error/fatal`, payload: error });
  }
}

