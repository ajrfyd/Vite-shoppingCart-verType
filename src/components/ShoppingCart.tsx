import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utilities/formatCurrency';
import storeItem from '../data/item.json';

type ShoppingCartProps = {
  isOpen: boolean;
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {
            cartItems.map(item => <CartItem key={item.id} {...item}/> )
          }
          <div className="ms-auto fw-bold fs-5">
            Total {
              formatCurrency(cartItems.reduce((acc, cur) => acc + (storeItem.find(item => item.id === cur.id).price * cur.quantity), 0))
            }
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart;