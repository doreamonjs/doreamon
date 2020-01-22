import { GlobalState, Screens } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Screens {
    const state = this.state[NAMESPACE];
    return state;
  }

  get(key: keyof Screens) {
    return this.value[key];
  }
}