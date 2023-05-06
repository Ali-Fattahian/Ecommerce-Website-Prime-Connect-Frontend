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

  const dispatch = useDispatch();

  useEffect(() => {}, [cart]);

  return (
    <Navbar bg="secondary" expand="lg" variant="light" fixed="top" id='main-navbar'>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <h4 id="website-brand-1">PrimeConnect</h4>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto d-flex justify-content-between w-100 align-items-center"
            id="nav-link__container"
          >
            <Nav.Link href="/">
              <h4 id="website-brand-2">PrimeConnect</h4>
            </Nav.Link>
            <div id="shopping-cart-icon__container">
              <Nav.Link href="/cart">
                <span
                  className="fa-stack fa-2x has-badge"
                  data-count={`${cartItemsNumber}`}
                >
                  <i className="fa fa-circle fa-stack-2x"></i>
                  <i className="fas fa-shopping-cart fa-stack-2x"></i>
                </span>
              </Nav.Link>
            </div>
            <div
              id="nav-item__container"
              className={userInfo ? "" : "nav-flex-row"}
            >
              <Nav.Link id="nav-link" href="/all-products/">
                Products
              </Nav.Link>
              {/* Links should be blocks in smaller screens */}
              {userInfo ? (
                <NavDropdown title={userInfo.fullname} id="user-dropdown-menu">
                  {/* <NavDropdown.Item href={`/users/${userInfo.id}/edit`}>Profile</NavDropdown.Item> */}
                  <NavDropdown.Item href={`/users/${userInfo.id}/edit`}>
                    Profile
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
                <Nav.Link href={`/login?redirect=${window.location.pathname}`}>Login</Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <Nav.Link id="admin-panel" href="/admin/dashboard/">
                  Admin Panel
                </Nav.Link>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
