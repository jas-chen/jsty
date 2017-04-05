import React from 'react';
import ReactDOM from 'react-dom';
import { createInsertCSS, createStyleSheet } from 'jsty';
import { phone, pad } from './mediaQuery';
import { Provider } from './react-utils';
import App from './App';

const insertCSS = createInsertCSS({
    mediaOrder: [
      'all',
      pad.query,
      phone.query
    ]
});

const styleSheet = createStyleSheet();
const css = insertCSS(styleSheet);

ReactDOM.render(
  <Provider css={css}>
    <App />
  </Provider>,
  document.getElementById('root')
);
