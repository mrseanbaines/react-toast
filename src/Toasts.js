import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Container = styled.div`
  position: fixed;
  max-width: calc(100% - 2rem);
  bottom: 0;
  right: 0;
`;

const Toast = styled.div`
  margin: 1rem;
  background: lightgreen;
  color: white;
  font-weight: 600;
  opacity: 1;
  pointer-events: 'auto';
  padding: 1rem 2rem;
  z-index: 1;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.25rem;
  transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);

  &.item-exit,
  &.item-enter-active,
  &.item-enter-done {
    opacity: 1;
    transform: translateX(0);
  }

  &.item-exit-active,
  &.item-exit-done,
  &.item-enter {
    opacity: 0;
    transform: translateX(100%);
  }
`;

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount = () => {
    document.body.appendChild(this.el);
  };

  componentWillUnmount = () => {
    document.body.removeChild(this.el);
  };

  render = () => {
    const { toasts } = this.props;

    const component = (
      <Container>
        <TransitionGroup component={null}>
          {toasts.map(({ text, id }) => (
            <CSSTransition key={id} timeout={300} classNames="item">
              <Toast>{text}</Toast>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    );

    return ReactDOM.createPortal(component, this.el);
  };
}
