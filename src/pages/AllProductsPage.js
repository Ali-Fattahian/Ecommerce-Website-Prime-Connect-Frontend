import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFetchProductsFilters,
  fetchBrands,
  fetchCategories,
  fetchProducts,
  fetchSubCategories,
  updateFetchProductsFilters,
} from "../store/slices/productSlice";
import NavbarComponent from "../components/NavbarComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/esm/Button";
import Product from "../components/Product";
import Message from "../components/Message";
import Footer from "../components/Footer";

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const {
    allProducts,
    allSubCategories,
    brands,
    productFilters,
    allCategories,
  } = products;
  const [brand, setBrand] = useState(productFilters.brandFilter);
  const [subCategory, setSubCategory] = useState(
    productFilters.subCategoryFilter
  );
  const [category, setCategory] = useState(productFilters.categoryFilter);
  const [ordering, setOrdering] = useState(productFilters.orderBy);
  const [hasDiscount, setHasDiscount] = useState(productFilters.hasDiscount);
  const [search, setSearch] = useState(productFilters.searchQuery);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const filters = {
      searchQuery: search,
      brandFilter: brand,
      subCategoryFilter: subCategory,
      categoryFilter: category,
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

    if (allCategories.length === 0) {
      dispatch(fetchCategories());
    }

    if (brands.length === 0) {
      dispatch(fetchBrands());
    }
    dispatch(fetchProducts());
  }, [dispatch, brands.length, allSubCategories.length, allCategories.length]);

  return (
    <>
      <NavbarComponent />
      <Row
        style={{ padding: "48px 45px", paddingBottom: "0" }}
        id="all-products__filter"
      >
        <Col className="p-0">
          <Accordion id="all-products-accordion">
            <Accordion.Header className="border-bottom-lt">
              <i
                className="fa fa-filter"
                style={{ fontSize: "25px", color: "var(--bs-black)" }}
              ></i>
            </Accordion.Header>
            <Accordion.Body>
              <Form
                id="products-form"
                className="p-4 pt-2"
                onSubmit={formSubmitHandler}
              >
                <Form.Group className="mt-2">
                  <Form.Select
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                    value={brand}
                  >
                    <option value="">Brand</option>
                    {brands.map((x, index) => (
                      <option value={x} key={index}>
                        {x}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Select
                    onChange={(e) => {
                      setSubCategory(e.target.value);
                    }}
                    value={subCategory}
                  >
                    <option value="">No Filter</option>{" "}
                    {/* Empty string is the default value, gets chosen if there is nothing here */}
                    {allSubCategories.map((x) => (
                      <option value={x.name} key={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Select
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    value={category}
                  >
                    <option value="">No Filter</option>
                    {allCategories.map((x) => (
                      <option value={x.name} key={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Control
                    value={search}
                    type="search"
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearch(e.target.value.trim());
                    }}
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label>Sort By</Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      setOrdering(e.target.value);
                    }}
                    value={ordering}
                  >
                    <option value="">-------</option>
                    <option value="rating">Rating</option>
                    <option value="name">Name - Ascending</option>
                    <option value="-name">Name - Descending</option>
                    <option value="price">Price - Ascending</option>
                    <option value="-price">Price - Descending</option>
                    <option value="-createdAt">New Products</option>
                    <option value="createdAt">Old Products</option>
                  </Form.Select>
                </Form.Group>
                <Form.Check
                  className="mt-3"
                  label="Discount"
                  checked={hasDiscount}
                  onChange={(e) => {
                    setHasDiscount(e.target.checked);
                  }}
                />
                <Button
                  type="submit"
                  variant="primary"
                  style={{
                    color: "var(--bs-secondary)",
                    border: "none",
                  }}
                  className="w-100 mt-4"
                >
                  Filter
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearch("");
                    dispatch(clearFetchProductsFilters());
                  }}
                  type="reset"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--bs-black)",
                  }}
                  className="w-100 mt-2"
                >
                  Clear
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion>
        </Col>
      </Row>
      <Row id="homepage-new-products">
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product.id} className="mb-3">
              <Product product={product} key={product.id} />
            </Col>
          ))
        ) : (
          <Message variant="info">
            No product was found with the current filters
          </Message>
        )}
      </Row>
      <Footer />
    </>
  );
};

export default AllProductsPage;
