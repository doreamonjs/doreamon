import { GlobalState, Authorization } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Authorization {
    const state = this.state[NAMESPACE];
    return state;
  }

  get(key: keyof Authorization) {
    return this.value[key];
  }
}