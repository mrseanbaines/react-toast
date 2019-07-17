import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

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
  transition: all 300ms;
`;

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.el = document.createDocumentFragment();
  }

  componentDidMount = () => {
    document.body.appendChild(this.el);
  };

  componentWillUnmount = () => {
    document.body.removeChild(this.el);
  };

  render = () => {
    const { toasts } = this.props;

    return ReactDOM.createPortal(
      <Container>
        {toasts.map((toast, i) => (
          <Toast key={i}>{toast}</Toast>
        ))}
      </Container>,
      this.el
    );
  };
}
