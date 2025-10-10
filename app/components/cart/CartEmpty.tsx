import {Link} from 'react-router';
import {useAside} from '../Aside';
import type {CartMainProps} from './CartMain';
import {ArrowRight, ShoppingBag} from 'lucide-react';

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useAside();
  if (hidden) {
    return null;
  }

  return (
    <div className="cart-empty-wrapper">
      {/* icon */}
      <div className="icon-wrapper">
        <div className="icon-container">
          <ShoppingBag className="icon" />
        </div>
      </div>

      {/* content */}
      <div className="cart-empty-content">
        <h2>Your cart is empty</h2>
        <p>
          Discover our wide range of plants, pots, and gardening tools to bring
          life to your space.
        </p>
      </div>

      {/* primary cta */}
      <Link
        to={'/collections/all'}
        onClick={() => close()}
        prefetch="intent"
        className="cart-empty-cta"
      >
        Explore ➔
      </Link>

      {/* collections/all cta */}
      <div className="collections-all-cta">
        <p>Featured Products</p>
        <Link
          to="/collections/all"
          prefetch="intent"
          onClick={() => close()}
          className="link"
        >
          View All ➔
        </Link>
      </div>

      {/* contact info */}
      <div className="contact-info">
        <p>Need help? Contact us</p>
        <p>
          <a href="mailto:support@veridian-orchard.com" className="email-link">
            support@veridian-orchard.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default CartEmpty;
