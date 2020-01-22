import { GlobalState, Configs } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Configs {
    const state = this.state[NAMESPACE];
    return state;
  }

  get(key: keyof Configs) {
    return this.value[key];
  }
}