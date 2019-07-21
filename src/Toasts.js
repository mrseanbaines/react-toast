import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuidv4 from 'uuid/v4';
import Toast from './Toast';
import { Provider } from './ToastContext';
import { delay } from './utils';

const Container = styled.div`
  pointer-events: none;
  position: fixed;
  display: flex;
  flex-direction: column;

  ${({ originY, originX }) => css`
    align-items: ${originX === 'right' ? 'flex-end' : 'flex-start'};

    ${originY}: 0;
    ${originX}: 0;
  `};

  * {
    pointer-events: auto;
  }

  transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);

  .item-exit,
  .item-enter-active,
  .item-enter-done {
    opacity: 1;
    transform: translateX(0);
  }

  .item-exit-active,
  .item-exit-done,
  .item-enter {
    opacity: 0;

    ${({ originX }) => css`
      transform: translateX(${originX === 'right' ? '100%' : '-100%'});
    `};
  }
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
    const { autoDismissTimeout, preventAutoDismiss, originY } = this.props;
    const id = uuidv4();

    const newToast = {
      id,
      text,
      autoDismissTimeout,
      preventAutoDismiss,
      ...options,
    };

    if (originY === 'bottom') {
      this.setState({
        toasts: [newToast, ...this.state.toasts],
      });
    } else {
      this.setState({
        toasts: [...this.state.toasts, newToast],
      });
    }

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
    const {
      dismissible,
      children,
      renderToast,
      type,
      originY,
      originX,
    } = this.props;
    const { toasts } = this.state;

    const component = (
      <Container originY={originY} originX={originX}>
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
  originY: 'bottom',
  originX: 'right',
};

export default Toasts;
