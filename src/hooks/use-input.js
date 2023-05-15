import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState();
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const onKeyStroke = (event) => {
    setValue(event.target.value);
    setIsTouched(true);
    setIsValid(true);
  };

  const checkIfValid = (validator) => {
    setIsValid(!isTouched || (isTouched && validator(value)));
  };

  return {
    value,
    isValid,
    isTouched,
    onKeyStroke,
    checkIfValid
  };
};

export default useInput;
