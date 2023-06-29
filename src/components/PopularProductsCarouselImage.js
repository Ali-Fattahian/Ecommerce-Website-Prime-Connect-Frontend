import React, { useEffect, useRef, useState } from 'react'
import ProductImageContainer from './ProductImageContainer'

const PopularProductsCarouselImage = ({ product }) => {
  const imageRef = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    imageRef.current.addEventListener('load', () => {
      setImageLoaded(true);
      });
  }, [])

  return (
    <ProductImageContainer product={product} imageLoaded={imageLoaded} imageRef={imageRef} />
  )
}

export default PopularProductsCarouselImage