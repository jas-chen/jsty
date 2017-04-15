import { prop as p } from 'jsty';
import { pad, phone } from './mediaQuery';
import { styled } from './react-utils';

const Title = styled(
  p('color')('blue'),
  p('user-select')('none'),

  pad(
    p('color')('orange')
  ),

  phone(
    p('color')('brown')
  )
)('h1');

export default Title;
