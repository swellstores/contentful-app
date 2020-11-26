import React from 'react';
import { get, ceil } from 'lodash';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import Products from '../components/products';
import { init, getProducts, PRODUCTS_LIMIT } from '../utils/swell-js';

export class ProductsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pages: 0,
      count: 0,
      search: '',
      emptySearchResult: false,
      products: [],
      selected: get(props, 'sdk.parameters.invocation.products', []),
      multiselect: get(props, 'sdk.parameters.invocation.multiselect', false),
      variantSelection: get(props, 'sdk.parameters.installation.variantSelection') === 'true',
    };
    this.initSwell(props);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  initSwell(props) {
    const installation = get(props, 'sdk.parameters.installation') || {};
    const { storeId, publicKey } = installation;
    init(storeId, publicKey);
  }

  async fetchProducts(page = 1, search) {
    const products = await getProducts(page, search).catch((err) =>
      this.props.sdk.dialogs
        .openAlert({ title: 'Error', message: err.message })
        .then(this.props.sdk.close),
    );

    if (!products || !products.results) {
      return;
    }

    this.setState({
      products: products.results,
      count: products.count,
      pages: ceil(products.count / PRODUCTS_LIMIT),
      page,
      search,
      emptySearchResult: !!search && !products.count,
    });
  }

  onPageChange(selectedPage) {
    this.fetchProducts(selectedPage, this.state.search);
  }

  onSearchChange(e) {
    this.fetchProducts(1, get(e, 'target.value'));
  }

  onSubmit(products) {
    this.props.sdk.close({ products });
  }

  render() {
    const {
      products,
      count,
      page,
      pages,
      multiselect,
      variantSelection,
      selected,
      emptySearchResult,
    } = this.state;

    return (
      <Products
        products={products}
        selected={selected}
        count={count}
        page={page}
        pages={pages}
        multiselect={multiselect}
        variantSelection={variantSelection}
        emptySearchResult={emptySearchResult}
        onPageChange={this.onPageChange}
        onSearchChange={this.onSearchChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default ProductsDialog;
