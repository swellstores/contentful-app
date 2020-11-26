import React from 'react';
import cx from 'classnames';
import { Tooltip, Paragraph, Icon, Button, TextInput } from '@contentful/forma-36-react-components';
import { map, isEmpty, times, find, debounce } from 'lodash';
import Image from '../image';

const IMG_SELECTED_WIDTH = 30;
const IMG_SELECTED_HEIGHT = 30;
const MAX_DISPLAYED_SELECTED_PRODUCTS = 8;

export class Header extends React.Component {
  renderSelectedProduct(product) {
    const { errors } = this.props;

    return (
      <Tooltip key={product.id} content={product.name} place="bottom">
        <div
          className={cx('selected-product', { error: !!find(errors, { product_id: product.id }) })}
        >
          {product.image ? (
            <Image
              src={`${product.image}?padded=true&height=${IMG_SELECTED_HEIGHT}&width=${IMG_SELECTED_WIDTH}`}
            />
          ) : (
            <Image
              svgType="empty-product"
              height={IMG_SELECTED_HEIGHT}
              width={IMG_SELECTED_WIDTH}
            />
          )}
        </div>
      </Tooltip>
    );
  }

  renderRestSelectedProducts() {
    const { selected } = this.props;
    const restNum = selected.length - MAX_DISPLAYED_SELECTED_PRODUCTS;

    return (
      <Tooltip content={`${restNum} more`} place="bottom">
        <div className="selected-product empty">
          <Paragraph>{`+${restNum}`}</Paragraph>
        </div>
      </Tooltip>
    );
  }

  renderSelectedProducts() {
    const { selected } = this.props;

    return (
      !isEmpty(selected) && (
        <div className="selected-products">
          {selected.length > MAX_DISPLAYED_SELECTED_PRODUCTS ? (
            <>
              {times(MAX_DISPLAYED_SELECTED_PRODUCTS, (i) =>
                this.renderSelectedProduct(selected[i]),
              )}
              {this.renderRestSelectedProducts()}
            </>
          ) : (
            map(selected, (productId) => this.renderSelectedProduct(productId))
          )}
        </div>
      )
    );
  }

  render() {
    const { count, selected, multiselect, onSearchChange, onSubmit } = this.props;

    return (
      <div className="header">
        <div className="search-input">
          <Icon className="icon" icon="Search" color="muted" size="medium" />
          <TextInput
            className="input"
            onChange={debounce(onSearchChange, 500, { maxWait: 1000 })}
          />
          {!!count && <Paragraph className="help-text">Total results: {count}</Paragraph>}
        </div>
        {this.renderSelectedProducts()}
        <Button
          disabled={isEmpty(selected)}
          className="save"
          buttonType="primary"
          icon="CheckCircle"
          onClick={onSubmit}
        >
          {multiselect ? 'Save products' : 'Save a product'}
        </Button>
      </div>
    );
  }
}

export default Header;
