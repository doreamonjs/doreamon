export type GlobalState = any;

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => any | Promise<any>;

/**
 * Tables
 */
export type Tables = {
  visible: boolean;

  attributes: Attributes;

  datasets: DataSets;
};

export type Attributes = {
  // meta
  type: AttributeType;
  layout: AttributeLayout;
  target: AttributeTarget;
  // content
  title: string;
  description: string;
  //
  submitText: string;
  //
  fields: AttributeField[];
}

export type DataSets = {
  
};

export type AttributeType = 'modal' | 'drawer';

export type AttributeLayout = 'horizontal' | 'vertical';

export type AttributeTarget = {
  namespace: string;
  effect: string;
};

export type AttributeField = {
  // key
  dataIndex: string;
  // input | text | select .... @TODO
  type: string;
  //
  rules: Rule[];
  //
  title: string;
  //
  placeholder: string;
  //
  options?: Options[];
  [key: string]: any;
};

type Rule = {
  message: string;
  type?: string;
  min?: number;
  max?: number;
  required?: boolean;
};

type Options = {
  label: string;
  value: string;
};