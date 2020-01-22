import { GlobalState, Applications } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Applications {
    const state = this.state[NAMESPACE];
    return state;
  }

  get(key: keyof Applications) {
    return this.value[key];
  }
}