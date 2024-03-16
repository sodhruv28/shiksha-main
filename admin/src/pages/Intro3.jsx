// import React from 'react'

// export const Intro3 = () => {
//   return (
    
//     <div  className="col-md-6 col-lg-6" style={{textAlign:"center", marginLeft:"200px"}}>
//       <div><img style={{height:"400px",width:"400px",fontSize:"30px",color:"black",textAlign:"inherit",float:"left" }} src="images\img-06.jpg" alt="" srcset="" /></div>
//       <p> <h1>“I’m proud to wake up knowing my work is helping 
//         people around the world improve their careers and build great things. 
//         While being a full-time instructor is hard work, it lets you work when, where, and how you want.” </h1></p>
        
//     </div>
    
//   )
// }
import Carousel from 'react-bootstrap/Carousel';

import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DarkVariantExample() {
  return (
    <div>
      <div>
    <Row>
        <Col><Carousel style={{height:"200px",width:"500px",marginLeft:"100px"}} data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="\images\img-06.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="\images\img-06.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="\images\img-06.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel></Col>
        <Col style={{textAlign:"center", marginTop:"200px", marginRight:"20px"}}> <p> <h1>“I’m proud to wake up knowing my work is helping 
         people around the world improve their careers and build great things. 
         While being a full-time instructor is hard work, it lets you work when, where, and how you want.” </h1></p>
        </Col>
      </Row>
      </div>
<div style={{marginTop:"200px"}}>
     <Row>
        <Col><img  style={{width:"400px",height:"400px",textAlign:"center"}} src="\images\img03.jpg" alt="" srcset="" /></Col>
        <Col> <Card style={{ width: '50rem',height:"30rem", marginTop:"40px"}}>
      <Card.Body>
        <Card.Title>Introduction</Card.Title>
        <Card.Text style={{fontSize:"20px",textAlign:"matchparenet",textAlign:"center"}}>
        You won’t have to do it alone
        <p style={{height:"400px",width:"400px",textAlign:"center",fontSize:"20px"}}>Our Instructor Support Team is here to answer your questions and review your test video, 
          while our Teaching Center gives you plenty of resources to help you through the process. 
          Plus, get the support of experienced instructors in our online community.
        </p>
        
        </Card.Text>
      </Card.Body>
      {/* <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
      
      </ListGroup> */}
      {/* <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body> */}
    </Card> </Col>
        <Col><img  style={{width:"400px",height:"400px",textAlign:"center"}} src="\images\img03.jpg" alt="" srcset="" /></Col>
      </Row>


</div>




      </div>
    
    
      );
    }
    
export default DarkVariantExample;