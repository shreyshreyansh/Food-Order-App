import { useCallback, useRef } from "react";
import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const isNotEmpty = useCallback((text) => {
    return text && text.trim().length > 0;
  }, []);

  const isFiveChars = useCallback((text) => {
    return text && text.trim().length === 5;
  }, []);

  const {
    value: name,
    isValid: isNameValid,
    isTouched: isNameTouched,
    onKeyStroke: onNameKeyStroke,
    checkIfValid: checkIfNameValid
  } = useInput();
  const {
    value: street,
    isValid: isStreetValid,
    isTouched: isStreetTouched,
    onKeyStroke: onStreetKeyStroke,
    checkIfValid: checkIfStreetValid
  } = useInput();
  const {
    value: postal,
    isValid: isPostalValid,
    isTouched: isPostalTouched,
    onKeyStroke: onPostalKeyStroke,
    checkIfValid: checkIfPostalValid
  } = useInput();
  const {
    value: city,
    isValid: isCityValid,
    isTouched: isCityTouched,
    onKeyStroke: onCityKeyStroke,
    checkIfValid: checkIfCityValid
  } = useInput();

  const onNameBlurHandler = () => {
    checkIfNameValid(isNotEmpty);
  };
  const onNameChangeHandler = (event) => {
    onNameKeyStroke(event);
  };

  const onStreetBlurHandler = () => {
    checkIfStreetValid(isNotEmpty);
  };
  const onStreetChangeHandler = (event) => {
    onStreetKeyStroke(event);
  };

  const onPostalBlurHandler = () => {
    checkIfPostalValid(isFiveChars);
  };
  const onPostalChangeHandler = (event) => {
    onPostalKeyStroke(event);
  };

  const onCityBlurHandler = () => {
    checkIfCityValid(isNotEmpty);
  };
  const onCityChangeHandler = (event) => {
    onCityKeyStroke(event);
  };

  const isFormValid =
    isNameValid && isCityValid && isStreetValid && isPostalValid;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const userData = {
      name,
      street,
      postal,
      city
    };
    props.onConfirm(userData);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !isNameValid && isNameTouched ? classes.invalid : ""
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={onNameChangeHandler}
          onBlur={onNameBlurHandler}
        />
        {!isNameValid && isNameTouched && (
          <p>
            <i>Please enter a valid name!</i>
          </p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !isStreetValid && isStreetTouched ? classes.invalid : ""
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={onStreetChangeHandler}
          onBlur={onStreetBlurHandler}
        />
        {!isStreetValid && isStreetTouched && (
          <p>
            <i>Please enter a valid street!</i>
          </p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !isPostalValid && isPostalTouched ? classes.invalid : ""
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={onPostalChangeHandler}
          onBlur={onPostalBlurHandler}
        />
        {!isPostalValid && isPostalTouched && (
          <p>
            <i>Postal code must be of 5 characters!</i>
          </p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !isCityValid && isCityTouched ? classes.invalid : ""
        }`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={onCityChangeHandler}
          onBlur={onCityBlurHandler}
        />
        {!isCityValid && isCityTouched && (
          <p>
            <i>Please enter a valid city!</i>
          </p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={isFormValid ? classes.submit : classes.disable}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
