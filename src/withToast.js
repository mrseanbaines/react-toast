import React from 'react';
import ToastConsumer from './ToastConsumer';

export default Component => props => (
  <ToastConsumer>
    <Component {...props} />
  </ToastConsumer>
);
