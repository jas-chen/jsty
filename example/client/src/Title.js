import { prop as p, decl } from 'fncss';
import { pad, phone } from './mediaQuery';
import { styled } from './react-utils';

const style = decl(
  p.color('blue'),

  pad(
    p.color('orange')
  ),

  phone(
    p.color('brown')
  )
);

const Title = styled(style)('h1');

export default Title;
