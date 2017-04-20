import { d } from 'jsty';
import { pad, phone } from './mediaQuery';
import { styled } from './react-utils';

const Title = styled(
  d({
    color: 'blue',
    userSelect: 'none'
  }),

  pad(
    d({ color: 'orange' })
  ),

  phone(
    d({ color: 'brown' })
  )
)('h1');

export default Title;
