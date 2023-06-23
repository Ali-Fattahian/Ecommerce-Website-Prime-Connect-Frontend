import React from "react";
import Product from "./Product";
import Message from "./Message";
import Col from 'react-bootstrap/Col'

const AllProductsList = ({ allProducts }) => {
  return (
    <>
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
    </>
  );
};

export default AllProductsList;
