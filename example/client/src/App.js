import React, { Component } from 'react';
import { props as p, sel, media, toDeclArray } from 'fncss';
import { createGetClassName, createSheet } from 'jsty';

const PHONE = 'screen and (device-width: 320px) and (device-height: 640px)';
const PAD = 'screen and (min-device-width: 768px) and (max-device-width: 1024px)';

const getClassName = createGetClassName({
    calculateRule: (prop, val) => `${prop}:${val};`,
    mediaOrder: [
      'all',
      PAD,
      PHONE
    ]
})(createSheet());

const phone = media(PHONE);
const pad = media(PAD);
const hover = sel(':hover');

const decls = toDeclArray(
  p.color('blue'),
  hover(
    p.color('red')
  ),
  phone(
    p.color('orange')
  ),
  pad(
    p.color('pink')
  )
);

class App extends Component {
  render() {
    return (
      <div>
        <div className={getClassName(decls)}>
          123
        </div>
        <div className={getClassName(decls)}>
          456
        </div>
      </div>
    );
  }
}

export default App;
