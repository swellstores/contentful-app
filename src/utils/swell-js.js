import swell from 'swell-js';

export const PRODUCTS_LIMIT = 20;

export const init = (id, key) => swell.init(id, key);
export const getProducts = async (page, search) =>
  swell.products.list({
    limit: PRODUCTS_LIMIT,
    page: page || 1,
    ...(search ? { search } : {}),
    expand: ['variants:0'],
  });
export const getProductsByIds = async (ids) =>
  swell.products.list({ id: { $in: ids }, expand: ['variants:0'] });
