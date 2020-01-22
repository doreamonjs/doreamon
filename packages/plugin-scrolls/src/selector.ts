import { GlobalState, Scrolls } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Scrolls {
    const state = this.state[NAMESPACE];
    return state;
  }

  get(key: keyof Scrolls) {
    return this.value[key];
  }
}