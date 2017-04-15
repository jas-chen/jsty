import { prop as p, sel as s, style as createStyle} from 'jsty';
import { styled } from './react-utils';

const style = createStyle(
  p('background-color')('#fff'),
  p('border')('1px solid #ddd'),
  s('&:hover')(
    p('background-color')('#eee'),
    p('cursor')('pointer')
  )
);

const Button = styled(style)('button');

export default Button;
