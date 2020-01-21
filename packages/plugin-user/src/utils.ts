import { Model, Hooks } from 'dva';

export type Reducers = Record<string, Function>;
export type Effects = Record<string, Function>;

export type Reducer = (state: any, action: any) => any;

export type NamespaceReducer = Record<string, Reducer>;

export function createReducers(namespace: string, initialState: any, reducers: Reducers) {
  return {
    [namespace](state = initialState, { type, payload }) {
      const reducer = reducers[type];
      return !reducer ? state : reducer(state, { type, payload });
    },
  };
}

export function createEffects(namespace: string, initialState: any, effects: Effects) {

}

export function createHook(model: Model): Hooks {
  const {
    namespace,
    state,
    reducers,
    effects,
  } = model;
}