import { GlobalState, Menus } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Menus {
    const { values } = this.state[NAMESPACE];
    return values;
  }

  get(key: keyof Menus) {
    return this.value[key];
  }
}