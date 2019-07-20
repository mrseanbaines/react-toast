import React from 'react';
import styled from 'styled-components';

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

export default ({ toastText }) => <Toast>{toastText}</Toast>;
