import { GlobalState, Menu } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Menu {
    const { values } = this.state[NAMESPACE];
    return values;
  }

  get(key: keyof Menu) {
    return this.value[key];
  }
}