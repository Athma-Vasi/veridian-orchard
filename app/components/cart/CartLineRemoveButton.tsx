import {CartForm} from '@shopify/hydrogen';
import {Delete, DeleteIcon, Trash, Trash2, X} from 'lucide-react';

type CartLineRemoveButtonProps = {
  lineIds: string[];
  disabled?: boolean;
};

function CartLineRemoveButton({
  lineIds,
  disabled = false,
}: CartLineRemoveButtonProps) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        className={`remove-button ${disabled ? 'disabled' : ''}`}
        disabled={disabled}
        type="submit"
      >
        <X />
      </button>
    </CartForm>
  );
}

export default CartLineRemoveButton;
