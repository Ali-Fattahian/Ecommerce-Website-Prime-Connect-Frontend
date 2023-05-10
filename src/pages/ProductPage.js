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
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import Message from "../components/Message";
import Product from "../components/Product";
import Footer from '../components/Footer';

const ProductPage = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: "http://localhost:8000/api/",
  };
  const { productId } = useParams();
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState([]);
  const [detailOpen, setDetailOpen] = useState(true);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [rating, setRating] = useState("");
  const [qty, setQty] = useState(1);
  const [commentError, setCommentError] = useState(null);
  const [refreshPage, setRefreshPage] = useState(null);
  const [message, setMessage] = useState(null);
  const user = useSelector((state) => state.user);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsError, setSuggestionsError] = useState(null);
  const { userInfo } = user;
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart({ productDetail, qty }));
    setMessage(
      `${qty} ${productDetail.name} ${
        qty > 1 ? "were" : "was"
      } added to your cart`
    );
  };

  const infoCollapseManager = (setState) => {
    setDetailOpen(false);
    setReviewOpen(false);
    setSuggestionOpen(false);
    setState(true);
  };

  const reviewCreateHandler = async (review) => {
    config.headers = {
      "Content-Type": "application/json",
      Authorization: `JWT ${userInfo.token}`,
    };
    try {
      await axios.post(
        `products/create-review/${productId}`,
        {
          comment: review,
          rating: rating,
        },
        config
      );
      setRefreshPage(new Date());
    } catch (err) {
      setCommentError(
        "There was a problem creating your comment, Make sure you have a stable internet connection"
      );
    }
  };

  const reviewFormHandler = (e) => {
    e.preventDefault();
    if (userReview.trim().length < 1) {
      setError("Please write something in the comment section");
    }
    if (!userInfo) {
      setError("Please log in first");
    }
    reviewCreateHandler(userReview.trim());
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`products/${productId}`, config);
      setProductDetail(data);
    } catch (err) {
      setError(
        "There was a problem loading the product's information, Make sure you have a stable internet connection"
      );
    }
  };

  const fetchSuggestions = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/products/product-suggestion/${productId}`
      );
      setSuggestions(data);
    } catch (err) {
      setSuggestionsError(
        "An error occured trying to fetch suggestions for this product, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchSuggestions();
  }, [refreshPage]);

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
      <Row className="p-2" id="product-page-top">
        {message && <Message variant="info">{message}</Message>}
        <Col xl={6} lg={6} md={6} sm={12} id='product-page-image'>
          <Carousel
            pause="hover"
            keyboard="true"
            className="bg-dark mt-2"
            variant="dark"
          >
            {productDetail.image1 && (
              <Carousel.Item>
                <Image
                  src={productDetail.image1}
                  alt={productDetail.name}
                  fluid
                  className="carousel-image"
                  onClick={() => window.open(productDetail.image1, "_blank")}
                  style={{ cursor: "pointer" }}
                />
              </Carousel.Item>
            )}
            {productDetail.image2 && (
              <Carousel.Item>
                <Image
                  src={productDetail.image2}
                  alt={productDetail.name}
                  fluid
                  className="carousel-image"
                  onClick={() => window.open(productDetail.image2, "_blank")}
                  style={{ cursor: "pointer" }}
                />
              </Carousel.Item>
            )}
            {productDetail.image3 && (
              <Carousel.Item>
                <Image
                  src={productDetail.image3}
                  alt={productDetail.name}
                  fluid
                  className="carousel-image"
                  onClick={() => window.open(productDetail.image3, "_blank")}
                  style={{ cursor: "pointer" }}
                />
              </Carousel.Item>
              // put thumbnails for indicators
            )}
          </Carousel>
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} id="product-page-description">
          <Container id="product-detail__container">
            <h6 className="fw-bold fs-3 text-decoration-underline mt-2">
              {productDetail.name}
            </h6>
            <p className="mt-2 mb-4" style={{ maxWidth: "450px" }}>
              {productDetail.description}
            </p>
            {productDetail.numReviews > 0 && (
              <Rating
                ratingNum={productDetail.rating}
                reviewCount={productDetail.numReviews}
              />
            )}
            <Price
              hasDiscount={productDetail.hasDiscount}
              discount={productDetail.discount}
              price={Number(productDetail.price)}
            />
            <Row className="mt-4">
              <Col style={{ flex: "none", width: "fit-content" }}>
                <Button
                  variant="light-cyan"
                  style={{ color: "var(--bs-black)" }}
                  onClick={addToCartHandler}
                  disabled={productDetail.countInStock === 0}
                >
                  {productDetail.countInStock === 0
                    ? "Out of Stock"
                    : "Add to cart"}
                </Button>
              </Col>
              {productDetail.countInStock > 0 && (
                <Col>
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    style={{
                      width: "fit-content",
                      backgroundColor: "var(--bs-light-cyan)",
                    }}
                    className="d-inline-block"
                  >
                    {[...Array(productDetail.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              )}
            </Row>
          </Container>
        </Col>
      </Row>
      {error && (
        <Message variant="danger" className="m-4">
          {error}
        </Message>
      )}
      <Container
        id="collapse-item__container"
        className="d-flex m-0 mt-2 p-2 pb-0 align-items-center"
      >
        <p
          onClick={() => infoCollapseManager(setDetailOpen)}
          aria-controls="detail-fade-text"
          aria-expanded={detailOpen}
          className={`m-0 txt--gray border-right-lt pb-2 ${
            detailOpen ? "collapse-item--active" : "collapse-item"
          }`}
          style={{ paddingLeft: "1rem", paddingRight: ".5rem" }}
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
        <p
          onClick={() => infoCollapseManager(setSuggestionOpen)}
          aria-controls="suggestion-fade"
          aria-expanded={suggestionOpen}
          className={`m-0 txt--gray border-right-lt px-2 pb-2 ${
            suggestionOpen ? "collapse-item--active" : "collapse-item"
          }`}
        >
          Suggestions
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
            {productDetail.moreDetails ? (
              <p className="p-4 border-top-lt" style={{ lineHeight: '1.7', wordSpacing: '2px', color: '#333' }}>
                {productDetail.moreDetails}
              </p>
            ) : (
              <p className="txt--gray p-2 border-top-lt">
                No detail was provided
              </p>
            )}
          </div>
        </Fade>
        <Fade in={reviewOpen} className="position-absolute top-0 left-0">
          <Container id="review-fade" style={{ zIndex: "2" }}>
            <div className="d-flex justify-content-between w-100 align-items-center p-4 border-top-lt" id="review-section-top">
              <h4 className="txt--black font-family-secondary">
                REVIEWS - {productDetail.numReviews}
              </h4>
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
            {commentError && <Message variant="danger">{commentError}</Message>}
            {productDetail.reviews ? (
              <ListGroup
                variant="flush"
                style={{ borderTop: "1px dotted #ddd" }}
              >
                {writeReviewOpen && (
                  <ListGroup.Item>
                    <Form onSubmit={reviewFormHandler}>
                      <Form.Group className="mb-2">
                        <p
                          className="txt--gray m-0 p-0"
                          style={{ textAlign: "right", fontSize: "20px" }}
                        >
                          <i
                            onClick={() => {
                              setWriteReviewOpen(false);
                            }}
                            className="fa fa-close"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </p>
                        <Form.Control
                          onChange={(e) => {
                            setUserReview(e.target.value);
                            setCommentError(null);
                          }}
                          as="textarea"
                          placeholder="Replaces your previous review if you already have one"
                          className="p-2"
                          style={{ fontSize: "14px" }}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Select
                          className="mb-2"
                          aria-label="Rate the product"
                          value={rating}
                          onChange={(e) => {
                            setRating(e.target.value);
                          }}
                        >
                          <option>Rate the product</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </Form.Select>
                      </Form.Group>
                      <div className="d-flex justify-content-start">
                        <Button
                          type="submit"
                          variant="primary"
                          style={{ color: "var(--bs-secondary)" }}
                          disabled={
                            userReview.length === 0 || rating.length !== 1
                          }
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </ListGroup.Item>
                )}
                {productDetail.reviews.map((review) => (
                  <ListGroup.Item
                    key={review.id}
                    className="d-flex flex-column pb-0"
                  >
                    <div className="d-flex p-2 justify-content-between" id="comment-detail">
                      <div className="d-flex gap-1" id="comment-user-info">
                        <p>{review.user}</p>
                        <p id="review-separator">|</p>
                        <p className="txt--gray">{review.createdAt.substring(0, 10)}</p>
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
        <Fade
          in={suggestionOpen}
          className="position-absolute top-0 left-0"
          style={{ margin: "auto" }}
        >
          <div id="product-suggestions" className="border-top-lt">
            {!suggestionsError && suggestions.length > 0 ? (
              suggestions.map((product) => (
                // <Col sm={3} md={3} lg={3} xl={3} key={product.id}>
                <Product product={product} key={product.id} />
                // </Col>
              ))
            ) : (
              <p className="txt--gray" style={{ textAlign: "center" }}>
                We couldn't find any suggestions
              </p>
            )}
            {suggestionsError && <Message variant="danger">{error}</Message>}
          </div>
        </Fade>
      </Row>
      <Footer fixed />
    </div>
  );
};

export default ProductPage;
