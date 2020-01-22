export type GlobalState = any;

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => any | Promise<any>;

/**
 * Message
 */
export interface Message {

}

export type MessageType = 'success' | 'error' | 'warn' | 'info' | 'loading';

export type NotificationContent = {
  message: string;
  description?: string;
  type?: string;
  placement?: string;
  duration?: number;
}