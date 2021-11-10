import styles from "./HeaderCartButton.module.css";
import React, { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnHighlight, setBtnHighlight] = useState(false)
  
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnHighlight ? styles.bump : ""}`;


  useEffect(() => {
    if (items.length === 0) {
      return;
    }
      setBtnHighlight(true)

      const timer = setTimeout(()=> {
        setBtnHighlight(false);
      }, 300);

      return () => {
        clearTimeout(timer)
      }

  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
