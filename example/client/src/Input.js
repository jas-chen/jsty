import { prop as p, sel as s } from 'jsty';
import { styled } from './react-utils';

const Input = styled(
  s('&::placeholder')(
    p('color')('pink')
  )
)('input');

export default Input;
