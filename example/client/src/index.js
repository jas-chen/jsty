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


// Insert some global css, yeah!
styleSheet.insert('all', `@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v15/oMMgfZMQthOryQo9n22dcuvvDin1pK8aKteLpeZ5c0A.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}`);

styleSheet.insert('all', 'body', 'font-family: Roboto, sans-serif;');


const css = insertCSS(styleSheet);

ReactDOM.render(
  <Provider css={css}>
    <App />
  </Provider>,
  document.getElementById('root')
);
