import { GlobalState, Functions } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Functions {
    const state = this.state[NAMESPACE];
    return state;
  }

  get(key: keyof Functions) {
    return this.value[key];
  }
}