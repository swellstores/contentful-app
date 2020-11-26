import React from 'react';
import { get, map, isEmpty, times, find, findIndex, reduce } from 'lodash';
import {
  SkeletonContainer,
  SkeletonImage,
  SkeletonBodyText,
} from '@contentful/forma-36-react-components';
import Product from '../product';
import { PRODUCTS_LIMIT } from '../../utils/swell-js';
import Image from '../image';
import Pagination from './pagination';
import Header from './header';
import './styles.css';

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: isEmpty(props.products),
      selected: props.selected,
      values: reduce(
        props.selected,
        (acc, product) => {
          if (product.variantId) {
            acc[product.id] = product.variantId;
          }
          return acc;
        },
        {},
      ),
    };

    this.onProductSelect = this.onProductSelect.bind(this);
    this.onChangeProductVariant = this.onChangeProductVariant.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.products !== nextProps.products) {
      this.setState({ isLoading: false });
    }
  }

  onChangeProductVariant(product, variantId) {
    this.setState({ values: { ...this.state.values, [product.id]: variantId } });
  }

  getSelectedProduct(id) {
    const { products } = this.props;
    const product = find(products, { id });
    return (
      product && {
        id,
        sku: product.sku,
        name: product.name,
        image: get(product, 'images[0].file.url'),
        variants: product.variants,
      }
    );
  }

  onProductSelect(event) {
    const id = get(event, 'currentTarget.dataset.id');
    const product = this.getSelectedProduct(id);
    if (!id || !product) {
      return;
    }

    let { selected } = this.state;
    const { multiselect } = this.props;
    if (isEmpty(selected)) {
      return this.setState({ selected: [product] });
    }

    const index = findIndex(selected, { id });
    if (index !== -1) {
      selected.splice(index, 1);
    } else if (multiselect) {
      selected.push(product);
    } else {
      selected = [product];
    }

    this.setState({ selected });
  }

  onSubmit() {
    const { onSubmit, variantSelection } = this.props;
    const { selected, values } = this.state;
    const products = map(selected, (product) => {
      const variantId = values[product.id] || get(product, 'variants.results[0].id');
      return variantId && variantSelection ? `${product.id}:${variantId}` : product.id;
    });

    onSubmit && onSubmit(products);
  }

  renderProduct(product) {
    const { selected, values } = this.state;
    const { variantSelection } = this.props;
    const isSelected = !!find(selected, { id: product.id });

    return (
      <Product
        key={product.id}
        product={product}
        value={values[product.id]}
        selected={isSelected}
        variantSelection={variantSelection}
        onClick={this.onProductSelect}
        onChange={this.onChangeProductVariant}
      />
    );
  }

  renderLoading() {
    return times(PRODUCTS_LIMIT, (i) => (
      <div key={i} className="product">
        <div className="image">
          <SkeletonContainer>
            <SkeletonImage width={400} height={300} />
          </SkeletonContainer>
        </div>
        <div className="description">
          <SkeletonContainer>
            <SkeletonBodyText numberOfLines={5} />
          </SkeletonContainer>
        </div>
      </div>
    ));
  }

  renderProducts() {
    const { isLoading } = this.state;
    const { products } = this.props;

    return isLoading
      ? this.renderLoading()
      : map(products, (product) => this.renderProduct(product));
  }

  renderResults() {
    const { emptySearchResult } = this.props;

    return emptySearchResult ? (
      <Image type="no-result" className="no-result" />
    ) : (
      <div className="products">{this.renderProducts()}</div>
    );
  }

  render() {
    const { selected, errors, isLoading } = this.state;
    const { count, pages, page, multiselect, onPageChange, onSearchChange } = this.props;

    return (
      <div className="dialog">
        <Header
          count={count}
          selected={selected}
          errors={errors}
          multiselect={multiselect}
          onSearchChange={(value) => {
            this.setState({ isLoading: true });
            onSearchChange && onSearchChange(value);
          }}
          onSubmit={this.onSubmit}
        />
        <div className="results">
          {this.renderResults()}
          {!isLoading && pages > 1 && (
            <Pagination
              pages={pages}
              page={page}
              onChange={(selectedPage) => {
                this.setState({ isLoading: true });
                onPageChange && onPageChange(selectedPage);
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Products;
