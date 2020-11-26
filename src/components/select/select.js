import React from 'react';
import { map } from 'lodash';
import { Tooltip, Paragraph, Select, Option } from '@contentful/forma-36-react-components';
import './styles.css';

export class SelectField extends React.Component {
  render() {
    const { label, help, value, onChange, options } = this.props;

    return (
      <>
        {label && (
          <Tooltip content={help} place="top">
            <Paragraph>{label}</Paragraph>
          </Tooltip>
        )}
        <Select
          value={value}
          className="select"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onChange && onChange(e.target.value)}
        >
          {map(options, (option) => (
            <Option key={option.id} id={option.id} value={option.value}>
              {option.name || option.value}
            </Option>
          ))}
        </Select>
      </>
    );
  }
}

export default SelectField;
