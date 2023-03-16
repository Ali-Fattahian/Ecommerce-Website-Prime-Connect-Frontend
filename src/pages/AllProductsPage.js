import React, { useEffect, useState } from "react";
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
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/esm/Button";
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
  const [search, setSearch] = useState(productFilters.searchQuery)

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const filters = {
      searchQuery: search,
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
      <Row className="p-4" id="all-products__filter">
        <Col>
          <Accordion>
            <Accordion.Header>
              <i className="fa fa-filter" style={{fontSize: '25px'}}></i>
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
                    <option value="">Sub Category</option>{" "}
                    {/* Empty string is the default value, gets chosen if there is nothing here */}
                    {allSubCategories.map((x) => (
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
                    onChange={(e) => {setSearch(e.target.value.trim())}}
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
                className="mt-3"
                  label="Discount"
                  checked={hasDiscount}
                  onChange={(e) => {
                    setHasDiscount(e.target.checked);
                  }}
                />
                <Button type="submit" style={{backgroundColor: "#0095f6", border: 'none'}} className="w-100 mt-4">
                  Filter
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearch('')
                    dispatch(clearFetchProductsFilters());
                  }}
                  type="reset"
                  style={{backgroundColor: 'transparent', color: "black"}}
                  className="w-100 mt-2"
                >
                  Clear
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion>
        </Col>
      </Row>
      <Row className="p-4 pt-0">
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
              <Product product={product} key={product.id} />
            </Col>
          ))
        ) : (
          <Message variant="info">No product was found with the current filters</Message>
        )}
      </Row>
    </>
  );
};

export default AllProductsPage;
