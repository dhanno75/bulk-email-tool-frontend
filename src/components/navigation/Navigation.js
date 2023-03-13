import React, { useEffect } from "react";
import "./navigation.css";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../images/logo.png";

const Navigation = () => {
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userLoggedIn");
    toast.warn("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div>
      <Navbar expand="lg" className="navi">
        <Container fluid>
          <Link to="#" className="nav-link home-link">
            <img src={Logo} alt="" className="navi-logo" />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {isLoggedIn ? (
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              ) : (
                ""
              )}

              {isLoggedIn ? (
                <Link to="/stats" className="nav-link">
                  Stats
                </Link>
              ) : (
                ""
              )}
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav
              className=" my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {isLoggedIn ? (
                ""
              ) : (
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              )}
              {isLoggedIn ? (
                <Button className="btns" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}

              {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
