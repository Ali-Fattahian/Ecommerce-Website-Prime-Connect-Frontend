import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Product from "./Product";
import axios from "axios";
import Message from "./Message";

const NewProducts = () => {
  const [newProductsError, setNewProductsError] = useState(null);
  const [newProducts, setNewProducts] = useState([]);
  const config = useSelector((state) => state.config)
  const { baseURL } = config;

  const fetchNewProducts = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/products/new-products`);
      setNewProducts(data);
    } catch (err) {
      setNewProductsError(
        "There was a problem loading the products, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    fetchNewProducts()
  }, [])

  return (
    <>
      {!newProductsError && newProducts.length > 0 ? (
        newProducts.map((product) => (
          <Col sm={12} md={6} lg={3} xl={3} key={product.id}>
            <Product product={product} />
          </Col>
        ))
      ) : (
        <Message variant="info">No new product was found</Message>
      )}
    </>
  )
}

export default NewProducts;
