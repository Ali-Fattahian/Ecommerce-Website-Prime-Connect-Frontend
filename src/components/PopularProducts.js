import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Rating from "../components/Rating";
import Price from "../components/Price";
import axios from "axios";
import Message from "../components/Message";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import PopularProductsCarouselImage from "./PopularProductsCarouselImage";

const PopularProducts = () => {
  const navigate = useNavigate();
  const [popularProducts, setPopularProducts] = useState([]);
  const [popularProductsError, setPopularProductsError] = useState(null);
  const config = useSelector((state) => state.config);
  const { baseURL } = config;

  const fetchPopularProducts = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/products/popular-products`);
      setPopularProducts(data);
    } catch (err) {
      setPopularProductsError(
        "There was a problem loading the products, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  return (
    <>
      {!popularProductsError && popularProducts.length > 0 ? (
        <Carousel
          pause="hover"
          className="bg-dark"
          style={{ marginTop: "72px" }}
          variant="dark"
          keyboard="true"
        >
          {popularProducts.map((product) => (
            <Carousel.Item key={product.id}>
              <div className="carousel-inner-container">
                <PopularProductsCarouselImage product={product} />
                <Container
                  className="d-flex flex-column p-3 justify-content-between"
                  id="homepage-carousel"
                >
                  <div className="border-bottom-lt">
                    <h6 className="fw-bold fs-3">{product.name}</h6>
                    <p className="text-break">{product.description}</p>
                  </div>
                  <Price
                    price={Number(product.price)}
                    hasDiscount={product.hasDiscount}
                    discount={product.discount}
                  />
                  {product.numReviews > 0 && (
                    <Rating
                      ratingNum={product.rating}
                      reviewCount={product.numReviews}
                    />
                  )}
                  <Button
                    variant="light-cyan"
                    style={{ borderColor: "transparent" }}
                    onClick={() => {
                      navigate(`/products/${product.id}`);
                    }}
                  >
                    Continue
                  </Button>
                </Container>
              </div>

              <div className="carousel-with-caption">
                <PopularProductsCarouselImage product={product} />
                <Carousel.Caption
                  style={{ fontSize: "12px", cursor: "pointer" }}
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {product.name}
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Message variant="info">No popular product was found</Message>
      )}
    </>
  );
};

export default PopularProducts;
