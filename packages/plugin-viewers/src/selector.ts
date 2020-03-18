import { GlobalState, Messages } from './types';
import { NAMESPACE } from './constants';

export class Selector {
  constructor(private readonly state: GlobalState) {}

  get value(): Messages {
    const { values } = this.state[NAMESPACE];
    return values;
  }

  get(key: keyof Messages) {
    return this.value[key];
  }
}