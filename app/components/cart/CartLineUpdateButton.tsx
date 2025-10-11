import {CartForm} from '@shopify/hydrogen';
import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import {Loader2} from 'lucide-react';
import React from 'react';

type CartLineUpdateButtonProps = {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
};

function CartLineUpdateButton({children, lines}: CartLineUpdateButtonProps) {
  const [updating, setUpdating] = React.useState(false);

  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {/* this is a react component */}
      {(fetcher) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
          if (fetcher.state === 'loading' || fetcher.state === 'submitting') {
            setUpdating(true);
          } else if (fetcher.state === 'idle') {
            setTimeout(() => {
              setUpdating(false);
            }, 200);
          }
        }, [fetcher.state]);

        // loading state
        if (updating) {
          return (
            <div className="cart-loading-state-wrapper ">
              <div className="plus-minus-icons">{children}</div>

              <div className="loader-container">
                <Loader2 className="loader" />
              </div>
            </div>
          );
        }

        return children;
      }}
    </CartForm>
  );
}

export default CartLineUpdateButton;
