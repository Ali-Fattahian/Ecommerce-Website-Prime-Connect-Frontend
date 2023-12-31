import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import axios from "axios";
import SideNavbar from "../components/SideNavbar";
import { deleteProduct } from "../store/slices/productSlice";
import Message from "../components/Message";
import classes from "../pages/Admin/Admin.module.css";
import EllipsesIcon from "../icons/EllipsesIcon";
import EditIcon from "../icons/EditIcon";
import TrashIcon from "../icons/TrashIcon";

const ProductsListPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const config = useSelector((state) => state.config);
  const { baseURL } = config;
  const { userInfo } = user;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchProducts = async (token) => {
    try {
      const { data } = await axios.get(`${baseURL}/products`, {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProducts(data);
    } catch (err) {
      setError(
        "There was a problem loading the products, Make sure you have a stable internet connection"
      );
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
    <div className={classes["admin-page"]}>
      <div className={classes["admin-page-left"]}>
        <SideNavbar />
      </div>
      <div
        className={classes["admin-page-right"]}
        style={{ paddingTop: "2rem", paddingRight: "2rem" }}
      >
        <Container id="user-list__container" style={{ maxWidth: "960px" }}>
          {error && <Message variant="danger">{error.message}</Message>}
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <h1 className="mt-4 font-family-secondary txt--black">
                PRODUCTS
              </h1>
            </Col>
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className="d-flex justify-content-end align-items-end"
            >
              <Button
                type="submit"
                variant="primary"
                style={{ color: "var(--bs-secondary)" }}
                className="font-family-secondary p-2"
                id="new-product-btn"
                onClick={() => navigate("/admin/create-product")}
              >
                NEW PRODUCT
              </Button>
            </Col>
          </Row>
          <Table
            striped
            responsive
            bordered
            className="border-lt mt-4 table-dark table-hover"
            id="user-list-table"
            style={{ verticalAlign: "middle" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>SUB CATEGORY</th>
                <th>USER</th>
                <th>COUNT IN STOCK</th>
                <th className="text-center">
                  <EllipsesIcon />
                </th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
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
                          <EditIcon />
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
                        <TrashIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default ProductsListPage;
