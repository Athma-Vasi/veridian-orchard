import type {Route} from './+types/collections.all';
import {Link, useLoaderData} from 'react-router';
import {getPaginationVariables, Image, Money} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/ProductItem';
import type {CollectionItemFragment} from 'storefrontapi.generated';

export const meta: Route.MetaFunction = () => {
  return [{title: `Hydrogen | Products`}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const [{products}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {...paginationVariables},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);
  return {products};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="collection">
      {/* hero section */}
      <section className="hero-section">
        <Image
          className="hero-image"
          loading="eager"
          data={{
            url: '/images/pexels-nammau-12034442.jpg',
            width: 1920,
            height: 1080,
            altText: 'Hero Image',
          }}
        />
        <div className="hero-text">
          <h1>Explore Our Curated Collection of Sustainable Products</h1>
          <p>
            Discover a curated selection of houseplants, garden-ready specimens,
            and sustainable plant care essentials. From easy-care indoor greens
            to seasonal outdoor varieties, each plant is chosen for health,
            provenance, and long-term enjoyment — with tips to help them thrive.
          </p>
        </div>
      </section>

      {/* collection navigation */}

      <section className="collection-navigation">
        <div className="left-side">
          <h2>The Collection</h2>
          <p>Showing {products.nodes.length} nurtured plants</p>
        </div>

        <div className="filter-sort-buttons">
          <button>Filter</button>
          <button>Sort</button>
        </div>
      </section>

      {/* products grid */}
      <section className="products-grid">
        <PaginatedResourceSection<CollectionItemFragment>
          connection={products}
          resourcesClassName="products-grid-items"
        >
          {({node: product, index}) => (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 8 ? 'eager' : undefined}
            />
          )}
        </PaginatedResourceSection>
      </section>

      {/* nursery growth */}
      <section className="nursery-growth">
        <Image
          className="left-side-image"
          loading="lazy"
          data={{
            url: '/images/pexels-nanamusic-31665672.jpg',
            altText: 'Nursery Growth Image',
          }}
        />

        <div className="right-side-content">
          <h2>Nurturing Growth, Naturally</h2>
          <p>
            At Veridian Orchard, we believe in cultivating more than just
            plants; we nurture a sustainable future. Our nursery is dedicated to
            eco-friendly practices that promote healthy growth while respecting
            the environment. From organic soil blends to water-wise irrigation,
            every step we take is designed to minimize our carbon footprint and
            maximize the vitality of our plants. Join us in our mission to grow
            a greener tomorrow, one seedling at a time.
          </p>
          <Link to="/about" className="learn-more-cta">
            Learn More ➔
          </Link>
        </div>
      </section>

      {/* heritage banner */}
      <section className="heritage-banner">
        <h2>Our Heritage</h2>
        <p>
          Rooted in a legacy of sustainable cultivation, Veridian Orchard has
          been a pioneer in eco-friendly plant care for over two decades. Our
          commitment to environmental stewardship and community growth defines
          who we are. From our carefully tended nurseries to our educational
          outreach programs, we strive to inspire a deeper connection with
          nature. Join us as we continue to cultivate a greener, more
          sustainable future for generations to come.
        </p>
        <p>Available for private events and workshops.</p>
      </section>
    </div>
  );

  // return (
  //   <div className="collection">
  //     <h1>Products</h1>
  //     <PaginatedResourceSection<CollectionItemFragment>
  //       connection={products}
  //       resourcesClassName="products-grid"
  //     >
  //       {({node: product, index}) => (
  //         <ProductItem
  //           key={product.id}
  //           product={product}
  //           loading={index < 8 ? 'eager' : undefined}
  //         />
  //       )}
  //     </PaginatedResourceSection>
  //   </div>
  // );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    images(first:10){
      nodes {
        id
        altText
        url
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/product
const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
` as const;
