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
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [rating, setRating] = useState("")
  const [qty, setQty] = useState(1);
  const user = useSelector(state => state.user)
  const { userInfo } = user
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart({ productDetail, qty }));
  };

  const infoCollapseManager = (setState) => {
    setDetailOpen(false);
    setReviewOpen(false);
    setState(true);
  };

  const reviewCreateHandler = async (review) => {
    config.headers = {
      "Content-Type": "application/json",
      "Authorization": `JWT ${userInfo.token}`
    }
    await axios.post(`products/create-review/${productId}`, {
      comment: review,
      rating: rating,
    }, config)
  }

  const reviewFormHandler = (e) => {
    e.preventDefault()
    if (userReview.trim().length < 1) {
      setError('Please write something in the area below')
    }
    if (!userInfo) {
      setError("Please log in first")
    }
    reviewCreateHandler(userReview.trim())
  }

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`products/${productId}`, config);
      setProductDetail(data);
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
      <Row className="p-2" id="product-page-top">
        <Col xl={6} lg={6} md={6} sm={12}>
          <Carousel pause="hover" keyboard="true" className="bg-dark mt-2" variant="dark">
            {productDetail.image1 && (
              <Carousel.Item>
                <Image
                  src={productDetail.image1}
                  alt={productDetail.name}
                  fluid
                  className="carousel-image"
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
                />
              </Carousel.Item>
              // put thumbnails for indicators
            )}
          </Carousel>
        </Col>
        <Col xl={6} lg={6} md={6} sm={12}>
          <Container id="product-detail__container">
            <p className="txt--black mt-2 mb-4" style={{ maxWidth: "450px" }}>
              {productDetail.description}
            </p>
            {productDetail.numReviews > 0 && <Rating
              ratingNum={productDetail.rating}
              reviewCount={productDetail.numReviews}
            />}
            <Price
              hasDiscount={productDetail.hasDiscount}
              discount={productDetail.discount}
              price={Number(productDetail.price)}
            />
            <Row className="mt-4">
              <Col style={{flex: 'none', width: 'fit-content'}}>
                <Button
                  variant="primary"
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
                    style={{width: 'fit-content'}}
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
          style={{paddingLeft: "1rem", paddingRight: '.5rem'}}
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
            {productDetail.moreDetails ? <p className="txt--black p-4 border-top-lt">
              {productDetail.moreDetails}
            </p> : (
              <p className="txt--gray p-2 border-top-lt">No detail was provided</p>
            )}
          </div>
        </Fade>
        <Fade in={reviewOpen} className="position-absolute top-0 left-0">
          <Container id="review-fade">
            <div className="d-flex justify-content-between w-100 align-items-center p-4 border-top-lt">
              <h4 className="txt--black">
                Reviews({productDetail.numReviews})
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
            {productDetail.reviews ? (
              <ListGroup variant="flush" style={{borderTop: "1px dotted #ddd"}}>
                {writeReviewOpen && (
                  <ListGroup.Item>
                    <Form onSubmit={reviewFormHandler}>
                      <Form.Group className="mb-2">
                        <p
                          onClick={() => {
                            setWriteReviewOpen(false);
                          }}
                          className="txt--gray m-0 p-0"
                          style={{ textAlign: "right", fontSize: "20px" }}
                        >
                          <i
                            className="fa fa-close"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </p>
                        <Form.Control
                          onChange={(e) => {
                            setUserReview(e.target.value);
                          }}
                          as="textarea"
                          placeholder="Replaces your previous review if you already have one"
                          className="p-2"
                          style={{ fontSize: "14px" }}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Select className="mb-2" aria-label="Rate the product" value={rating} onChange={(e) => {setRating(e.target.value)}}>
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
                          variant="success"
                          style={{ color: "white", backgroundColor: "#0096f6" }}
                          disabled={userReview.length === 0 || rating.length !== 1}
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
