import { d } from 'jsty';
import { styled } from './react-utils';

const Input = styled(
  d('::placeholder')(
    d({ color: 'pink' })
  )
)('input');

export default Input;
