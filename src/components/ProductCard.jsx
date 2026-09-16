import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="product-card-content">
        <span className="product-category">{product.category}</span>

        <h3>{product.name}</h3>

        <p className="product-price">
          ₱{product.price.toLocaleString()}
        </p>

        <div className="product-actions">
          <Link
            to={`/product/${product.id}`}
            className="view-button"
          >
            View Details
          </Link>

          <button
            className="add-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;