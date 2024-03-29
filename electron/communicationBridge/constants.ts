// This file should have no imports as we do not want the renderer process accidentally importing electron

export type CommsAction<T = any> = {
  action: string;
  payload: T;
};

export const mainCommChannelName = 'communication-bridge';

export const customCommandChannelName = 'custom-command';
