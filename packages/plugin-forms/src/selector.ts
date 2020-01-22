import { GlobalState, Forms } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Forms {
    const state = this.state[NAMESPACE];
    return state;
  }

  get(key: keyof Forms) {
    return this.value[key];
  }
}