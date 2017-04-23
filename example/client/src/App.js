import React from 'react';
import { d, Keyframes } from 'jsty';
import { pad, phone } from './mediaQuery';
import { styled } from './react-utils';

const Title = styled(
  d({
    color: 'blue',
    userSelect: 'none' // prefixer test
  }),

  pad(
    d({ color: 'orange' })
  ),

  phone(
    d({ color: 'brown' })
  )
)('h1');


const Button = styled(
  d({
    display: 'typo', // you can see a hint in console
    backgroundColor: '#fff',
    border: '1px solid #ddd'
  }),
  d(':hover')(
    d({
      backgroundColor: '#eee',
      cursor: 'grab' // prefixer test
    })
  ),
  d(':typo')(
    d({
      cursor: 'grabbing' // prefixer test
    })
  )
)('button');


const Input = styled(
  d('::placeholder')( // prefixer test
    d({ color: 'pink' })
  )
)('input');


const spinnerAnimation = new Keyframes('spinner', {
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
});

const Spinner = styled(
  d({
    display: 'inline-block',
    animationName: spinnerAnimation,
    animationDuration: '2s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  })
)('div');


export default function App() {
  return (
    <div>
      <Title>You cannot select me!</Title>
      <Button>Click me</Button>
      <Input placeholder="type something"/>
      <Spinner>&lt; 💅 &gt;</Spinner>
    </div>
  );
}
