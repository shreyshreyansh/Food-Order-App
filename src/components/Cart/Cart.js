import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useApi from "../../hooks/use-api";
import { APP_BACKEND_BASE_URL } from "../../constants";
import HttpMethodTypes from "../../enums/http-method-types";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const hasItems = cartCtx.items.length > 0;

  const { data: id, error, isLoading, sendRequest: postOrder } = useApi();

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1
    });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const confirmOrderHandler = (userData) => {
    postOrder({
      url: `${APP_BACKEND_BASE_URL}/orders.json`,
      method: HttpMethodTypes.POST,
      body: {
        user: userData,
        items: cartCtx.items
      }
    });

    cartCtx.reset();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onCheckoutHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onCheckoutHandler}>
          Order
        </button>
      )}{" "}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onHideCart} onConfirm={confirmOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isLoadingModalContent = <p>Sending order data...</p>;

  const submitSuccessfulContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  const somethingWentWrongContent = (
    <>
      <p>Something went wrong while ordering!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isLoading && !id && !error && cartModalContent}
      {isLoading && isLoadingModalContent}
      {!isLoading && id && !error && submitSuccessfulContent}
      {!isLoading && error && somethingWentWrongContent}
    </Modal>
  );
};

export default Cart;
