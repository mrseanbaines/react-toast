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
    const { autoDismissTimeout, preventAutoDismiss } = this.props;
    const id = uuidv4();

    this.setState(prevState => ({
      toasts: [{ id, text }, ...prevState.toasts],
    }));

    if (!preventAutoDismiss) {
      delay(() => this.removeToast(id), autoDismissTimeout);
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
      <Provider
        value={{
          ...this.state,
          addToast: this.addToast,
          dismissToast: this.removeToast,
        }}
      >
        {children}
      </Provider>
    );
  }
}

ToastProvider.defaultProps = {
  autoDismissTimeout: 3000,
  preventAutoDismiss: false,
  dismissible: false,
};

export default ToastProvider;
