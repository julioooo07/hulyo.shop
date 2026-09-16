import { useState } from "react";
import products from "../data";
import ProductCard from "../components/ProductCard";

function Home({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setVisibleCount(6);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setVisibleCount(6);
  };

  const handleViewMore = () => {
    setVisibleCount((currentCount) => currentCount + 4);
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div>
          <p className="hero-label">TECH ESSENTIALS</p>

          <h1>
            Find the tech
            <br />
            you need.
          </h1>

          <p>
            Browse our collection of useful tech products and accessories.
          </p>
        </div>
      </section>

      <section className="products-section">
        <div className="section-heading">
          <div>
            <h2>Our Products</h2>
            <p>Browse our available products.</p>
          </div>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <select
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {visibleProducts.length > 0 ? (
          <>
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="view-more-container">
                <button
                  className="view-more-button"
                  onClick={handleViewMore}
                >
                  View More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try a different search or category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;