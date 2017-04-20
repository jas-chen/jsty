import { d, Keyframes } from 'jsty';
import { styled } from './react-utils';

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

export default Spinner;
