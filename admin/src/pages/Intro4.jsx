
// import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import CardImg from 'react-bootstrap/esm/CardImg';

// function TextExample() {
//   return (
//    <div>
//     <div>
//     <Card style={{ width: '90rem' , height:"200px", marginLeft:"300px"}}>
//       <Card.Body>
//          <Row>
//         < Col>
//         <img style={{height:"150px",width:"150px"}} src="\images\h4.jpg" alt="" srcset="" />
//         </Col>
//         <Col><Card.Title>Create an Engaging Course</Card.Title> 
       
//         <Card.Text>
//           Whether you've been teaching for years or are teaching for the first time,you 
//           can make an engaging course.We've complied resources and best practices to help you
//           get to the next level,no matter where you're starting.
//           <div>
//           <Card.Link href="#">Get Started</Card.Link>  
//           </div>
//         </Card.Text></Col>
        
//       </Row>
//         {/* <Card.Title>Card Title</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text> */}
//         {/* <Card.Link href="#">Card Link</Card.Link>
//         <Card.Link href="#">Another Link</Card.Link> */}
        
//       </Card.Body>  
      
//       {/* <Row>

//         <Col>
//         <img style={{height:"150px",width:"150px"}} src="\images\h3.jpg" alt="" srcset="" />
//         </Col>
//         <Col><Card.Title>Create an Engaging Course</Card.Title>
//         <Card.Text>
//           Whether you've been teaching for years or are teaching for the first time,you 
//           can make an engaging course.We've complied resources and best practices to help you
//           get to the next level,no matter where you're starting.
//           <div>
//           <Card.Link href="#">Get Started</Card.Link>  
//           </div>
        
//         </Card.Text></Col>
      
//         <Col>2 of 2</Col>
//       </Row> */}
//     </Card>
//     </div>
//     <div>
//     <Card style={{ width: '90rem' , height:"200px", marginLeft:"300px",marginTop:"100px"}}>
//       <Card.Body>
//          <Row>
//         < Col>
//         <img style={{height:"150px",width:"150px"}} src="\images\h4.jpg" alt="" srcset="" />
//         </Col>
//         <Col><Card.Title>Create an Engaging Course</Card.Title> 
       
//         <Card.Text>
//           Whether you've been teaching for years or are teaching for the first time,you 
//           can make an engaging course.We've complied resources and best practices to help you
//           get to the next level,no matter where you're starting.
//           <div>
//           <Card.Link href="#">Get Started</Card.Link>  
//           </div>
//         </Card.Text></Col>
        
//       </Row>
//         {/* <Card.Title>Card Title</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text> */}
//         {/* <Card.Link href="#">Card Link</Card.Link>
//         <Card.Link href="#">Another Link</Card.Link> */}
        
//       </Card.Body>  
      
//       { <Row>

//         <Col>
//         <img style={{height:"150px",width:"150px"}} src="\images\h3.jpg" alt="" srcset="" />
//         </Col>
//         <Col><Card.Title>Create an Engaging Course</Card.Title>
//         <Card.Text>
//           Whether you've been teaching for years or are teaching for the first time,you 
//           can make an engaging course.We've complied resources and best practices to help you
//           get to the next level,no matter where you're starting.
//           <div>
//           <Card.Link href="#">Get Started</Card.Link>  
//           </div>
        
//         </Card.Text></Col>
      
//         <Col>2 of 2</Col>
//       </Row> }
//     </Card>
//     </div>
//     </div>
    
//   );
// }

// export default TextExample;
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import CardImg from 'react-bootstrap/esm/CardImg';
 import Button from 'react-bootstrap/Button';

function TextExample() {
  return (
   <div>
    <div>
    <Card style={{width: '90%' , height:"90px", marginLeft:"80px", marginTop:"20px"}}>
    <Row>
      
        <Col className='h4' style={{marginTop:"30px", marginLeft:"50px"}}>Jump Into Course Creation</Col>
        <Col style={{marginTop:"30px", marginLeft:"50px"}} ><Button style={{height:"30px", width:"140px", marginLeft:"50%"}} variant="primary">Create Your Course</Button></Col>
        
      </Row>
      </Card>
    </div>
    <div>
      <h3 style={{textAlign:"center", margin:"50px"}} >
      Based On Your Experience , We Think These Resource Will Be Helpful. 
      </h3>
    </div>
    <div>
    <Card style={{ width: '90%' , marginTop:"20px",marginLeft:"80px"}}>
      <Card.Body>
         <Row>
        < Col>
        <img style={{height:"150px",width:"150px",marginLeft:"140px",marginBottom:"30px"}} src="\images\h4.jpg" alt="" srcset="" />
        </Col>
        <Col style={{marginTop:"30px"}}><Card.Title style={{textAlign:"center",fontSize:"20px"}}>Create an Engaging Course</Card.Title>  
       
        <Card.Text>
          <h4 style={{margin:"20px", fontSize:"15px"}}  >
          Whether you've been teaching for years or are teaching for the first time,you 
          can make an engaging course.We've complied resources and best practices to help you
          get to the next level,no matter where you're starting.</h4>
          <div>
          <Card.Link style={{marginLeft:"200px"}} href="#">Get Started</Card.Link>  
          </div>
        </Card.Text></Col>
        
      </Row>
       </Card.Body>  
      
       
    </Card>
    </div>

    <div style={{marginTop:"50px"}}>
    <Row>
        <Col>
<Card style={{ width: '70rem' , height:"200px", marginLeft:"0px", marginTop:"20px"}}>
      <Card.Body>
         <Row>
        < Col>
        <img style={{height:"150px",width:"150px",marginLeft:"140px",marginBottom:"30px"}} src="\images\h3.jpg" alt="" srcset="" />
        </Col>
        <Col style={{marginTop:"30px"}}><Card.Title style={{textAlign:"center",fontSize:"20px"}}>Get Started With Video</Card.Title> 
       
        <Card.Text style={{textAlign:"center",marginTop:"20px",fontSize:"15px"}}>
          Quality video lectures can set your course apart.
          Use our resource to learn the basics.
          <div>
          <Card.Link href="#">Get Started</Card.Link>  
          </div>
        </Card.Text></Col>
        
      </Row>
       </Card.Body>  
      
       
    </Card>
        </Col>
        <Col>
        <Card style={{ width: '70rem' , height:"200px", marginLeft:"0px", marginTop:"20px"}}>
      <Card.Body>
         <Row>
        < Col>
        <img style={{height:"150px",width:"150px",marginLeft:"100px",marginBottom:"30px"}} src="\images\h5.jpg" alt="" srcset="" />
        </Col>
        <Col style={{marginTop:"30px"}}><Card.Title style={{textAlign:"center",fontSize:"20px"}}>Build Your Audience</Card.Title> 
       
        <Card.Text style={{textAlign:"center",marginTop:"15px",fontSize:"15px"}}>
          Set your course up for success bu building your audience.
          <div>
          <Card.Link href="#">Get Started</Card.Link>  
          </div>
        </Card.Text></Col>
        
      </Row>
       </Card.Body>  
      
       
    </Card>
        </Col>
      </Row>

    </div>

    <div>
      <Card style={{width:"90%", marginLeft:"80px", marginTop:"50px"}} >
      <Card.Body>
          <Row>
        <Col>
        <img  style={{width:"150px",height:"150px",marginLeft:"230px"}} src="\images\9649836_7408.jpg" alt="" srcset="" />
        </Col>
        
        <Col><Card.Title style={{textAlign:"center",fontSize:"20px"}}>Join The New Instructor Challenge!</Card.Title> 
       
        <Card.Text>
          <div>
            <h5 style={{marginTop:"20px",fontSize:"15px"}}>
          Get exclusive tips and resources designed to help you launch your
          first course faster! Eligible instructor who publish their first course on time will receive a special
          bonus to celebrate. Start today!
          </h5>
          </div>
       <div>
       <Card.Link style={{marginLeft:"280px"}} href="#">Get Started</Card.Link>
          </div>
        </Card.Text></Col>
      </Row>
      </Card.Body> 
      </Card>
    </div>
    </div>

    
  );
}

export default TextExample;