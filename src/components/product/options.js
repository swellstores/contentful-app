import React from 'react';
import { map, find } from 'lodash';
import { getOptions } from '../../utils/product';
import Select from '../select';
import Toggle from '../toggle';
import TextField from '../text-field';
import Textarea from '../textarea';

export class ProductOptions extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onChange, product } = this.props;

    return onChange && onChange(product, value);
  }

  render() {
    const { product, values, errors } = this.props;
    const options = getOptions(product);

    return (
      <div className="options" onClick={(e) => e.stopPropagation()}>
        {map(options, (option) => {
          const optionValue = find(values, { id: option.id });
          const value = optionValue && optionValue.value;
          const error = !!find(errors, { product_id: product.id, option_id: option.id });

          switch (option.type) {
            case 'select':
              return (
                <Select
                  key={option.id}
                  label={option.name}
                  help={option.help}
                  options={option.options}
                  error={error}
                  value={value}
                  onChange={(value) =>
                    this.onChange({
                      id: option.id,
                      name: option.name,
                      value,
                    })
                  }
                />
              );
            case 'toggle':
              return (
                <Toggle
                  key={option.id}
                  label={option.name}
                  help={option.help}
                  error={error}
                  value={value}
                  onChange={(value) =>
                    this.onChange({
                      id: option.id,
                      name: option.name,
                      value,
                    })
                  }
                />
              );
            case 'text':
              return (
                <TextField
                  key={option.id}
                  label={option.name}
                  help={option.help}
                  required={option.required}
                  placeholder={option.placeholder}
                  error={error}
                  value={value}
                  onChange={(value) =>
                    this.onChange({
                      id: option.id,
                      name: option.name,
                      value,
                    })
                  }
                />
              );
            case 'textarea':
              return (
                <Textarea
                  key={option.id}
                  label={option.name}
                  help={option.help}
                  required={option.required}
                  placeholder={option.placeholder}
                  rows={option.rows}
                  value={value}
                  error={error}
                  onChange={(value) =>
                    this.onChange({
                      id: option.id,
                      name: option.name,
                      value,
                    })
                  }
                />
              );
            default:
              return <></>;
          }
        })}
      </div>
    );
  }
}

export default ProductOptions;
