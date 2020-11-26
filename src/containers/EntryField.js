import React from 'react';
import { isEmpty, findIndex, map, get, split, first, reduce, keys, find } from 'lodash';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import Field from '../components/field';
import { isShortTextField, isShortTextListField } from '../utils/field';
import { getProductsByIds, init } from '../utils/swell-js';

export class EntryField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productIds: [],
    };

    this.initSwell(props);
    this.onOpenDialogClick = this.onOpenDialogClick.bind(this);
    this.onDeleteProduct = this.onDeleteProduct.bind(this);
  }

  async componentDidMount() {
    const {
      sdk: {
        field,
        space: { getEntry },
        ids: { entry: entryId, field: fieldId },
      },
    } = this.props;

    const entry = await getEntry(entryId);
    const productIds = isShortTextField(field)
      ? [get(entry, `fields[${fieldId}].en-US`)]
      : isShortTextListField(field)
      ? get(entry, `fields[${fieldId}].en-US`)
      : [];
    this.fetchProducts(productIds);
    this.setState({ productIds });
  }

  initSwell(props) {
    const installation = get(props, 'sdk.parameters.installation') || {};
    const { storeId, publicKey } = installation;
    init(storeId, publicKey);
  }

  async fetchProducts(productIds) {
    if (isEmpty(productIds)) {
      return;
    }

    const variantIdByProductId = reduce(
      productIds,
      (acc, product) => {
        const [productId, variantId] = split(product, ':', 2);
        acc[productId] = variantId;
        return acc;
      },
      {},
    );
    const products = await getProductsByIds(keys(variantIdByProductId));
    this.setState({
      products: map(products.results, (product) => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        image: get(product, 'images[0].file.url'),
        variantId: variantIdByProductId[product.id],
        variant: get(
          find(get(product, 'variants.results'), { id: variantIdByProductId[product.id] }),
          'name',
        ),
        variants: product.variants,
      })),
    });
  }

  async onOpenDialogClick(options = {}) {
    const { products } = this.state;
    const {
      sdk: {
        dialogs: { openCurrentApp },
      },
    } = this.props;
    const { multiselect = false } = options;

    const result = await openCurrentApp({
      allowHeightOverflow: true,
      position: 'center',
      title: multiselect ? 'Select products' : 'Select a product',
      shouldCloseOnOverlayClick: true,
      shouldCloseOnEscapePress: true,
      parameters: { multiselect, products },
      width: 1400,
    });

    if (result && !isEmpty(result.products)) {
      this.setFieldProducts(result.products);
      this.fetchProducts(result.products);
    }
  }

  onDeleteProduct(id) {
    const { products, productIds } = this.state;
    let index = findIndex(products, { id });

    if (index !== -1) {
      products.splice(index, 1);
      this.setState({ products });
    }

    index = findIndex(productIds, (productId) => id === first(split(productId, ':', 2)));
    if (index !== -1) {
      productIds.splice(index, 1);
      this.setFieldProducts(productIds);
    }
  }

  async setFieldProducts(products) {
    const {
      sdk: {
        space: { getEntry, updateEntry },
        ids: { entry: entryId, field: fieldId },
      },
    } = this.props;

    const entry = await getEntry(entryId);
    entry.fields[fieldId] = { 'en-US': this.getProductsData(products) };
    updateEntry(entry);
    this.setState({ productIds: products });
  }

  getProductsData(products) {
    const {
      sdk: { field },
    } = this.props;

    if (isShortTextField(field)) {
      return first(products);
    } else if (isShortTextListField(field)) {
      return products;
    }
  }

  render() {
    const {
      sdk: { field },
    } = this.props;
    const { products } = this.state;

    return (
      <Field
        field={field}
        products={products}
        onDelete={this.onDeleteProduct}
        onOpenDialog={this.onOpenDialogClick}
      />
    );
  }
}

export default EntryField;
