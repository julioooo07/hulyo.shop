import { Link, useParams } from "react-router-dom";
import products from "../data";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <main className="details-page">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <div className="details-container">
        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="details-content">
          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="details-price">
            ₱{product.price.toLocaleString()}
          </p>

          <p className="details-description">
            {product.description}
          </p>

          <p className="stock-availability">
            {product.stock > 0
              ? `In Stock: ${product.stock} available`
              : "Out of Stock"}
          </p>

          <button
            className="add-button details-add-button"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock > 0
              ? "Add to Cart"
              : "Out of Stock"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;