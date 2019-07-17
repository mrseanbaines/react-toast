import React, { PureComponent } from 'react';
import { Provider } from './ToastContext';

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toasts: [],
    };
  }

  addToast = newToast => {
    this.setState(prevState => ({
      toasts: [...prevState.toasts, newToast],
    }));
  };

  render() {
    const { children } = this.props;

    return (
      <Provider value={{ ...this.state, addToast: this.addToast }}>
        {children}
      </Provider>
    );
  }
}
