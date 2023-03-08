import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";


const NavbarComponent = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const cartItemsNumber = cartItems.reduce(
    (sum, item) => (sum += item.productQuantity),
    0
  );

  const dispatch = useDispatch()

  useEffect(() => {}, [cart]);

  return (
    <Navbar bg="primary" expand="lg" variant="dark" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <h4 id="website-brand-1">Brand</h4>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex justify-content-between w-100 align-items-center" id="nav-link__container">
            <Nav.Link href="/">
              <h4 id="website-brand-2">Brand</h4>
            </Nav.Link>
            <div id="shopping-cart-icon__container">
              <Nav.Link href="/cart">
                <span
                  className="fa-stack fa-2x has-badge"
                  data-count={`${cartItemsNumber}`}
                >
                  <i className="fa fa-circle fa-stack-2x"></i>
                  <i className="fa fa-shopping-cart fa-stack-2x red-cart"></i>
                </span>
              </Nav.Link>
            </div>
            <div id="nav-item__container" className={userInfo ? '': 'nav-flex-row'}>
              <Nav.Link id="nav-link" href="/all-products/">Products</Nav.Link>
              {/* Links should be blocks in smaller screens */}
              {userInfo ? (
                <NavDropdown title={userInfo.fullname} id="user-dropdown-menu">
                  {/* <NavDropdown.Item href={`/users/${userInfo.id}/edit`}>Profile</NavDropdown.Item> */}
                  <NavDropdown.Item href={`/users/${userInfo.id}/edit`}>Profile</NavDropdown.Item>
                  <NavDropdown.Item as="button" onClick={() => {dispatch(logout())}}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && <NavDropdown title="Admin" id="admin-dropdown-menu">
                <NavDropdown.Item href="/admin/user-list">Users</NavDropdown.Item>
                <NavDropdown.Item href="/admin/product-list">Product List</NavDropdown.Item>
                <NavDropdown.Item href="/admin/order-list">Orders</NavDropdown.Item>
              </NavDropdown>}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
