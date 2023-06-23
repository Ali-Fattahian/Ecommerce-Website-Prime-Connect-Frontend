import { createRef, useEffect, useState } from "react";
import Rating from "./Rating";
import ProductImageContainer from "./ProductImageContainer";

const Product = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = createRef();

  useEffect(() => {
    imageRef.current.addEventListener('load', () => {
      setImageLoaded(true);
      });
  }, []);

  return (
    <div className="product-grid">
      <div className="product-image">
        <ProductImageContainer
          product={product}
          imageLoaded={imageLoaded}
          imageRef={imageRef}
        />
        {product.hasDiscount && (
          <span className="product-sale-label">Sale!</span>
        )}
        <div className="price">{product.price} $</div>
        <a
          // onClick={() => navigate(`/products/${product.id}`)}
          href={`#/products/${product.id}`}
          className="product-details"
        >
          <i className="fa fa-eye"></i>
        </a>
      </div>
      <div className="product-content">
        <p className="title txt--black">{product.name}</p>
        <p className="description text-truncate">
          {product.description.slice(0, 40)}
        </p>
        <Rating
          ratingNum={product.rating}
          reviewCount={product.numReviews}
          noText
        />
      </div>
    </div>
  );
};

export default Product;
