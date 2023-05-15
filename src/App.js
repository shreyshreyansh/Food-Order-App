import { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import ContextProvider from "./store/ContextProvider";
import "./global.css";

export default function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCartHandler = () => {
    setIsCartShown(true);
  };

  const hideCartHandler = () => {
    setIsCartShown(false);
  };

  return (
    <ContextProvider>
      <Header onShowCart={showCartHandler} />
      {isCartShown && <Cart onHideCart={hideCartHandler} />}
      <main>
        <Meals />
      </main>
    </ContextProvider>
  );
}
