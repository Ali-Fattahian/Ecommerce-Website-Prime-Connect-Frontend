import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFetchProductsFilters,
  fetchBrands,
  fetchProducts,
  fetchSubCategories,
  updateFetchProductsFilters,
} from "../store/slices/productSlice";
import NavbarComponent from "../components/NavbarComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Product from "../components/Product";
import Message from "../components/Message";

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { allProducts, allSubCategories, brands, productFilters } = products;
  const [brand, setBrand] = useState(productFilters.brandFilter);
  const [subCategory, setSubCategory] = useState(
    productFilters.subCategoryFilter
  );
  const [ordering, setOrdering] = useState(productFilters.orderBy);
  const [hasDiscount, setHasDiscount] = useState(productFilters.hasDiscount);
  const searchRef = useRef("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const filters = {
      searchQuery: searchRef.current.value.trim(),
      brandFilter: brand,
      subCategoryFilter: subCategory,
      orderBy: ordering,
      hasDiscount,
    };
    dispatch(updateFetchProductsFilters(filters));
    dispatch(fetchProducts());
  };

  useEffect(() => {
    if (allSubCategories.length === 0) {
      dispatch(fetchSubCategories()); // If the state is empty send a request maybe we have not done that before or it is actually empty in the backend
    }

    if (brands.length === 0) {
      dispatch(fetchBrands());
    }
    dispatch(fetchProducts());
  }, [dispatch, brands.length, allSubCategories.length]);

  return (
    <>
      <NavbarComponent />
      <Row className="p-4">
        <Col>
          <NavDropdown title={<i className="fa fa-filter"></i>}>
            <Form
              id="products-form"
              className="p-4 pt-2"
              onSubmit={formSubmitHandler}
            >
              <p style={{ fontSize: "1.5rem" }} className="mb-1">
                FILTERS
              </p>
              <Form.Group className="mt-2">
                <Form.Label>Brand</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                  value={brand}
                >
                  <option value="">-------</option>
                  {brands.map((x, index) => (
                    <option value={x} key={index}>
                      {x}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Sub Category</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                  }}
                  value={subCategory}
                >
                  <option value="">-------</option>{" "}
                  {/* Empty string is the default value, gets chosen if there is nothing here */}
                  {allSubCategories.map((x) => (
                    <option value={x.name} key={x.id}>
                      {x.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <p style={{ fontSize: "1.5rem" }} className="mb-1 mt-3">
                SEARCH
              </p>
              <Form.Group className="mt-2">
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  ref={searchRef}
                />
              </Form.Group>
              <p style={{ fontSize: "1.5rem" }} className="mb-1 mt-3">
                ORDERING
              </p>
              <Form.Group className="mt-2">
                <Form.Label>Order By</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setOrdering(e.target.value);
                  }}
                  value={ordering}
                >
                  <option value="">-------</option>
                  <option value="name">Name - Ascending</option>
                  <option value="-name">Name - Descending</option>
                  <option value="price">Price - Ascending</option>
                  <option value="-price">Price - Descending</option>
                  <option value="rating">Rating - Ascending</option>
                  <option value="-rating">Rating - Descending</option>
                  <option value="createdAt">New products</option>
                  <option value="-createdAt">Old products</option>
                </Form.Select>
              </Form.Group>
              <Form.Check
                label="Discount"
                checked={hasDiscount}
                onChange={(e) => {
                  setHasDiscount(e.target.checked);
                }}
              />
              <Button type="submit" variant="info">
                Submit
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(clearFetchProductsFilters());
                }}
                type="reset"
              >
                Clear
              </Button>
            </Form>
          </NavDropdown>
        </Col>
        <Col>
          <Container>
            {allProducts.length > 0 ? (
              allProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))
            ) : (
              <Message variant="info">No product was found</Message>
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default AllProductsPage;
