import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const EditProductForm = ({ product, error, userInfo }) => {
  const [image2, setImage2] = useState(product.image2);
  const [image3, setImage3] = useState(product.image3);
  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [description, setDescription] = useState(product.description);
  const [moreDetails, setMoreDetails] = useState(product.moreDetails);
  const [price, setPrice] = useState(product.price);
  const [hasDiscount, setHasDiscount] = useState(product.hasDiscount);
  const [discount, setDiscount] = useState(product.discount);
  const [image1, setImage1] = useState(product.image1);
  const [countInStock, setCountInStock] = useState(product.countInStock);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo.isAdmin === false || product.user !== userInfo.id)
      navigate(`/products/${product.id}`);
  }, [navigate, product.id, product.user, userInfo.id, userInfo.isAdmin]);

  return (
    <div>
      {error && <Message variant="danger" className="mt-4">{error}</Message>}
      {!error && <Form
        // onSubmit={formSubmitHandler}
        id="register-form"
        className="p-4 border-lt mt-4"
      >
        <h1
          className="font-family-secondary txt--black text-center"
          style={{ fontSize: "3rem" }}
        >
          Edit Product
        </h1>
        {message && <Message variant="danger">{message}</Message>}
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
        <Form.Group controlId="description">
          <Form.Label
            className="font-family-secondary"
            style={{ fontSize: "1.5rem" }}
          >
            Description
          </Form.Label>
          <Form.Control
            required
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
            autoComplete="true"
            type="number"
            placeholder="Products in Stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="hasDiscount">
          <Form.Check
            autoComplete="true"
            type="checkbox"
            label="Discount"
            value={hasDiscount}
            onChange={(e) => setHasDiscount(e.target.checked)}
          ></Form.Check>
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
            autoComplete="true"
            type="number"
            placeholder="Discount Number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="image1">
          <Form.Label
            className="font-family-secondary mb-2"
            style={{ fontSize: "1.5rem" }}
          >
            Change Image 1
          </Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              setImage1(e.target.value);
            }}
          />
          <Image
            fluid={true}
            alt={`${product.name} Image 1`}
            src={product.image1}
            style={{ width: "100%" }}
            className="mt-2"
          />
        </Form.Group>
        <Form.Group controlId="image2">
          <Form.Label
            className="font-family-secondary mb-2"
            style={{ fontSize: "1.5rem" }}
          >
            Change Image 2
          </Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              setImage2(e.target.value);
            }}
          />
          {image2 ? (
            <Image
              fluid={true}
              alt={`${product.name} Image 2`}
              src={product.image2}
              style={{ width: "100%" }}
              className="mt-2"
            />
          ) : (
            <div className="no-image">
              <p>No Image</p>
            </div>
          )}
        </Form.Group>
        <Form.Group controlId="image3">
          <Form.Label
            className="font-family-secondary mb-2"
            style={{ fontSize: "1.5rem" }}
          >
            Change Image 3
          </Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              setImage3(e.target.value);
            }}
          />
          <Image
            fluid={true}
            alt={`${product.name} Image 3`}
            src={product.image3}
            style={{ width: "100%" }}
            className="mt-2"
          />
        </Form.Group>

        <Button
          type="submit"
          className="w-100"
          style={{ backgroundColor: "#0095f6" }}
        >
          Edit
        </Button>
      </Form>}
    </div>
  );
};

export default EditProductForm;
