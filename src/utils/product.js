import { get, map, isEmpty } from 'lodash';

function getOrderedOptions(options) {
  if (isEmpty(options)) {
    return;
  }

  return options.sort((a, b) => {
    if (!a.parent_id && !b.parent_id) {
      return 0;
    } else if (!a.parent_id || b.parent_id === a.id) {
      return -1;
    } else if (!b.parent_id || a.parent_id === b.id) {
      return 1;
    }
    return 0;
  });
}

function getOptionValues(option) {
  return option.values
    ? option.values.map((opValue) => ({
        id: opValue.id,
        value: opValue.name,
      }))
    : [];
}

function getOptionProps(option) {
  const defaults = {
    help: option.description,
  };
  switch (option.input_type || 'select') {
    case 'select':
      return {
        id: option.id,
        type: 'select',
        name: option.name,
        options: getOptionValues(option),
        values: option.values,
        variant: option.variant,
        ...defaults,
      };
    case 'toggle':
      return {
        id: option.id,
        type: 'toggle',
        name: option.name,
        defaultValue: undefined,
        defaultChecked: false,
        value: get(option.values, '[0].id', true),
        values: option.values,
        variant: option.variant,
        ...defaults,
      };
    case 'text':
    case 'textarea':
    case 'short_text':
    case 'long_text':
      return {
        id: option.id,
        type:
          option.input_type === 'long_text'
            ? 'textarea'
            : option.input_type === 'short_text'
            ? 'text'
            : option.input_type,
        name: option.name,
        required: option.required,
        placeholder: option.input_hint,
        rows: option.input_type === 'textarea' || option.input_type === 'long_text' ? 2 : undefined,
        variant: option.variant,
        ...defaults,
      };
    default:
      return defaults;
  }
}

export function getDefaultOptionValue(option) {
  const value = get(option, 'values[0]', {});

  switch (option.type) {
    case 'select':
      return {
        id: option.id,
        name: option.name,
        input_type: option.type,
        variant: option.variant,
        value: value.name,
        value_id: value.id,
      };
    case 'toggle':
      return {
        id: option.id,
        name: option.name,
        input_type: option.type,
        variant: option.variant,
        value: false,
        value_id: null,
      };
    case 'textarea':
    case 'text':
      return {
        id: option.id,
        input_type: option.type,
        name: option.name,
        required: option.required,
        value: '',
        value_id: null,
      };
    default:
      return {};
  }
}

export function getOptions(product) {
  const options = getOrderedOptions(product.options);
  return map(options, (option) => getOptionProps(option));
}
