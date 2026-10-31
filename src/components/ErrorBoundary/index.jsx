import { Component } from 'react';

import { reportUiFailure } from '../../utils/uiFailure';
import { validateProp } from '../../utils/validateProp';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, resetKey: props.resetKey };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.resetKey !== state.resetKey)
      return { error: null, resetKey: props.resetKey };
    return null;
  }

  componentDidCatch(error) {
    reportUiFailure(error);
  }

  retry = () => this.setState({ error: null });

  render() {
    return this.state.error
      ? this.props.renderFallback(this.state.error, this.retry)
      : this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
  resetKey: validateProp('string'),
  renderFallback: validateProp('function', true),
};
