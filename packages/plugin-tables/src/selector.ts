import { GlobalState, Tables } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Tables {
    const state = this.state[NAMESPACE];
    return state;
  }

  get(key: keyof Tables) {
    return this.value[key];
  }
}