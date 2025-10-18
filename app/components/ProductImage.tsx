import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

type ProductImageProps = {
  selectedVariantImage: ProductVariantFragment['image'];
  // galleryImages: {
  //   id?: string | null;
  //   url: string;
  //   altText?: string | null;
  //   width?: number | null;
  //   height?: number | null;
  // }[];
};

export function ProductImage({
  selectedVariantImage,
  // galleryImages,
}: ProductImageProps) {
  if (!selectedVariantImage) {
    return <div className="product-image" />;
  }

  return (
    <div className="product-image">
      <Image
        alt={selectedVariantImage.altText || 'Product Image'}
        aspectRatio="1/1"
        data={selectedVariantImage}
        key={selectedVariantImage.id}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    </div>
  );
}
