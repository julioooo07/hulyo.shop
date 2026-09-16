import { useState } from "react";
import { Link } from "react-router-dom";

function CheckOut({ cart, setCart }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: ""
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: ""
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (phoneDigits.length < 10) {
      newErrors.phone =
        "Please enter a valid phone number with at least 10 digits.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required.";
    } else if (formData.address.trim().length < 10) {
      newErrors.address =
        "Please enter a complete delivery address.";
    }

    if (formData.paymentMethod !== "Cash on Delivery") {
      newErrors.paymentMethod =
        "Please select Cash on Delivery.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setOrderPlaced(true);
    setCart([]);
  };

  if (orderPlaced) {
    return (
      <main className="success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for your order,{" "}
            <strong>{formData.fullName}</strong>.
          </p>

          <p>
            Your order has been successfully submitted.
          </p>

          <Link
            to="/"
            className="primary-button"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="empty-checkout">
        <h1>No Items to Checkout</h1>

        <p>
          Add some products to your cart first.
        </p>

        <Link
          to="/"
          className="primary-button"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="page-heading">
        <p className="hero-label">CHECKOUT</p>

        <h1>Complete Your Order</h1>

        <p>
          Enter your information to place your order.
        </p>
      </div>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <h2>Delivery Information</h2>

          <div className="form-group">
            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />

            {errors.fullName && (
              <p className="error-message">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <p className="error-message">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />

            {errors.phone && (
              <p className="error-message">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">
              Delivery Address
            </label>

            <textarea
              id="address"
              name="address"
              rows="4"
              placeholder="Enter your complete delivery address"
              value={formData.address}
              onChange={handleChange}
            />

            {errors.address && (
              <p className="error-message">
                {errors.address}
              </p>
            )}
          </div>

          <h2>Payment Method</h2>

          <div className="form-group">
            <label htmlFor="paymentMethod">
              Select Payment Method
            </label>

            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="">
                Select a payment method
              </option>

              <option value="Cash on Delivery">
                Cash on Delivery
              </option>
            </select>

            {errors.paymentMethod && (
              <p className="error-message">
                {errors.paymentMethod}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="place-order-button"
          >
            Place Order
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >
              <div>
                <strong>{item.name}</strong>

                <p>
                  Quantity: {item.quantity}
                </p>
              </div>

              <span>
                ₱
                {(
                  item.price * item.quantity
                ).toLocaleString()}
              </span>
            </div>
          ))}

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ₱{subtotal.toLocaleString()}
            </strong>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckOut;