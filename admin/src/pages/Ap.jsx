import React, { useRef } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const Ap = () => {
  const getVerifiedRef = useRef(null);

  const scrollToGetVerified = () => {
    getVerifiedRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div style={{ margin: "50px" }}>
      <div>
        <div>
          <Card
            style={{ width: "100%", height: "500px" }}
            className=" text-white"
          >
            <Card.Img src="/images/p5.jpg" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title
                style={{
                  marginTop: "150px",
                  marginLeft: "50px",
                  textAlign: "left",
                }}
              >
                <h1 style={{ fontSize: "70px" }}>
                  Come teach <ul>with us</ul>
                </h1>
              </Card.Title>
              <Card.Text
                style={{
                  marginTop: "10px",
                  marginLeft: "50px",
                  fontSize: "30px",
                  textAlign: "left",
                }}
              >
                Become an instructor and change
                <ul> lives — including your own </ul>
                  <Button
                    style={{
                      width: "250px",
                      height: "50px",
                      marginTop: "20px",
                      fontSize: "15px",
                    }}
                    variant="dark"
                    onClick={scrollToGetVerified} // Call the function to scroll to "Get Verified" button
                  >
                    Get Started
                  </Button>
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </div>
      </div>
      <div
        className="h1"
        style={{
          fontStyle: "initial",
          fontSize: "40px",
          textAlign: "center",
          marginTop: "250px",
        }}
      >
        SO Many Reasons To Start
      </div>
      <div>
        <CardGroup style={{ marginTop: "50px" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              style={{ height: "200px", width: "200px", marginLeft: "100px" }}
              variant="top"
              src="\images\st1.jpg"
            />
            <Card.Body>
              <Card.Title style={{ fontSize: "30px", textAlign: "center" }}>
                Teach your way
              </Card.Title>
              <Card.Text
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Publish the course you want, in the way you want, and always
                have control of your own content.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              style={{ height: "200px", width: "200px", marginLeft: "100px" }}
              variant="top"
              src="\images\st2.jpg"
            />
            <Card.Body>
              <Card.Title style={{ fontSize: "30px", textAlign: "center" }}>
                Inspire learners
              </Card.Title>
              <Card.Text
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Teach what you know and help learners explore their interests,
                gain new skills, and advance their careers.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img
              style={{ height: "200px", width: "200px", marginLeft: "100px" }}
              variant="top"
              src="\images\st3.jpg"
            />
            <Card.Body>
              <Card.Title style={{ fontSize: "30px", textAlign: "center" }}>
                {" "}
                Get rewarded
              </Card.Title>
              <Card.Text
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Expand your professional network, build your expertise, and earn
                money on each paid enrollment.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
      <div
        className="h1"
        style={{
          fontStyle: "initial",
          fontSize: "50px",
          textAlign: "center",
          margin: "50px",
        }}
      >
        How to Begin
       </div>
      {/*<Row style={{ height: "500px", width: "100%", marginLeft: "200px" }}>
        <Col>
          <p style={{ margin: "center", fontSize: "20px", margin: "50px" }}>
            <li>You start with your passion and knowledge.</li>
            <li style={{ margin: "10px" }}>
              Then choose a promising topic with the help of our Marketplace
              Insights tool.
            </li>
          </p>
          <p style={{ fontSize: "20px", margin: "Center" }}>
            The way that you teach — what you bring to it — is up to you.
          </p>
          <h2 className="h1" style={{ margin: "20px" }}>
            How we help you
          </h2>
          <h3>
            <li>
              We offer plenty of resources on how to create your first course.
            </li>
            <li>
              And, our instructor dashboard and curriculum pages help keep you
              organized.
            </li>
          </h3>
        </Col>
        <Col>
          <img
            style={{ height: "380px", width: "60%" }}
            src="\images\img-6.jpg"
            alt=""
            srcset=""
          />
        </Col>
      </Row> */}

      <div>
        <div>
          <Row>
            <Col>
              <img
                style={{ width: "400px", height: "400px", textAlign: "center" }}
                src="\images\img03.jpg"
                alt=""
                srcset=""
              />
            </Col>
            <Col>
              <Card.Body
                style={{ width: "50rem", height: "30rem", marginTop: "40px" }}
              >
                <Card.Title
                  style={{
                    fontStyle: "initial",
                    fontSize: "40px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  You won’t have to do it alone
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "20px",
                    textAlign: "matchparenet",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      height: "400px",
                      width: "400px",
                      textAlign: "center",
                      marginLeft: "50px",
                      fontSize: "20px",
                    }}
                  >
                    Our Instructor Support Team is here to answer your questions
                    and review your test video, while our Teaching Center gives
                    you plenty of resources to help you through the process.
                    Plus, get the support of experienced instructors in our
                    online community.
                  </p>
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Link
                  style={{ marginLeft: "50px", fontSize: "20px" }}
                  href="#"
                >
                  Need More Detalis Before You Start?. Learn More
                </Card.Link>
              </Card.Body>
            </Col>
            <Col>
              <img
                style={{ width: "400px", height: "400px", textAlign: "center" }}
                src="\images\img03.jpg"
                alt=""
                srcset=""
              />
            </Col>
          </Row>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#dfe7e8",
          textAlign: "center",
          margin: "70px",
        }}
        ref={getVerifiedRef} // Assign the ref to the "Get Verified" button
      >
        <h1 style={{ fontSize: "45px", fontStyle: "initial", margin: "30px" }}>
          <ul>Become an instructor today</ul>
        </h1>
        <h2 style={{ fontSize: "20px", margin: "20px" }}>
          Join one of the world’s largest online learning<ul> marketplaces.</ul>
        </h2>
        <Link to="/teachform">
        <Button
            style={{
              width: "250px",
              height: "50px",
              margin: "30px",
              fontSize: "15px",
            }}
            variant="dark"
          >
            Get Verified
          </Button>
        </Link>
      </div>
    </div>
  );
};
