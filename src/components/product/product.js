import React from 'react';
import cx from 'classnames';
import { isEmpty, map, get } from 'lodash';
import { Icon } from '@contentful/forma-36-react-components';
import ProductImage from './image';
import ProductDescription from './description';
import Select from '../select';
import './styles.css';

export class Product extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { product, onChange } = this.props;
    onChange && onChange(product, value);
  }

  render() {
    const { product, value, className, selected, variantSelection, onClick } = this.props;

    const newDigitalVariants = get(product, 'purchase_options.subscription.plans');
    let variants = product.variants.results;

    if (newDigitalVariants) {
       variants = variants.concat(newDigitalVariants.flat(1));
    }

    return (
      <div
        className={cx('product', className, { selected })}
        onClick={onClick}
        data-id={product.id}
      >
        {selected && <Icon icon="CheckCircle" size="large" className="selected" />}
        <div className="view">
          <ProductImage product={product} height={250} width={250} />
          {variantSelection && !isEmpty(variants) && (
            <Select
              options={map(variants, (variant) => ({
                value: variant.id,
                id: variant.id,
                name: variant.name,
              }))}
              onChange={this.onChange}
              value={value}
            />
          )}
        </div>
        <ProductDescription product={product} />
      </div>
    );
  }
}

export default Product;
