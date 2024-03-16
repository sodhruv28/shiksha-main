import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


export const Techsuc = () => {
  return (
    <div>
      <Row>
        <Col>
          <img
            style={{ marginTop: "40px", marginLeft: "30px" }}
            src="images\suc.jpeg"
            alt=""
            srcset=""
          />
        </Col>
        <Col>
          <h1
            style={{
              marginLeft: "194px",
              marginTop: "15%",
              color: "orange",
              fontSize: "50px",
              fontFamily: "fantasy",
            }}
          >
            {" "}
            Thank You,{" "}
          </h1>
          <h1
            style={{
              marginLeft: "194px",
              color: "black",
              fontSize: "40px",
              fontFamily: "fantasy",
              marginTop: "8px",
            }}
          >
            {" "}
            Teacher...{" "}
          </h1>
          <h1
            style={{
              marginLeft: "194px",
              fontSize: "40px",
              fontFamily: "sans-serif",
              marginTop: "15px",
            }}
          >
            {" "}
            You have{" "}
          </h1>
          <h1
            style={{
              marginLeft: "194px",
              fontSize: "30px",
              fontFamily: "sans-serif",
            }}
          >
            {" "}
            Successfully Registered{" "}
          </h1>
          <p
            style={{
              marginLeft: "195px",
              fontSize: "20px",
              fontFamily: "cursive",
              marginTop: "15px",
            }}
          >
            Your Respone Will Be updated Within 24 hours , and will be reflected
            in your profile
          </p>
          <Link to="/">
            <Button
              style={{
                marginLeft: "300px",
                marginTop: "25px",
                height: "40px",
                width: "200px",
              }}
              size="lg"
              variant="warning"
            >
              Back To Home
            </Button>{" "}
          </Link>{" "}
        </Col>
      </Row>
    </div>
  );
};

export default Techsuc;