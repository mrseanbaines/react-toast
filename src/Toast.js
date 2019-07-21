import React, { memo } from 'react';
import styled, { css } from 'styled-components';

const dismissibleStyles = css`
  padding-right: 3rem;
`;

const toastStyle = type => {
  switch (type) {
    case 'SUCCESS': {
      return 'lightgreen';
    }

    case 'ERROR': {
      return 'lightcoral';
    }

    case 'WARN': {
      return 'tan';
    }

    case 'INFO': {
      return 'lightgrey';
    }

    default: {
      return 'transparent';
    }
  }
};

const CloseBtn = styled.button.attrs({ type: 'button' })`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  color: inherit;
  position: absolute;
  right: 0;
  top: 0;
  padding: 1rem;
  line-height: inherit;

  > div {
    transform: translateY(-0.1em);
  }
`;

const StyledToast = styled.div`
  color: white;
  pointer-events: 'auto';
  padding: 1rem 1.5rem;
  z-index: 1;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.25rem;
  transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  line-height: 1rem;
  margin: 0.5rem 1rem;
  font-size: 1rem;

  :first-child {
    margin-top: 1rem;
  }

  :last-child {
    margin-bottom: 1rem;
  }

  ${({ dismissible }) => dismissible && dismissibleStyles};

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

  background: ${({ type }) => toastStyle(type)};
`;

const Toast = memo(({ text, dismissible, dismissToast, type }) => (
  <StyledToast dismissible={dismissible} type={type}>
    <div>{text}</div>
    {dismissible && (
      <CloseBtn onClick={dismissToast}>
        <div>&times;</div>
      </CloseBtn>
    )}
  </StyledToast>
));

Toast.defaultProps = {
  type: 'INFO',
};

export default Toast;
