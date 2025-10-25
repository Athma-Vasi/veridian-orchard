import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/cart/CartMain';
import {
  CartForm,
  Money,
  ShopPayButton,
  type OptimisticCart,
} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {useFetcher} from 'react-router';
import type {FetcherWithComponents} from 'react-router';
import {
  BugPlay,
  CreditCard,
  CreditCardIcon,
  Gift,
  LucideShoppingBag,
} from 'lucide-react';
import CartDiscounts from './CartDiscounts';
import CartGiftCard from './CartGiftCards';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  return (
    <div className="cart-summary">
      {/* subtotals */}
      <dl className="subtotals">
        <dt>Subtotal</dt>
        <dd>
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart?.cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>

      {/* discounts */}
      <CartDiscounts discountCodes={cart?.discountCodes} />

      {/* gift cards */}
      <CartGiftCard giftCardCodes={cart?.appliedGiftCards} />

      {/* extra info */}
      <div className="extra-info">
        <div>
          <Gift className="icon" />
          <span>Complimentary gift wrapping available</span>
        </div>

        <div>
          <CreditCard className="icon" />
          <span>Secure checkout powered by Shopify</span>
        </div>
      </div>
    </div>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  if (!checkoutUrl) return null;

  return (
    <div>
      <a href={checkoutUrl} target="_self">
        <p>Continue to Checkout &rarr;</p>
      </a>
      <br />
    </div>
  );
}
