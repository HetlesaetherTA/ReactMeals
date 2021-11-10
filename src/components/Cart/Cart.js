import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout2";

const Cart = (props) => {
  const [orderStatus, setOrderStatus] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemove.bind(null, item.id)}
          onAdd={cartItemAdd.bind(null, item)}
        />
      ))}
    </ul>
  );

  const buttonClickHandler = () => {
    setOrderStatus(true);
  };

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderStatus && <Checkout />}
      <div className={styles.actions}>
        {!orderStatus ? (
          <button className={styles["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        ) : (
          <button className={styles["button--alt"]} onClick={props.onClose}>
            Cancel
          </button>
        )}
        {hasItems && !orderStatus && (
          <button onClick={buttonClickHandler} className={styles.button}>
            Order
          </button>
        )}
        {hasItems && orderStatus && (
          <button type="submit" form="Confirm-Order-Form" className={styles.button}>
            Confirm
          </button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;
