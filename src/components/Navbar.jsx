import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Hulyo.shop
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/cart" className="cart-link">
            Cart
            <span className="cart-count">{cartCount}</span>
          </Link>

          <Link to="/checkout">Checkout</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;