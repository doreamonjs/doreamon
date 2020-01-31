import { GlobalState, User } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): User {
    const { values } = this.state[NAMESPACE];
    return values;
  }

  get(key: keyof User) {
    return this.value[key];
  }
}