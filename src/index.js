import React from 'react';
import Toasts from './Toasts';
import ToastProvider from './ToastProvider';
import ToastConsumer from './ToastConsumer';

export { default as withToast } from './withToast';

export default ({ children, ...props }) => (
  <ToastProvider {...props}>
    <ToastConsumer>
      {children}
      <Toasts />
    </ToastConsumer>
  </ToastProvider>
);
