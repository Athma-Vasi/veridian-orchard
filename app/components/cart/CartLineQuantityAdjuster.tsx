import type {OptimisticCartLine} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import CartLineUpdateButton from './CartLineUpdateButton';
import CartLineRemoveButton from './CartLineRemoveButton';
import {Minus, Plus} from 'lucide-react';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

type CartLineQuantityAdjusterProps = {
  line: CartLine;
};

function CartLineQuantityAdjuster({line}: CartLineQuantityAdjusterProps) {
  if (line === null || line === undefined || line.quantity === undefined) {
    return null;
  }
  const {id: lineId, quantity, isOptimistic} = line;
  const previousQuantity = Number(quantity - 1 < 0 ? 0 : quantity - 1).toFixed(
    0,
  );
  const nextQuantity = Number(Math.round(quantity) + 1);

  return (
    <div className="cart-line-quantity">
      <CartLineUpdateButton
        lines={[
          {
            id: lineId,
            quantity: Number(previousQuantity),
          },
        ]}
      >
        <button
          aria-label="Decrease quantity"
          className={`minus-button ${quantity <= 1 || !!isOptimistic ? 'disabled' : ''}`}
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={previousQuantity}
        >
          <Minus />
        </button>
      </CartLineUpdateButton>

      <span>{quantity}</span>

      <CartLineUpdateButton
        lines={[
          {
            id: lineId,
            quantity: Number(nextQuantity),
          },
        ]}
      >
        <button
          aria-label="Increase quantity"
          className="plus-button"
          name="increase-quantity"
          value={nextQuantity}
        >
          <Plus />
        </button>
      </CartLineUpdateButton>

      <CartLineRemoveButton
        lineIds={[lineId]}
        disabled={isOptimistic === true}
      ></CartLineRemoveButton>
    </div>
  );
}

export default CartLineQuantityAdjuster;
