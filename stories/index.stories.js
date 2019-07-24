/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import ReactToast, { withToast } from '../src';
import {
  SUCCESS, ERROR, WARN, INFO, TOP, LEFT,
} from '../src/constants';

const stories = storiesOf('Toasts', module);

const randomLorem = () => {
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const lorem = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui quia accusantium suscipit aperiam similique dolore itaque veniam.';
  const words = lorem
    .replace(',', '')
    .replace('.', '')
    .split(' ');
  const startIndex = randomInt(0, words.length / 2);
  const endIndex = startIndex + randomInt(3, 10);
  const sentence = words.slice(startIndex, endIndex).join(' ');

  return sentence[0].toUpperCase() + sentence.substring(1, sentence.length);
};

const StyledCustomToast = styled.div`
  padding: 0.5rem 1rem;
  background: white;
  border: 1px dashed plum;
  color: plum;
  border-radius: 4px;
  margin: 0.25rem 0.5rem;

  :first-child {
    margin-top: 0.5rem;
  }

  :last-child {
    margin-bottom: 0.5rem;
  }
`;

const MyCustomToast = ({ text }) => <StyledCustomToast>{text}</StyledCustomToast>;

const Button = withToast(props => (
  <button type="button" onClick={() => props.showToast(randomLorem())}>
    Show toast
  </button>
));

stories.add('default', () => (
  <ReactToast>
    <Button />
  </ReactToast>
));

stories.add('with 1000ms auto-dismiss timeout', () => (
  <ReactToast autoDismissTimeout={1000}>
    <Button />
  </ReactToast>
));

stories.add('with no auto-dismiss', () => (
  <ReactToast preventAutoDismiss>
    <Button />
  </ReactToast>
));

stories.add('with dismiss button', () => (
  <ReactToast dismissible>
    <Button />
  </ReactToast>
));

stories.add('with custom toast component', () => (
  <ReactToast
    renderToast={props => {
      console.log(props);

      return <MyCustomToast {...props} />;
    }}
  >
    <Button />
  </ReactToast>
));

stories.add('with success type', () => (
  <ReactToast type={SUCCESS}>
    <Button />
  </ReactToast>
));

stories.add('with error type', () => (
  <ReactToast type={ERROR}>
    <Button />
  </ReactToast>
));

stories.add('with warn type', () => (
  <ReactToast type={WARN}>
    <Button />
  </ReactToast>
));

stories.add('with info type', () => (
  <ReactToast type={INFO}>
    <Button />
  </ReactToast>
));

stories.add('with originY top', () => (
  <ReactToast originY={TOP}>
    <Button />
  </ReactToast>
));

stories.add('with originX left', () => (
  <ReactToast originX={LEFT}>
    <Button />
  </ReactToast>
));
