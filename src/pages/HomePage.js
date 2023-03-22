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
import Message from '../components/Message';

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/products') 
      setProducts(data)
    } catch(err) {
      setError(err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <>
      <NavbarComponent />
      <h2 className="mx-4 mt-4 w-100" id="popular-products__header">Our Popular Products</h2>
      {products.length > 0 ? <Carousel pause="hover" className="bg-dark mt-2" variant="dark" keyboard="true">
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            <div className="carousel-inner-container">
              <Image
                src={product.image1}
                alt={product.name}
                fluid
                className="carousel-image"
              />
              <Container className="mt-3 d-flex flex-column justify-content-between">
                <div className="border-bottom-lt">
                  <h6 className="txt--black">{product.name}</h6>
                  <p className="txt--gray">{product.description}</p>
                  </div>
                <Price price={Number(product.price)} hasDiscount={product.hasDiscount} discount={product.discount} />
                <Rating ratingNum={product.rating} reviewCount={product.numReviews} />
                <Button
                  variant="primary"
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
              <Carousel.Caption style={{fontSize:'12px'}}>{product.name}</Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel> : (
        <Message variant='info'>No popular product was found</Message>
      )}
      <h2 className="txt--black mt-4 mx-4"> {/* add more margin to this */}
        What's New?
      </h2>
      <Row className="p-4 pt-0">
        {products.length > 0 ? products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
            <Product product={product} />
          </Col>
        )) : (
          <Message variant='info'>No new product was found</Message>
        )}
      </Row>
    </>
  );
};

export default HomePage;
