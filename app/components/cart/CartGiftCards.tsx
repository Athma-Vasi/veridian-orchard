import {Money, CartForm} from '@shopify/hydrogen';
import {
  CalendarDays,
  CardSim,
  Gift,
  IdCard,
  Loader2,
  Ticket,
  WalletCards,
} from 'lucide-react';
import {useRef, useEffect, useState} from 'react';
import {useFetcher, type FetcherWithComponents} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
}) {
  const [showInput, setShowInput] = useState(false);
  const appliedGiftCardCodes = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const codes: string[] =
    giftCardCodes?.map(({lastCharacters}) => `···· ${lastCharacters}`) ?? [];

  function saveAppliedCode(code: string) {
    if (!inputRef.current) {
      return;
    }

    const formattedCode = code.replace(/\s/g, ''); // Remove spaces
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
    inputRef.current.value = '';
    setShowInput(false);
  }

  return (
    <div className="cart-gift-cards">
      {/* applied discounts */}
      {codes.length > 0 && <dl></dl>}

      {/* discount input */}
      {showInput ? (
        <UpdateGiftCardForm
          giftCardCodes={appliedGiftCardCodes.current}
          saveAppliedCode={saveAppliedCode}
        >
          {(fetcher) => {
            // handle loading state
            const isLoading = fetcher.state !== 'idle';

            return (
              <div className="apply-discount">
                <div className="input-container">
                  <input
                    ref={inputRef}
                    type="text"
                    name="giftCardCode"
                    placeholder="Enter Gift Card Code"
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
        </UpdateGiftCardForm>
      ) : (
        <button
          className="show-input-button"
          onClick={() => setShowInput(true)}
        >
          <WalletCards /> <span>Add Gift Cards</span>
        </button>
      )}
    </div>
  );
}

function UpdateGiftCardForm({
  giftCardCodes,
  saveAppliedCode,
  fetcherKey,
  children,
}: {
  giftCardCodes?: string[];
  saveAppliedCode?: (code: string) => void;
  fetcherKey?: string;
  children:
    | React.ReactNode
    | ((fetcher: FetcherWithComponents<any>) => React.ReactNode);
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        const code = fetcher.formData?.get('giftCardCode');
        if (code && saveAppliedCode) {
          saveAppliedCode(code as string);
        }

        return typeof children === 'function' ? children(fetcher) : children;
      }}
    </CartForm>
  );
}

function RemoveGiftCardForm({
  giftCardId,
  children,
}: {
  giftCardId: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
    </CartForm>
  );
}

export default CartGiftCard;
