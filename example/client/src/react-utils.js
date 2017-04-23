import React, { Children } from 'react';
import PropTypes from 'prop-types';

const contextPropTypes = { dispatch: PropTypes.func.isRequired };
const styledCompPropTypes = { className: PropTypes.string };

export class Provider extends React.Component {
  getChildContext() {
    // compatible with react-redux API so that you can replace it with <Provider> from react-redux
    return { dispatch: this.props.insertStyle }
  }

  render() {
    return Children.only(this.props.children);
  }
}

Provider.propTypes = { insertStyle: PropTypes.func.isRequired };
Provider.childContextTypes = contextPropTypes;


export function styled() {
  const style = arguments.length > 1 ? Array.prototype.concat.apply([], arguments) : arguments[0];

  return function attachStyle(Component) {
    class StyledComponent extends React.PureComponent {
      render() {
        const { props } = this;
        const className = props.hasOwnProperty('className')
          ? `${this.context.dispatch(style)} ${props.className}`
          : this.context.dispatch(style);

        return React.createElement(Component, Object.assign({}, props, { className }));
      }
    }

    StyledComponent.displayName = 'Styled';
    StyledComponent.propTypes = styledCompPropTypes;
    StyledComponent.contextTypes = contextPropTypes;
    return StyledComponent;
  }
}
