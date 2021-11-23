import { useContext, useRef, useState } from "react";
import styles from "./Checkout.module.css";
import CartContext from "../../store/cart-context";

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);

  const cityRef = useRef();
  const nameRef = useRef();
  const postalRef = useRef();
  const streetRef = useRef();

  const [formValid, setFormValid] = useState(false);

  const [nameValidation, setNameValidation] = useState(true);
  const [streetValidation, setStreetValidation] = useState(true);
  const [postalValidation, setPostalValidation] = useState(true);
  const [cityValidation, setCityValidation] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    if (nameRef.current.value.trim().length < 1) {
      setNameValidation("Please enter a name");
    } else {
      setNameValidation(true);
    }
    if (streetRef.current.value.trim().length < 1) {
      setStreetValidation("Please enter a street");
    } else {
      setStreetValidation(true);
    }
    if (postalRef.current.value.trim().length < 1) {
      setPostalValidation("Please enter a postal code");
    } else if (postalRef.current.value.trim().length > 6) {
      setPostalValidation("Please enter a valid postal code");
    } else {
      setPostalValidation(true);
    }
    if (cityRef.current.value.trim().length < 1) {
      setCityValidation("Please enter a city");
    } else {
      setCityValidation(true);
    }

    if (
      nameValidation &&
      streetValidation &&
      postalValidation &&
      cityValidation
    ) {
      setFormValid(true);
      sendOrder();
    }
  };

  const sendOrder = async () => {
    if (formValid === true) {
      let order = {
        id: Math.floor(Math.random() * 100),
        name: nameRef.current.value,
        street: streetRef.current.value,
        postal: postalRef.current.value,
        city: cityRef.current.value,
        order: cartCtx.items,
      };

      await fetch(
        process.env.REACT_APP_DB_POST_URL,
        {
          method: "POST",
          body: JSON.stringify(order),
        }
      );
      setFormValid(false)
      props.onOrderSent()
    }
  };

  return (
    <form id="Confirm-Order-Form" onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name"></input>
        {nameValidation && <p className={styles.error}>{nameValidation}</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street"></input>
        {streetValidation && <p className={styles.error}>{streetValidation}</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="postal">Postal code</label>
        <input ref={postalRef} type="text" id="postal"></input>
        {postalValidation && <p className={styles.error}>{postalValidation}</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city"></input>
        {cityValidation && <p className={styles.error}>{cityValidation}</p>}
      </div>
    </form>
  );
};

export default Checkout;
