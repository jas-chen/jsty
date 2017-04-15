import { prop as p, style as createStyle } from 'jsty';
import { pad, phone } from './mediaQuery';
import { styled } from './react-utils';

const style = createStyle(
  p('color')('blue'),
  p('user-select')('none'),

  pad(
    p('color')('orange')
  ),

  phone(
    p('color')('brown')
  )
);

const Title = styled(style)('h1');

export default Title;
