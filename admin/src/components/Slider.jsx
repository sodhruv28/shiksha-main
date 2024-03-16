import Card from 'react-bootstrap/Card';

function ImgOverlayExample() {
  return (
    <div>
    <Card style={{width:"100%",height:"500px"}} className=" text-white">
      <Card.Img style={{marginLeft:"35px",width:"97%",height:"500px"}} src="/images/p3.jpg" alt="Card image" />
      <Card.ImgOverlay>
      <Card style={{height:"35%", width:"40%",marginLeft:"50%", marginTop:"5%"}}>
           <Card.Title style={{marginTop:"30px", marginLeft:"20px"}}><h1 style={{fontFamily:"cursive", fontSize:"30px"}}>Study Online  , Teach Online</h1></Card.Title>
           <Card.Text style={{marginTop:"1px", marginLeft:"20px",fontFamily:"revert-layer", fontSize:"14px" }}>
             "Empower your mind with the freedom to learn from anywhere.
              Study online, and let knowledge transcend boundaries."
           </Card.Text>
           <Card.Text style={{marginLeft:"20px"}}>Powred by Shiksha</Card.Text>
          </Card>
       
      </Card.ImgOverlay>
    </Card>
    </div>
  );
}

export default ImgOverlayExample;