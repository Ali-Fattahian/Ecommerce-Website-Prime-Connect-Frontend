import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarComponent = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex justify-content-between w-100 align-items-center">
            <Nav.Link href="#link">
              <h4>Brand</h4>
            </Nav.Link>
            <div style={{display:'flex'}}>
              <Nav.Link href="#link"><i className="fa fa-shopping-cart fa-2x"></i></Nav.Link> {/* Add the number of items in the cart here */}
            </div>
            <div style={{display:'flex'}}>
              <Nav.Link href="#link">Products</Nav.Link> {/* Links should be blocks in smaller screens */}
              <Nav.Link href="#link">Some_Dude@gmail.com</Nav.Link>
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Users</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Products
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Orders
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
