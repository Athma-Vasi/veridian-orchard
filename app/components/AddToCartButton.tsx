import {type FetcherWithComponents} from 'react-router';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import {useEffect, useState} from 'react';
import {Check, Loader2, ShoppingBag} from 'lucide-react';

export function AddToCartButton({
  analytics,
  afterAddToCart,
  children,
  disabled,
  lines,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  afterAddToCart?: () => void;
}) {
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (addedToCart) {
      timeout = setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [addedToCart]);

  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => {
        const isLoading =
          fetcher.state === 'loading' || fetcher.state === 'submitting';

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (
            fetcher.state === 'idle' &&
            fetcher.data &&
            !fetcher.data.errors
          ) {
            if (afterAddToCart) {
              afterAddToCart();
            }
            setAddedToCart(true);
          }
        }, [fetcher.state, fetcher.data]);

        return (
          <>
            <input
              name="analytics"
              type="hidden"
              value={JSON.stringify(analytics)}
            />
            <button
              className="add-to-cart-button"
              type="submit"
              disabled={disabled ?? isLoading}
            >
              {addedToCart ? (
                <>
                  <Check />
                  <span>Added!</span>
                </>
              ) : isLoading ? (
                <>
                  <Loader2 className="loader" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingBag />
                  <span>{children}</span>
                </>
              )}
            </button>
          </>
        );
      }}
    </CartForm>
  );
}
