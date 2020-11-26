import React from 'react';
import { DisplayText, Paragraph } from '@contentful/forma-36-react-components';

export class ProductDescription extends React.Component {
  render() {
    const { product } = this.props;

    return (
      <div className="description">
        <DisplayText className="name">{product.name}</DisplayText>
        <Paragraph className="sku">{product.sku}</Paragraph>
      </div>
    );
  }
}

export default ProductDescription;
