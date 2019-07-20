import React from 'react';
import styled, { css } from 'styled-components';

const dismissibleStyles = css`
  padding-right: 3rem;
`;

const CloseBtn = styled.button.attrs({ type: 'button' })`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 24px;
  font-weight: 600;
  color: inherit;
  position: absolute;
  right: 0;
  top: 0;
  padding: 1rem;
  line-height: inherit;
`;

const Toast = styled.div`
  margin: 0.5rem;
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
  line-height: 1rem;

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
`;

export default ({ toastText, dismissible, dismissToast }) => (
  <Toast dismissible={dismissible}>
    <div>{toastText}</div>
    {dismissible && (
      <CloseBtn onClick={dismissToast}>
        <div>&times;</div>
      </CloseBtn>
    )}
  </Toast>
);
