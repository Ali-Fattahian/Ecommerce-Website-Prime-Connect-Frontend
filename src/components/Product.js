import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="product-grid">
      <div className="product-image">
        <div className="image-container">
          <img className="image-1" alt={product.name} src={product.image1} />
        </div>
        {product.hasDiscount && <span className="product-sale-label">Sale!</span>}
        <div className="price">{product.price} $</div>
        <a href={`/products/${product.id}`} className="product-details">
          <i className="fa fa-eye"></i>
        </a>
      </div>
      <div className="product-content">
        <p className="title txt--black">
          {product.name}
        </p>
        <p className="description text-truncate">{product.description.slice(0, 40)}</p>
        <Rating ratingNum={product.rating} reviewCount={product.numReviews} noText />
      </div>
    </div>
  );
};

// export default Product

export default Product;
