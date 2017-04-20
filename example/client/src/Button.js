import { d } from 'jsty';
import { styled } from './react-utils';

const Button = styled(
  d({
    backgroundColor: '#fff',
    border: '1px solid #ddd'
  }),
  d(':hover')(
    d({
      backgroundColor: '#eee',
      cursor: 'pointer'
    })
  )
)('button');

export default Button;
