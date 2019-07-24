import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuidv4 from 'uuid/v4';
import Toast from './Toast';
import { Provider } from './ToastContext';
import { delay } from './utils';
import {
  SUCCESS, ERROR, WARN, INFO, TOP, RIGHT, BOTTOM, LEFT,
} from './constants';

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  pointer-events: none;
  position: fixed;
  display: flex;
  flex-direction: column;

  ${({ originY, originX }) => css`
    align-items: ${originX === RIGHT ? 'flex-end' : 'flex-start'};

    ${originY}: 0;
    ${originX}: 0;
  `};

  * {
    pointer-events: auto;
  }

  .item-exit,
  .item-enter-active,
  .item-enter-done {
    transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 1;
    transform: translateX(0);
  }

  .item-exit-active,
  .item-exit-done,
  .item-enter {
    transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;

    ${({ originX }) => css`
      transform: translateX(${originX === RIGHT ? '100%' : '-100%'});
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

  showToast = (text, options) => {
    const {
      autoDismissTimeout, preventAutoDismiss, dismissible, type, originY,
    } = this.props;

    const id = uuidv4();

    const newToast = {
      id,
      text,
      autoDismissTimeout,
      preventAutoDismiss,
      dismissible,
      type,
      dismissToast: () => this.dismissToast(id),
      ...options,
    };

    if (originY === BOTTOM) {
      this.setState(prevState => ({
        toasts: [newToast, ...prevState.toasts],
      }));
    } else {
      this.setState(prevState => ({
        toasts: [...prevState.toasts, newToast],
      }));
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
      children, renderToast, originY, originX,
    } = this.props;
    const { toasts } = this.state;

    const component = (
      <Container originY={originY} originX={originX}>
        <TransitionGroup component={null}>
          {toasts.map(toast => (
            <CSSTransition key={toast.id} timeout={300} classNames="item">
              {renderToast(toast)}
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    );

    return (
      <>
        {ReactDOM.createPortal(component, this.el)}

        <Provider value={{ toasts, showToast: this.showToast }}>{children}</Provider>
      </>
    );
  };
}

Toasts.defaultProps = {
  autoDismissTimeout: 3000,
  preventAutoDismiss: false,
  dismissible: false,
  renderToast: props => <Toast {...props} />,
  type: INFO,
  originY: BOTTOM,
  originX: RIGHT,
};

Toasts.propTypes = {
  autoDismissTimeout: PropTypes.number,
  preventAutoDismiss: PropTypes.bool,
  dismissible: PropTypes.bool,
  renderToast: PropTypes.func,
  type: PropTypes.oneOf([SUCCESS, ERROR, WARN, INFO]),
  originY: PropTypes.oneOf([TOP, BOTTOM]),
  originX: PropTypes.oneOf([LEFT, RIGHT]),
  children: PropTypes.element.isRequired,
};

export default Toasts;
