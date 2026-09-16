import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  const updateQuantity = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + amount
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal;

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>
            You haven't added any products to your cart yet.
          </p>

          <Link to="/" className="primary-button">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="page-heading">
        <p className="hero-label">SHOPPING CART</p>
        <h1>Your Cart</h1>
        <p>Review your items before checkout.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-info">
                <span className="product-category">
                  {item.category}
                </span>

                <h3>{item.name}</h3>

                <p>
                  ₱{item.price.toLocaleString()} each
                </p>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    updateQuantity(item.id, -1)
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, 1)
                  }
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                <strong>
                  ₱
                  {(
                    item.price * item.quantity
                  ).toLocaleString()}
                </strong>

                <button
                  className="remove-button"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>
              ₱{subtotal.toLocaleString()}
            </span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <strong>
              ₱{total.toLocaleString()}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Cart;