import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function AutoLayoutExample() {
  return (
    <Card style={{ width:"90%", marginLeft:"80px"}}>
      <Row>
        <Col>
        <img src="\images\p1.jpg" alt="" srcset="" />
        </Col>

        <Col>
      
   
      <Card.Body>
        <Card.Title style={{textAlign:"center"}}><h1>Teach On Shiksha</h1></Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{textAlign:"center", margin:"10px"}}><h2>share your skills and help students to achive their goal</h2></Card.Subtitle>
        <Card.Text className='h3'>
       <li style={{margin:"50px"}}>We extend a warm invitation to passionate and dedicated teachers to join our online platform and contribute to the journey of knowledge dissemination. </li> 
        <li style={{margin:"50px"}}>
        we strive to create an innovative and collaborative space where educators can inspire and empower students worldwide.
        </li>
        
        <li style={{margin:"50px"}}> If you possess a deep commitment to education, expertise in your field, and a desire to embrace the digital realm of learning, we welcome you to be a part of our dynamic community.</li>
        </Card.Text>
        <Link to ="/ap">
        <Button style={{marginLeft:"200px", height:"40px", width:"300px", marginBottom:"50px"}} variant="warning"><h3>Get Started</h3></Button>
        </Link>
      </Card.Body>
    
        </Col>
      </Row>
      </Card>
   
  );
}

export default AutoLayoutExample;
// style={{ width: '50rem', marginLeft:"20px" , marginTop:"100px"}}