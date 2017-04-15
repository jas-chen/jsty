import { prop as p, sel as s } from 'jsty';
import { styled } from './react-utils';

const Button = styled(
  p('background-color')('#fff'),
  p('border')('1px solid #ddd'),
  s('&:hover')(
    p('background-color')('#eee'),
    p('cursor')('pointer')
  )
)('button');

export default Button;
