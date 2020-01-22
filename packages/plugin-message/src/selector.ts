import { GlobalState, Message } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Message {
    const { values } = this.state[NAMESPACE];
    return values;
  }

  get(key: keyof Message) {
    return this.value[key];
  }
}