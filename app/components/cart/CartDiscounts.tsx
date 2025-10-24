import {CartForm} from '@shopify/hydrogen';
import {Loader2, Ticket} from 'lucide-react';
import {useState, useRef} from 'react';
import type {FetcherWithComponents} from 'react-router-dom';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
}) {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div className="cart-discounts">
      {/* applied discounts */}
      {codes.length > 0 && <dl></dl>}

      {/* discount input */}
      {showInput ? (
        <UpdateDiscountForm discountCodes={codes}>
          {(fetcher) => {
            // handle loading state
            const isLoading = fetcher.state !== 'idle';

            return (
              <div className="apply-discount">
                <div className="input-container">
                  <input
                    ref={inputRef}
                    type="text"
                    name="discountCode"
                    placeholder="Enter Promo Code"
                    defaultValue=""
                    disabled={isLoading}
                  />
                  {isLoading ? (
                    <div className="loader-container">
                      <Loader2 className="loader" />
                    </div>
                  ) : null}
                </div>

                <div className="button-container">
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={() => {
                      // focus input after applying discount
                      if (inputRef.current) {
                        inputRef.current.focus();
                      }
                    }}
                  >
                    Apply
                  </button>

                  {/* cancel button */}
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowInput(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          }}
        </UpdateDiscountForm>
      ) : (
        <button
          className="show-input-button"
          onClick={() => setShowInput(true)}
        >
          <Ticket /> <span>Add Promo Code</span>
        </button>
      )}
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children:
    | React.ReactNode
    | ((fetcher: FetcherWithComponents<any>) => React.ReactNode);
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

export default CartDiscounts;
