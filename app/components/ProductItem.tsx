import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

export function ProductItem({
  product,
  loading,
  hidePrice,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
  hidePrice?: boolean;
}) {
  const variantUrl = useVariantUrl(product.handle);
  const featuredImage = product.featuredImage;
  const secondImage = product.images.nodes[1];

  return (
    <Link
      key={product.id}
      to={variantUrl}
      className="product-item"
      prefetch="intent"
    >
      {/* image container with hover effects */}
      <div className="product-item-image-container">
        {featuredImage && (
          <Image
            alt={featuredImage.altText || product.title}
            aspectRatio="1/1"
            className="product-item-image primary-image"
            data={featuredImage}
            loading={loading}
            // sizes="(min-width: 45em) 400px, 100vw"
          />
        )}
        {secondImage && (
          <Image
            alt={secondImage.altText || product.title}
            aspectRatio="1/1"
            className="product-item-image secondary-image"
            data={secondImage}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        )}
        {/* overlay on hover */}
        <div className="product-item-image-overlay">
          <p className="product-item-image-overlay-text">View Details</p>
        </div>
      </div>

      {/* product information */}
      <div className="product-information">
        <h4>{product.title}</h4>
        {!hidePrice && product.priceRange && (
          <small>
            <Money data={product.priceRange.minVariantPrice} />
          </small>
        )}
      </div>
    </Link>
  );

  // return (
  //   <Link
  //     className="product-item"
  //     key={product.id}
  //     prefetch="intent"
  //     to={variantUrl}
  //   >
  //     {image && (
  //       <Image
  //         alt={image.altText || product.title}
  //         aspectRatio="1/1"
  //         className="product-item-image"
  //         data={image}
  //         loading={loading}
  //         sizes="(min-width: 45em) 400px, 100vw"
  //       />
  //     )}
  //     <h4>{product.title}</h4>
  //     <small>
  //       <Money data={product.priceRange.minVariantPrice} />
  //     </small>
  //   </Link>
  // );
}
