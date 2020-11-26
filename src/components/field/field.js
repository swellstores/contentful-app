import React from 'react';
import { map, isEmpty } from 'lodash';
import { Note, Button } from '@contentful/forma-36-react-components';
import { isShortTextField, isShortTextListField } from '../../utils/field';
import Image from '../image';
import Product from './product';
import './styles.css';

class Field extends React.Component {
  renderProducts() {
    const { products, onDelete } = this.props;

    return (
      !isEmpty(products) && (
        <div className="products">
          {map(products, (product) => (
            <Product key={product.id} product={product} onDelete={onDelete} />
          ))}
        </div>
      )
    );
  }

  render() {
    const { field, onOpenDialog } = this.props;

    return (
      <div className="entry-field">
        {this.renderProducts()}
        <div className="actions">
          <Image svgType="logo" width={30} height={30} />
          {isShortTextListField(field) ? (
            <Button
              buttonType="muted"
              size="small"
              icon="ShoppingCart"
              onClick={() => onOpenDialog({ multiselect: true })}
            >
              Select products
            </Button>
          ) : isShortTextField(field) ? (
            <Button
              buttonType="muted"
              size="small"
              icon="ShoppingCart"
              onClick={() => onOpenDialog()}
            >
              Select a product
            </Button>
          ) : (
            <Note noteType="warning">Wrong field type</Note>
          )}
        </div>
      </div>
    );
  }
}

export default Field;
