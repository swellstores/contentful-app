import React from 'react';
import cx from 'classnames';
import { Tooltip, Paragraph, TextInput } from '@contentful/forma-36-react-components';
import './styles.css';

export class TextField extends React.Component {
  render() {
    const { label, help, placeholder, value, required, onChange, error } = this.props;

    return (
      <>
        <Tooltip content={help} place="top">
          <Paragraph>{`${label}${required ? ' (Required)' : ' (Optional)'}`}</Paragraph>
        </Tooltip>
        <TextInput
          className={cx('text-field', { error })}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </>
    );
  }
}

export default TextField;
