import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import Product from "../components/Product";
import Rating from "../components/Rating";
import Price from "../components/Price";
import axios from "axios";
import Message from "../components/Message";

const HomePage = () => {
  const navigate = useNavigate();
  const [popularProducts, setPopularProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [popularProductsError, setPopularProductsError] = useState(null);
  const [newProductsError, setNewProductsError] = useState(null);

  const fetchPopularProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/products/popular-products"
      );
      setPopularProducts(data);
    } catch (err) {
      setPopularProductsError(
        "There was a problem loading the products, Make sure you have a stable internet connection"
      );
    }
  };

  const fetchNewProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/products/new-products"
      );
      setNewProducts(data);
    } catch (err) {
      setNewProductsError(
        "There was a problem loading the products, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    fetchPopularProducts();
    fetchNewProducts();
  }, []);
  return (
    <>
      <NavbarComponent />
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
                <Image
                  src={product.image1}
                  alt={product.name}
                  fluid
                  className="carousel-image"
                  style={{ maxWidth: "640px" }}
                />
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
                <Image
                  src={product.image1}
                  alt={product.name}
                  fluid
                  className="carousel-image"
                />
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
      <Row id="homepage-new-products">
        <div className="text-center p-3">
          <h2 className="font-family-secondary border-bottom-primary d-inline-block pb-2" style={{ borderColor: 'var(--bs-light-cyan)', color: 'var(--bs-secondary)' }}>
            NEW PRODUCTS
          </h2>
        </div>
        {!newProductsError && newProducts.length > 0 ? (
          newProducts.map((product) => (
            <Col sm={12} md={6} lg={3} xl={3} key={product.id}>
              <Product product={product} />
            </Col>
          ))
        ) : (
          <Message variant="info">No new product was found</Message>
        )}
      </Row>
    </>
  );
};

export default HomePage;
