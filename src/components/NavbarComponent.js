import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";

const NavbarComponent = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const cartItemsNumber = cartItems.reduce(
    (sum, item) => (sum += item.productQuantity),
    0
  );

  const dispatch = useDispatch();

  useEffect(() => {}, [cart]);

  return (
    <Navbar
      bg="secondary"
      expand="lg"
      variant="light"
      fixed="top"
      id="main-navbar"
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <h4 id="website-brand-1">PrimeConnect</h4>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto d-flex justify-content-between w-100 align-items-center"
            id="nav-link__container"
          >
            <NavLink to="/">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="202"
                height="36"
              >
                <path
                  fill="#588b8b"
                  d="M23.883,15.9l-6.594,0l-1.302,0l0,14.763l1.302,0l0-7.392l6.594,0q1.596,0,2.646-1.05t1.05-2.625q0-1.428-1.05-2.541q-1.113-1.155-2.646-1.155z M23.883,21.969l-6.594,0l0-4.767l6.594,0q0.966,0,1.701,0.693q0.693,0.735,0.693,1.701q0,0.987-0.693,1.68q-0.735,0.693-1.701,0.693z M36.50064,23.229l1.575,0q1.596,0,2.646-1.05t1.05-2.646q0-1.407-1.05-2.52q-1.113-1.155-2.646-1.155l-6.573,0l-1.302,0l0,14.742l1.302,0l0-7.371l3.423,0l4.473,7.371l1.575,0z M31.50264,21.927l0-4.746l6.573,0q0.966,0,1.701,0.693q0.693,0.693,0.693,1.659q0,1.008-0.693,1.701q-0.735,0.693-1.701,0.693l-6.573,0z M44.91828,30.621l1.323,0l0-14.763l-1.323,0l0,14.763z M49.53492,30.558l1.302,0l0-8.883q0-1.764,1.344-3.108t3.108-1.344q1.722,0,3.108,1.344q1.323,1.323,1.323,3.108l0,8.883l1.344,0l0-8.883q0-1.806,1.344-3.108q1.344-1.344,3.087-1.344q1.764,0,3.108,1.344t1.344,3.108l0,8.883l1.302,0l0-8.883q0-2.394-1.68-4.074t-4.074-1.68q-1.575,0-2.961,0.861q-1.407,0.882-2.016,2.247q-0.819-1.407-2.205-2.247q-1.449-0.861-3.024-0.861q-2.373,0-4.053,1.68q-1.701,1.701-1.701,4.074l0,8.883z M75.73956,26.568q0-1.008,0.714-1.827q0.714-0.861,1.722-0.861l0.273,0l3.927,0l0-1.302l-3.927,0l-0.273,0q-1.071-0.21-1.7535-0.924t-0.6825-1.701q0-1.239,0.7245-1.9635t1.9845-0.7245l7.14,0l0-1.323l-7.14,0q-1.617,0-2.814,1.197q-1.197,1.155-1.197,2.814q0,1.05,0.399,1.911t1.176,1.239q-0.777,0.567-1.176,1.491t-0.399,1.974q0,1.638,1.197,2.793q1.218,1.218,2.814,1.218l7.14,0l0-1.386l-7.14,0q-1.26,0-1.9845-0.714t-0.7245-1.911z"
                />
                <path
                  fill="#0095f6"
                  d="M104.3402,30.6l0-1.323l-3.738,0q-2.604,0-4.368-1.764t-1.764-4.368q0-2.394,1.764-4.116t4.368-1.722l3.738,0l0-1.365l-3.738,0q-3.171,0-5.313,2.1q-2.142,2.079-2.142,5.103q0,3.213,2.142,5.313q2.1,2.142,5.313,2.142l3.738,0z M112.90484,15.9q-2.373,0-4.074,1.701q-1.722,1.722-1.722,4.095l0,3.171q0,2.331,1.722,4.053t4.074,1.722q2.373,0,4.095-1.722q1.701-1.701,1.701-4.053l0-3.171q0-2.394-1.701-4.095t-4.095-1.701z M117.39884,21.696l0,3.171q0,1.911-1.344,3.213q-1.323,1.26-3.15,1.26t-3.129-1.26q-1.344-1.302-1.344-3.213l0-3.171q0-1.764,1.344-3.15q1.344-1.344,3.129-1.344q1.764,0,3.15,1.344q1.344,1.386,1.344,3.15z M121.78448,30.6l1.302,0l0-8.904q0-1.764,1.344-3.15q1.344-1.344,3.108-1.344t3.15,1.344q1.344,1.386,1.344,3.15l0,8.904l1.302,0l0-8.904q0-2.394-1.701-4.095t-4.095-1.701q-2.352,0-4.053,1.701t-1.701,4.095l0,8.904z M136.50212,30.6l1.302,0l0-8.904q0-1.764,1.344-3.15q1.344-1.344,3.108-1.344t3.15,1.344q1.344,1.386,1.344,3.15l0,8.904l1.302,0l0-8.904q0-2.394-1.701-4.095t-4.095-1.701q-2.352,0-4.053,1.701t-1.701,4.095l0,8.904z M152.47976,26.568q0-1.008,0.714-1.827q0.714-0.861,1.722-0.861l0.273,0l3.927,0l0-1.302l-3.927,0l-0.273,0q-1.071-0.21-1.7535-0.924t-0.6825-1.701q0-1.239,0.7245-1.9635t1.9845-0.7245l7.14,0l0-1.323l-7.14,0q-1.617,0-2.814,1.197q-1.197,1.155-1.197,2.814q0,1.05,0.399,1.911t1.176,1.239q-0.777,0.567-1.176,1.491t-0.399,1.974q0,1.638,1.197,2.793q1.218,1.218,2.814,1.218l7.14,0l0-1.386l-7.14,0q-1.26,0-1.9845-0.714t-0.7245-1.911z M175.9124,30.6l0-1.323l-3.738,0q-2.604,0-4.368-1.764t-1.764-4.368q0-2.394,1.764-4.116t4.368-1.722l3.738,0l0-1.365l-3.738,0q-3.171,0-5.313,2.1q-2.142,2.079-2.142,5.103q0,3.213,2.142,5.313q2.1,2.142,5.313,2.142l3.738,0z M189.45404,15.9l-11.382,0l0,1.281l5.166,0l0,13.461l1.302,0l0-13.461l4.914,0l0-1.281z"
                />
              </svg>
            </NavLink>
            <div id="shopping-cart-icon__container">
              <NavLink to="/cart">
                <span
                  className="fa-stack has-badge"
                  style={{ fontSize: '20px', marginBottom: '8px' }}
                  data-count={`${cartItemsNumber}`}
                >
                  <ShoppingCartIcon />
                </span>
              </NavLink>
            </div>
            <div
              id="nav-item__container"
              className={userInfo ? "" : "nav-flex-row"}
            >
              <NavLink id="nav-link" to="/all-products/">
                Products
              </NavLink>
              {/* Links should be blocks in smaller screens */}
              {userInfo ? (
                <NavDropdown title={userInfo.fullname} id="user-dropdown-menu">
                  {/* <NavDropdown.Item href={`/users/${userInfo.id}/edit`}>Profile</NavDropdown.Item> */}
                  <NavDropdown.Item>
                    <NavLink to={`/users/${userInfo.id}/edit`}>Profile</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as="button"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink to={`/login?redirect=${window.location.pathname}`}>
                  Login
                </NavLink>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavLink id="admin-panel" to="/admin/dashboard/">
                  Dashboard
                </NavLink>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
