import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  SUCCESS, ERROR, WARN, INFO,
} from './constants';

const dismissibleStyles = css`
  padding-right: 3rem;
`;

const toastStyle = type => {
  switch (type) {
    case SUCCESS: {
      return 'lightgreen';
    }

    case ERROR: {
      return 'lightcoral';
    }

    case WARN: {
      return 'burlywood';
    }

    case INFO: {
      return 'lightslategray;';
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
  line-height: 1rem;
  font-size: 1rem;
  background: ${({ type }) => toastStyle(type)};
  position: relative;
  margin: 0.5rem 1rem;

  :first-child {
    margin-top: 1rem;
  }

  :last-child {
    margin-bottom: 1rem;
  }

  ${({ dismissible }) => dismissible && dismissibleStyles};
`;

const Toast = memo(({
  text, dismissible, dismissToast, type,
}) => (
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
  dismissible: false,
  dismissToast: () => {},
  type: 'INFO',
};

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  dismissible: PropTypes.bool,
  dismissToast: PropTypes.func,
  type: PropTypes.oneOf([SUCCESS, ERROR, WARN, INFO]),
};

export default Toast;
