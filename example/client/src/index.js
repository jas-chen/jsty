import React from 'react';
import ReactDOM from 'react-dom';
import insertStyle from './insertStyle';
import { Provider } from './react-utils';
import App from './App';

ReactDOM.render(
  <Provider insertStyle={insertStyle}>
    <App />
  </Provider>,
  document.getElementById('root')
);
