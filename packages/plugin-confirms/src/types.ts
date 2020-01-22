export type GlobalState = any;

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => any | Promise<any>;

/**
 * Screens
 */
export type Confirms = {
  visible: boolean;

  attributes: Attributes;

  datasets: DataSets;
};

export type Attributes = {
  // meta
  type: AttributeType;
  target: AttributeTarget;
  // content
  title: string;
  description: string;
  confirmText: string;
}

export type DataSets = {
  
};

export type AttributeType = 'modal' | 'drawer';

export type AttributeTarget = {
  namespace: string;
  effect: string;
};