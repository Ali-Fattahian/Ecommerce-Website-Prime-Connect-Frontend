import React, { useEffect } from "react";
import { Blurhash } from "react-blurhash";

const ProductImageContainer = ({ product, imageLoaded, imageRef }) => {
  useEffect(() => {}, [imageLoaded]);

  return (
    <div className="image-container">
      <Blurhash
        className="blurhash"
        hash={product.image_1_hash}
        resolutionX={32}
        resolutionY={32}
        style={{ display: `${imageLoaded ? "none" : "block"}` }}
      />
      <img
        className="image-1"
        alt={product.name}
        src={product.image1}
        ref={imageRef}
        style={{ display: `${imageLoaded ? "block" : "none"}` }}
      />
    </div>
  );
};

export default ProductImageContainer;
