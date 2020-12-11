import React from 'react';
import { get } from 'lodash';
import Image from '../image';

const IMG_WIDTH = 200;
const IMG_HEIGHT = 200;

export class ProductImage extends React.Component {
  render() {
    const { product, width, height } = this.props;
    const image = get(product, 'images[0].file.url');

    return (
      <div className="image">
        {image ? (
          <Image
            src={`${image}?padded=true&height=${height || IMG_HEIGHT}&width=${width || IMG_WIDTH}`}
          />
        ) : (
          <Image type="empty-product" height={height || IMG_HEIGHT} width={width || IMG_WIDTH} />
        )}
      </div>
    );
  }
}

export default ProductImage;
