import React from 'react';
import Logo from './svg/logo.svg';
import Default from './img/default.png';
import EmptyProduct from './svg/empty-product.svg';
import NoResult from './img/no-result.png';
import './styles.css';

class Image extends React.Component {
  getImage(type) {
    switch (type) {
      case 'logo':
        return Logo;
      case 'empty-product':
        return EmptyProduct;
      case 'no-result':
        return NoResult;
      default:
        return Default;
    }
  }

  render() {
    const { type, src, className, svgType, height, width } = this.props;

    return (
      <img
        className={className}
        alt=""
        style={{ width, height }}
        src={src || this.getImage(svgType || type)}
      />
    );
  }
}

export default Image;
