import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import axios from "axios";
import NavbarComponent from "../components/NavbarComponent";
import { deleteProduct } from "../store/slices/productSlice";
import Message from "../components/Message";

const ProductsListPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchProducts = async (token) => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/products", {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProductHandler = (id) => {
    const token = userInfo.token;
    if (window.confirm("Are you sure you want to delete this product?"))
      dispatch(deleteProduct({ id, token }));
    window.location.reload();
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchProducts(userInfo.token);
    } else {
      navigate("/login");
    }
  }, [userInfo]);
  return (
    <>
      <NavbarComponent />
      <Container id="user-list__container">
        {error && <Message variant="danger">{error.message}</Message>}
        <h1 className="mt-4 font-family-secondary txt--black">PRODUCTS</h1>
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm mt-4"
          id="user-list-table"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>SUB CATEGORY</th>
              <th>USER</th>
              <th>COUNT IN STOCK</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.subCategory.name}</td>
                <td>{product.user}</td>
                <td>{product.countInStock}</td>
                <td>
                  <LinkContainer to={`/edit-products/${product.id}`}>
                    <Button variant="light" className="btn-sm">
                      <i
                        className="fa fa-edit"
                        style={{ fontSize: "20px" }}
                      ></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    style={{
                      color: "black",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    className="btn-sm"
                    type="submit"
                    onClick={() => {
                      deleteProductHandler(product.id);
                    }}
                  >
                    <i className="fa fa-trash" style={{ fontSize: "20px" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ProductsListPage;
