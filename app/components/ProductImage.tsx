import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';
import {Fragment, useRef, useState, useEffect, useMemo} from 'react';

type ProductImageProps = {
  selectedVariantImage: ProductVariantFragment['image'];
  galleryImages: {
    nodes: {
      id?: string | null;
      url: string;
      altText?: string | null;
      width?: number | null;
      height?: number | null;
    }[];
  };
};

function ProductImage({
  selectedVariantImage,
  galleryImages,
}: ProductImageProps) {
  const [selectedImage, setSelectedImage] = useState(
    selectedVariantImage ?? galleryImages?.nodes[0],
  );

  return (
    <div className="product-image">
      <section className="image-gallery">
        <Image
          alt={selectedImage?.altText || 'Product Image'}
          aspectRatio="1/1"
          data={selectedImage}
          key={selectedImage?.id}
          // sizes="(min-width: 45em) 50vw, 100vw"
          className="main-image"
        />

        <div className="thumbnails-container">
          {galleryImages?.nodes.map((image, index) => (
            <Fragment key={image.id ?? index}>
              <button
                className={`thumbnail-button ${
                  selectedImage?.id === image.id ? 'selected' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  alt={image.altText || `Thumbnail ${index + 1}`}
                  aspectRatio="1/1"
                  data={image}
                  // sizes="80px"
                  className="thumbnail-image"
                />
              </button>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductImage;
