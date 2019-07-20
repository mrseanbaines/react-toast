import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuidv4 from 'uuid/v4';
import Toast from './Toast';
import { Provider } from './ToastContext';
import { delay } from './utils';

const Container = styled.div`
  position: fixed;
  max-width: calc(100% - 2rem);
  padding: 0.5rem;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

class Toasts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toasts: [],
    };

    this.el = document.createElement('div');
  }

  componentDidMount = () => {
    document.body.appendChild(this.el);
  };

  componentWillUnmount = () => {
    document.body.removeChild(this.el);
  };

  addToast = (text, options) => {
    const { autoDismissTimeout, preventAutoDismiss } = this.props;
    const id = uuidv4();

    const newToast = {
      id,
      text,
      autoDismissTimeout,
      preventAutoDismiss,
      ...options,
    };
    console.log(newToast);

    this.setState(prevState => ({
      toasts: [newToast, ...prevState.toasts],
    }));

    if (!newToast.preventAutoDismiss) {
      delay(() => this.dismissToast(id), newToast.autoDismissTimeout);
    }
  };

  dismissToast = id => {
    this.setState(prevState => ({
      toasts: prevState.toasts.filter(toast => toast.id !== id),
    }));
  };

  render = () => {
    const { dismissible, children, renderToast, type } = this.props;
    const { toasts } = this.state;

    const component = (
      <Container>
        <TransitionGroup component={null}>
          {toasts.map(toast => (
            <CSSTransition key={toast.id} timeout={300} classNames="item">
              {renderToast({
                type,
                dismissible,
                dismissToast: () => this.dismissToast(toast.id),
                ...toast,
              })}
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    );

    return (
      <>
        {ReactDOM.createPortal(component, this.el)}

        <Provider
          value={{
            ...this.state,
            addToast: this.addToast,
            dismissToast: this.dismissToast,
          }}
        >
          {children}
        </Provider>
      </>
    );
  };
}

Toasts.defaultProps = {
  autoDismissTimeout: 3000,
  preventAutoDismiss: false,
  dismissible: false,
  renderToast: props => <Toast {...props} />,
  type: 'INFO',
};

export default Toasts;
