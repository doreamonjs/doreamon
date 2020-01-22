import { GlobalState, Confirms } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Confirms {
    const state = this.state[NAMESPACE];
    return state;
  }

  get(key: keyof Confirms) {
    return this.value[key];
  }
}