import { prop as p, decl } from 'fncss';
import { styled } from './react-utils';
import { pad, phone } from './mediaQuery';

const style = decl(
  p.color('blue'),

  pad(
    p.color('orange')
  ),

  phone(
    p.color('brown')
  )
);

const Title = styled(style, 'h1');

export default Title;
