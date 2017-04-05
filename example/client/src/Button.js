import { prop as p, sel as s, decl } from 'fncss';
import { styled } from './react-utils';

const style = decl(
  p.backgroundColor('#fff'),
  p.border('1px solid #ddd'),
  s.hover(
    p.backgroundColor('#eee'),
    p.cursor('pointer')
  )
);

const Button = styled(style)('button');

export default Button;
