import React, { PropTypes, Children } from 'react';

// property name in context
const CSS = 'css';

const contextPropTypes = { [CSS]: PropTypes.func };
const styledCompPropTypes = { className: PropTypes.string };

export class Provider extends React.Component {
  getChildContext() {
    return { [CSS]: this.props.css }
  }

  render() {
    return Children.only(this.props.children);
  }
}

Provider.propTypes = contextPropTypes;
Provider.childContextTypes = contextPropTypes;


export function styled(decls) {
  return function attachStyle(Component) {
    class StyledComponent extends React.PureComponent {
      render() {
        const { className, ...restProps } = this.props;

        return className
          ? <Component className={`${this.context[CSS](decls)} ${className}`} {...restProps} />
          : <Component className={this.context[CSS](decls)} {...restProps} />;
      }
    }

    StyledComponent.propTypes = styledCompPropTypes;
    StyledComponent.contextTypes = contextPropTypes;
    return StyledComponent;
  }
}
