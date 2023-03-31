import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  fetchSubCategories,
} from "../store/slices/productSlice";

const CreateProductPage = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [moreDetails, setMoreDetails] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [hasDiscount, setHasDiscount] = useState(false);
  const [countInStock, setCountInStock] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const user = useSelector((state) => state.user);
  const productState = useSelector((state) => state.products);
  const { userInfo } = user;
  const { loading, error, success, allSubCategories } = productState;

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
    formData.append("subCategory", subCategory);

    unique.forEach(
      (obj) => formData.append(`image${obj.id}`, obj.image) // Exp: Object with image1 has id: 1
    );

    const token = userInfo.token;

    dispatch(createProduct({ formData, token }));
  };

  useEffect(() => {
    if (userInfo.isAdmin === false) navigate("/login");
    if (allSubCategories.length === 0) dispatch(fetchSubCategories());
  }, [navigate, userInfo.id, userInfo.isAdmin, dispatch]);

  return (
    <div className="p-4 w-100" style={{ maxWidth: "800px", margin: "auto" }}>
      {!error && (
        <Form
          onSubmit={formSubmitHandler}
          id="register-form"
          className="p-4 border-lt mt-4"
          encType="multipart/form-data"
          method="POST"
        >
          <h1
            className="font-family-secondary txt--black text-center"
            style={{ fontSize: "3rem" }}
          >
            Create Product
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
              autoComplete="true"
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="sub-categories">
            <Form.Label
              className="font-family-secondary"
              style={{ fontSize: "1.5rem" }}
            >
              Sub Category
            </Form.Label>
            <Form.Select
              required
              className="mb-2"
              value={subCategory}
              onChange={(e) => {
                setSubCategory(e.target.value);
              }}
            >
              <option>-----------</option>
              {allSubCategories.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </Form.Select>
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
              Add Image 1
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
              Add Image 2
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
              Add Image 3
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
                  alt={`Image 1`}
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
                  alt={`Image 2`}
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
                  alt={`Image 3`}
                  src={image3}
                  style={{ width: "100%" }}
                  className="mt-2"
                />
              </Col>
            )}
          </Row>
          {success && (
            <Message variant="success">
              The product was made successfully
            </Message>
          )}
          {error && (
            <Message variant="danger">
              There was a problem creating the product, Please make sure you
              filled all the required fields.
            </Message>
          )}
          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: "#0095f6", color: "#fff" }}
            variant="secondary"
          >
            {loading ? "Loading" : "Create"}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default CreateProductPage;
