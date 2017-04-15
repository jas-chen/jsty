import { prop as p, sel as s, style as createStyle} from 'jsty';
import { styled } from './react-utils';

const style = createStyle(
  s('&::placeholder')(
    p('color')('pink')
  )
);

const Input = styled(style)('input');

export default Input;
