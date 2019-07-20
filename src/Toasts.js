import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Toast from './Toast';

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
    const { toasts, dismissible, dismissToast } = this.props;

    const component = (
      <Container>
        <TransitionGroup component={null}>
          {toasts.map(({ text, id }) => (
            <CSSTransition key={id} timeout={300} classNames="item">
              <Toast
                toastText={text}
                dismissible={dismissible}
                dismissToast={() => dismissToast(id)}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    );

    return ReactDOM.createPortal(component, this.el);
  };
}
