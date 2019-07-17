import React, { PureComponent } from 'react';
import { Provider } from './ToastContext';
import uuidv4 from 'uuid/v4';
import { delay } from './utils';

class ToastProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toasts: [],
    };
  }

  addToast = text => {
    const { toastLifeTime, preventAutoDismiss } = this.props;
    const id = uuidv4();

    this.setState(prevState => ({
      toasts: [...prevState.toasts, { id, text }],
    }));

    if (!preventAutoDismiss) {
      delay(() => this.removeToast(id), toastLifeTime);
    }
  };

  removeToast = id => {
    this.setState(prevState => ({
      toasts: prevState.toasts.filter(toast => toast.id !== id),
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

ToastProvider.defaultProps = {
  toastLifeTime: 3000,
  preventAutoDismiss: false,
};

export default ToastProvider;
