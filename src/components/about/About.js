import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Banner from "../../images/project-banner.jpg";
import Banner from "../../images/project-banner1.jpg";
import "./about.css";

const About = () => {
  return (
    <div>
      <Container fluid className="about-wrapper">
        <Row>
          <Col sm={12} md={12} lg={5}>
            <div className="about-left">
              <h3>Hello, My name is</h3>
              <h2>Dhananjay</h2>
              <p>
                I created a tool to send bulk emails to your clients, friends
                and family. Please feel free to use it, and its completely free
                to use. Thank you!
              </p>
            </div>
          </Col>
          <Col sm={12} md={12} lg={7}>
            <div className="about-right">
              <img src={Banner} alt="" className="about-img" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
