import React from 'react';
import { Consumer } from './ToastContext';

export default ({ children }) => (
  <Consumer>
    {toastContext =>
      React.Children.map(children, child =>
        React.cloneElement(child, { ...toastContext })
      )
    }
  </Consumer>
);
