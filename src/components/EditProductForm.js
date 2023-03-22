import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../store/slices/productSlice";
import { useDispatch } from "react-redux";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

const EditProductForm = ({ product, error, userInfo, loading }) => {
  const [image2, setImage2] = useState(product.image2);
  const [image3, setImage3] = useState(product.image3);
  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [description, setDescription] = useState(product.description);
  const [moreDetails, setMoreDetails] = useState(product.moreDetails);
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState(product.discount);
  const [hasDiscount, setHasDiscount] = useState(Number(product.discount) > 0 ? true : false);
  const [image1, setImage1] = useState(product.image1);
  const [countInStock, setCountInStock] = useState(product.countInStock);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const unique = [...new Map(images.map((v) => [v.id, v])).values()]; // If the user changes one of the pictures more than once, keep the last one
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("moreDetails", moreDetails);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("countInStock", countInStock);
    formData.append("hasDiscount", hasDiscount);

    unique.forEach(
      (obj) => formData.append(`image${obj.id}`, obj.image) // Exp: Object with image1 has id: 1
    );

    const id = product.id;
    const token = userInfo.token;

    dispatch(updateProduct({ formData, token, id }));
    window.location.reload();
  };

  useEffect(() => {
    if (userInfo.isAdmin === false || product.user !== userInfo.id)
      navigate(`/products/${product.id}`);
  }, [
    navigate,
    product.id,
    product.user,
    userInfo.id,
    userInfo.isAdmin,
    dispatch,
  ]);

  return (
    <div>
      {error && (
        <Message variant="danger" className="mt-4">
          {error}
        </Message>
      )}
      {!error && (
        <Form
          onSubmit={formSubmitHandler}
          id="register-form"
          className="p-4 border-lt mt-4"
          encType="multipart/form-data"
          method="PUT"
        >
          <h1
            className="font-family-secondary txt--black text-center"
            style={{ fontSize: "3rem" }}
          >
            Edit Product
          </h1>
          <Form.Group controlId="name">
            <Form.Label
              className="font-family-secondary"
              style={{ fontSize: "1.5rem" }}
            >
              Name
            </Form.Label>
            <Form.Control
              required
              maxLength={200}
              autoComplete="true"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="brand">
            <Form.Label
              className="font-family-secondary"
              style={{ fontSize: "1.5rem" }}
            >
              Brand
            </Form.Label>
            <Form.Control
              required
              maxLength={200}
              autoComplete="true"
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label
              className="font-family-secondary"
              style={{ fontSize: "1.5rem" }}
            >
              Description
            </Form.Label>
            <Form.Control
              required
              maxLength={355}
              autoComplete="true"
              as="textarea"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="moreDetails">
            <Form.Label
              className="font-family-secondary"
              style={{ fontSize: "1.5rem" }}
            >
              More Details
            </Form.Label>
            <Form.Control
              autoComplete="true"
              as="textarea"
              placeholder="More Details"
              value={moreDetails}
              onChange={(e) => setMoreDetails(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label
              className="font-family-secondary"
              style={{ fontSize: "1.5rem" }}
            >
              Price
            </Form.Label>
            <Form.Control
              required
              maxLength={7}
              autoComplete="true"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="countInStock">
            <Form.Label
              className="font-family-secondary"
              style={{ fontSize: "1.5rem" }}
            >
              Products in Stock
            </Form.Label>
            <Form.Control
              required
              min={0}
              autoComplete="true"
              type="number"
              placeholder="Products in Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="discount">
            <Form.Label
              className="font-family-secondary"
              style={{ fontSize: "1.5rem" }}
            >
              Discount Number
            </Form.Label>
            <Form.Control
              required
              min={0}
              max={99}
              autoComplete="true"
              type="number"
              placeholder="A number between 0 and 99"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
                if (Number(e.target.value) > 0) {
                  setHasDiscount(true);
                } else if (Number(e.target.value) === 0) {
                  setHasDiscount(false);
                }
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="image1">
            <Form.Label
              className="font-family-secondary mb-2"
              style={{ fontSize: "1.5rem" }}
            >
              Change Image
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImages((currentState) => [
                  ...currentState,
                  { id: 1, image: e.target.files[0] },
                ]);
                setImage1(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </Form.Group>
          <Form.Group controlId="image2">
            <Form.Label
              className="font-family-secondary mb-2"
              style={{ fontSize: "1.5rem" }}
            >
              {product.image2 ? "Change" : "Add"} Image 2
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImages((currentState) => [
                  ...currentState,
                  { id: 2, image: e.target.files[0] },
                ]);
                setImage2(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </Form.Group>
          <Form.Group controlId="image3">
            <Form.Label
              className="font-family-secondary mb-2"
              style={{ fontSize: "1.5rem" }}
            >
              {image3 ? "Change" : "Add"} Image 3
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImages((currentState) => [
                  ...currentState,
                  { id: 3, image: e.target.files[0] },
                ]);
                setImage3(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </Form.Group>
          <Row className="w-100 gap-4 justify-content-center">
            {image1 && (
              <Col lg={3} xl={3} md={12} sm={12}>
                <Image
                  fluid={true}
                  alt={`${product.name} Image 1`}
                  src={image1}
                  style={{ width: "100%" }}
                  className="mt-2"
                />
              </Col>
            )}
            {image2 && (
              <Col lg={3} xl={3} md={12} sm={12}>
                <Image
                  fluid={true}
                  alt={`${product.name} Image 2`}
                  src={image2}
                  style={{ width: "100%" }}
                  className="mt-2"
                />
              </Col>
            )}
            {image3 && (
              <Col lg={3} xl={3} md={12} sm={12}>
                <Image
                  fluid={true}
                  alt={`${product.name} Image 3`}
                  src={image3}
                  style={{ width: "100%" }}
                  className="mt-2"
                />
              </Col>
            )}
          </Row>
          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: "#0095f6", color: "#fff" }}
            variant="secondary"
          >
            {loading ? "Loading" : "Edit"}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default EditProductForm;
