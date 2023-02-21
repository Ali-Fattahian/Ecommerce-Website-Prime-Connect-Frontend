import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";

const NavbarComponent = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartItemsNumber = cartItems.reduce((sum, item) => sum += item.productQuantity, 0)

  useEffect(() => {
  }, [cart]);

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex justify-content-between w-100 align-items-center">
            <Nav.Link href="#link">
              <h4>Brand</h4>
            </Nav.Link>
            <div style={{ display: "flex" }}>
              <Nav.Link href="/cart">
                <span className="fa-stack fa-2x has-badge" data-count={`${cartItemsNumber}`}>
                  <i className="fa fa-circle fa-stack-2x"></i>
                  <i
                    className="fa fa-shopping-cart fa-stack-2x red-cart"
                  ></i>
                </span>
              </Nav.Link>
            </div>
            <div style={{ display: "flex" }}>
              <Nav.Link href="#link">Products</Nav.Link>
              {/* Links should be blocks in smaller screens */}
              <Nav.Link href="#link">Some_Dude@gmail.com</Nav.Link>
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Users</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Products</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Orders</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
