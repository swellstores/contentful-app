import React from 'react';
import cx from 'classnames';
import { Tooltip, Paragraph, ToggleButton } from '@contentful/forma-36-react-components';
import './styles.css';

export class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: !!props.value || false,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const { onChange } = this.props;
    const { active } = this.state;
    const value = !active;

    this.setState({ active: value });
    onChange && onChange(value);
  }

  render() {
    const { label, help } = this.props;
    const { active } = this.state;

    return (
      <>
        <Tooltip content={help} place="top">
          <Paragraph>{label}</Paragraph>
        </Tooltip>
        <ToggleButton className={cx('toggle', { active })} onClick={this.onChange} />
      </>
    );
  }
}

export default Toggle;
