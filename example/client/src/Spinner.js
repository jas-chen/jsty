import { prop as p, Keyframes } from 'jsty';
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
  p('display')('inline-block'),
  p('animation-name')(spinnerAnimation),
  p('animation-duration')('2s'),
  p('animation-timing-function')('linear'),
  p('animation-iteration-count')('infinite'),
)('div');

export default Spinner;
