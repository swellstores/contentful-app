import React from 'react';
import { reduce, split } from 'lodash';
import ConfigForm from '../components/config-form';
import validate from '../utils/validation';

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = { parameters: {}, ids: props.sdk.ids || {}, contentTypes: {}, errors: {} };
    this.onConfigure = this.onConfigure.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    const { sdk } = this.props;
    sdk.app.onConfigure(this.onConfigure);

    this.setState(
      {
        parameters: (await sdk.app.getParameters()) || {},
        contentTypes: (await sdk.space.getContentTypes()) || {},
      },
      () => sdk.app.setReady(),
    );
  }

  async onConfigure() {
    const { parameters, ids } = this.state;

    if (!parameters.storeId || !parameters.publicKey) {
      return false;
    }

    return {
      parameters,
      targetState: {
        EditorInterface: reduce(
          parameters,
          (acc, value, key) => {
            const [contentType, fieldId] = split(key, '.', 2);
            if (value !== 'true' || !contentType || !fieldId) {
              return acc;
            }

            const field = { fieldId, widgetId: ids.app, widgetNamespace: 'app' };

            if (acc[contentType]) {
              acc[contentType].controls.push(field);
            } else {
              acc[contentType] = {
                controls: [field],
              };
            }

            return acc;
          },
          {},
        ),
      },
    };
  }

  onChange(e) {
    const target = e.target;
    if (!target || !target.name) {
      return;
    }
    const { name, value } = target;
    const error = validate(name, value);

    this.setState({
      parameters: {
        ...this.state.parameters,
        [name]: error ? null : value,
      },
      errors: {
        ...this.state.errors,
        [name]: error,
      },
    });
  }

  render() {
    const { parameters, ids, contentTypes, errors } = this.state;

    return (
      <ConfigForm
        ids={ids}
        parameters={parameters}
        contentTypes={contentTypes}
        errors={errors}
        onChange={this.onChange}
      />
    );
  }
}

export default Config;
