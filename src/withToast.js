import React from 'react';
import { Consumer } from './ToastContext';

export default Component => props => (
  <Consumer>{toastContext => <Component {...props} {...toastContext} />}</Consumer>
);
