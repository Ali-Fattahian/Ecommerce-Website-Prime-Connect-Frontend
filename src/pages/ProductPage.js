import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavbarComponent from "../components/NavbarComponent";
import Rating from "../components/Rating";
import Price from "../components/Price";
import Fade from "react-bootstrap/Fade";
import ListGroup from "react-bootstrap/ListGroup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ProductPage = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: "http://localhost:8000/api/",
  };
  const { productId } = useParams();
  const [error, setError] = useState(null);
  const [product, setProduct] = useState([]);
  const [detailOpen, setDetailOpen] = useState(true);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [userReview, setUserReview] = useState('')
  // const [proceedBuyOpen, setProceedBuyOpen] = useState(false);

  const infoCollapseManager = (setState) => {
    setDetailOpen(false);
    setReviewOpen(false);
    // setProceedBuyOpen(false);
    setState(true);
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`products/${productId}`, config);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // const isImageValid = (image) => {
  //   const extension = image.split(".").at(-1);

  //   if (!extension.match(/\.(jpg|jpeg|png)$/)) {
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <div>
      <NavbarComponent />
      <Row className="mt-2 p-2">
        <Col xl={6} lg={6} md={6} sm={12}>
          <Carousel pause="hover" keyboard="true">
            {product.image1 && (
              <Carousel.Item>
                <Image
                  src={product.image1}
                  alt={product.name}
                  fluid
                  className="carousel-image"
                />
              </Carousel.Item>
            )}
            {product.image2 && (
              <Carousel.Item>
                <Image
                  src={product.image2}
                  alt={product.name}
                  fluid
                  className="carousel-image"
                />
              </Carousel.Item>
            )}
            {product.image3 && (
              <Carousel.Item>
                <Image
                  src={product.image3}
                  alt={product.name}
                  fluid
                  className="carousel-image"
                />
              </Carousel.Item>
              // put thumbnails for indicators
            )}
          </Carousel>
        </Col>
        <Col xl={6} lg={6} md={6} sm={12}>
          <Container id="product-detail__container">
            <p className="txt--black mt-2" style={{ maxWidth: "450px" }}>
              {product.description}
            </p>
            <Rating
              ratingNum={product.rating}
              reviewCount={product.numReviews}
            />
            <Price
              hasDiscount={product.hasDiscount}
              discount={product.discount}
              price={Number(product.price)}
            />
          </Container>
        </Col>
      </Row>
      <Container
        id="collapse-item__container"
        className="d-flex m-0 mt-2 p-2 pb-0 align-items-center"
      >
        <p
          onClick={() => infoCollapseManager(setDetailOpen)}
          aria-controls="detail-fade-text"
          aria-expanded={detailOpen}
          className={`m-0 txt--gray border-right-lt px-2 pb-2 ${
            detailOpen ? "collapse-item--active" : "collapse-item"
          }`}
        >
          Detail
        </p>
        <p
          onClick={() => infoCollapseManager(setReviewOpen)}
          aria-controls="review-fade"
          aria-expanded={reviewOpen}
          className={`m-0 txt--gray border-right-lt px-2 pb-2 ${
            reviewOpen ? "collapse-item--active" : "collapse-item"
          }`}
        >
          Reviews
        </p>
        {/* <p
          onClick={() => infoCollapseManager(setProceedBuyOpen)}
          aria-controls="buy-fade-text"
          aria-expanded={proceedBuyOpen}
          className={`m-0 border-right-lt px-2 pb-2 ${proceedBuyOpen ? 'collapse-item--active':'collapse-item'}`}
        >
          Add to Cart
        </p> */}
      </Container>
      <Row className="position-relative">
        <Fade in={detailOpen} className="position-absolute top-0 left-0">
          <div id="detail-fade-text">
            <p className="txt--black p-4 border-top-lt">
              {product.moreDetails}
            </p>
          </div>
        </Fade>
        <Fade in={reviewOpen} className="position-absolute top-0 left-0">
          <Container id="review-fade">
            <div className="d-flex justify-content-between w-100 align-items-center p-4">
              <h4 className="txt--black">Reviews({product.numReviews})</h4>
              <p
                id="add-review"
                onClick={() => {
                  setWriteReviewOpen(true);
                }}
              >
                <i className="fa fa-edit mx-1"></i>
                <span>Write your review</span>
              </p>
            </div>
            {product.reviews ? (
              <ListGroup variant="flush" className="border-top-lt">
                {writeReviewOpen && <ListGroup.Item>
                    <Form>
                      <Form.Group className="mb-2">
                        <p onClick={() => {setWriteReviewOpen(false)}} className="txt--gray m-0 p-0" style={{textAlign:"right", fontSize:'20px'}}><i className="fa fa-close" style={{cursor:"pointer"}}></i></p>
                        <Form.Control onChange={(e) => {setUserReview(e.target.value)}} as="textarea" placeholder="Your review..." className="p-2" style={{fontSize: '14px'}}></Form.Control>
                      </Form.Group>
                      <div className="d-flex justify-content-start">
                      <Button type="submit" variant="success" style={{color: "white", backgroundColor: "#0096f6"}} disabled={userReview.length === 0}>
                        Submit
                      </Button>
                      </div>
                    </Form>
                  </ListGroup.Item>}
                {product.reviews.map((review) => (
                  <ListGroup.Item
                    key={review.id}
                    className="d-flex flex-column pb-0"
                  >
                    <div className="d-flex p-2 justify-content-between">
                      <div className="d-flex gap-1">
                        <p>{review.user}</p>
                        <p>|</p>
                        <p className="txt--gray">{review.createdAt}</p>
                      </div>

                      <div className="d-flex">
                        <Rating ratingNum={Number(review.rating)} />
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{ transform: "translateY(-12px)" }}
                    >
                      <p className="px-2">{review.comment}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Container>
                <p style={{ textAlign: "center" }} className="txt--gray">
                  No reviews yet
                </p>
              </Container>
            )}
          </Container>
        </Fade>
        {/* <Fade in={proceedBuyOpen} className="position-absolute top-0 left-0">
          <div id="buy-fade-text">
            <p className="txt--black p-4 border-top-lt">{product.description}</p>
          </div>
        </Fade> */}
      </Row>
    </div>
  );
};

export default ProductPage;
