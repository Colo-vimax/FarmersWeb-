import React from 'react'
import {Card} from "react-bootstrap"
import Rating from './Rating';
import {Link} from "react-router-dom"
const Product = (props) => {
const {_id,name,image,price,rating,numReviews}=props.product;
    return (
       <Card className={props.bs ? "my-3 p-3 text-white" : "my-3 p-3"} bg={props.bs ? "primary" : ""} >
         <Link to={`/product/${_id}`}>
         <Card.Img src={`http://127.0.0.1:8000/${image}`} height={"200px"} />
         </Link>
         <Card.Body>
            <Link to={`/product/${_id}`}>
                <Card.Title as="div"  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <strong>{name}</strong> 
                </Card.Title>
            </Link>  
            <Card.Text as="div">
                <div className='my-3'>
                 <Rating value={rating} text={`${numReviews} reviews`} color={'#f8e825'}/>
                </div>
            </Card.Text> 
            <Card.Text as="h3">
              Ksh{price}
            </Card.Text>
         </Card.Body>
       </Card> 
    )
}

export default Product
