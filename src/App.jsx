import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />

        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} />}
        />
      </Routes>
    </>
  );
}

export default App;