import React, { PropTypes, Children } from 'react';

const contextPropTypes = { insertStyle: PropTypes.func };
const styledCompPropTypes = { className: PropTypes.string };

export class Provider extends React.Component {
  getChildContext() {
    return { insertStyle: this.props.insertStyle }
  }

  render() {
    return Children.only(this.props.children);
  }
}

Provider.propTypes = contextPropTypes;
Provider.childContextTypes = contextPropTypes;


export function styled() {
  const style = Array.prototype.concat.apply([], arguments);

  return function attachStyle(Component) {
    class StyledComponent extends React.PureComponent {
      render() {
        const { className, ...restProps } = this.props;

        return className
          ? <Component className={`${this.context.insertStyle(style)} ${className}`} {...restProps} />
          : <Component className={this.context.insertStyle(style)} {...restProps} />;
      }
    }

    StyledComponent.propTypes = styledCompPropTypes;
    StyledComponent.contextTypes = contextPropTypes;
    return StyledComponent;
  }
}
