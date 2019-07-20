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

  render = () => {
    const { dismissible, children } = this.props;
    const { toasts } = this.state;

    const component = (
      <Container>
        <TransitionGroup component={null}>
          {toasts.map(({ text, id }) => (
            <CSSTransition key={id} timeout={300} classNames="item">
              <Toast
                toastText={text}
                dismissible={dismissible}
                dismissToast={() => this.removeToast(id)}
              />
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
            dismissToast: this.removeToast,
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
};

export default Toasts;
