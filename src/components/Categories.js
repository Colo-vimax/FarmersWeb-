import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import IMG from "../images/farming.jpg"

const Categories = ({setCategory}) => {

  const hangleCategory=(category)=>{
    setCategory(category);
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

  }

  const FarmProduceCard = ({ category, description, calories, image }) => {
    return (
        <Card style={{width:"90%"}}>
          <Card.Body>
            <Card.Title>{category}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
    );
  };

  return (
    <div>
        <h2 className='text-center font-weight-bold'>CATEGORIES</h2>
        <Row>
            <Col md={"6"}>
              <div onClick={()=>hangleCategory("Fresh Produce")} className='mb-4'>
              <FarmProduceCard
                category="Fresh Produce"
                description="A variety of fresh fruits, vegetables, and herbs to keep you healthy and energized."
              />
              </div>

              <div onClick={()=>hangleCategory("Dairy and Eggs")}>
              <FarmProduceCard
                category="Dairy and Eggs"
                description="Fresh dairy products, eggs, and cheese for a nutritious and delicious diet."
               />
              </div>
            </Col>
            
            <Col md={'6'}>
               <div onClick={()=>hangleCategory("Grains and Pulses")} className='mb-4'>
               <FarmProduceCard
                category="Grains and Pulses"
                description="Nutrient-rich grains like rice and wheat, along with various lentils and beans."
                />
               </div>

               <div onClick={()=>hangleCategory("Specialty and Local Products")}>
               <FarmProduceCard
                category="Specialty and Local Products"
                description="Explore unique and locally sourced items, including honey, syrups, and organic products."
               />
               </div>
            </Col>
        </Row>
    </div>
  )
}

export default Categories