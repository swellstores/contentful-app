import React from 'react';
import cx from 'classnames';
import { Tooltip, Paragraph, Textarea } from '@contentful/forma-36-react-components';
import './styles.css';

export class TextareaField extends React.Component {
  render() {
    const { label, help, placeholder, value, required, rows, onChange, error } = this.props;

    return (
      <>
        <Tooltip content={help} place="top">
          <Paragraph>{`${label}${required ? ' (Required)' : ' (Optional)'}`}</Paragraph>
        </Tooltip>
        <Textarea
          className={cx('textarea', { error })}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </>
    );
  }
}

export default TextareaField;
