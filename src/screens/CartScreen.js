import React,{useEffect} from 'react'
import {Link,useLocation,useParams} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import {Row,Col,ListGroup,Image,Button,Form,Card} from "react-bootstrap"
import Message from "../components/Message";
import {addToCart,removeFromCart} from "../actions/cartActions"

const CartScreen = (props) => {

    const  userLogin=useSelector(state=>state.userLogin)
    const {userInfor} =userLogin;

    let location = useLocation();
    const params=useParams()
    const id=params.id;
    const qty=location.state && location.state.qty; 

    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)
    const {cartItems}=cart;

    useEffect(()=>{
        if(id){
            dispatch(addToCart(id,qty))
        }
    },[dispatch,id,qty])
    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id));
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ? (
                    <Message variant={'info'}>
                      <Link to="/" className='arrow btn'><i className='fas fa-arrow-left'></i></Link>
                      Your Cart is empty 
                    </Message>
                    )  : (
                        <ListGroup variant={"flush"}>
                            {
                                cartItems.map((item)=>(
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}>
                                                   {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={2}>
                                                ${item.price}
                                             </Col>
                
                                             <Col md={3}>
                                             <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e)=>dispatch(addToCart(item.product,e.target.value))}
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x)=>(
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                    }

                                                </Form.Control>
                                             </Col>
                                             <Col md={1}>
                                                 <Button type="button" variant="light"
                                                   onClick={()=>removeFromCartHandler(item.product)}
                                                 >
                                                     <i className="fas fa-trash"></i>
                                                 </Button>
                                             </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>

                    )

                }
                </Col> 
            <Col md={4}>
                <Card>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                           <h2>Subtotal ({cartItems.reduce((acc,item)=>acc+Number(item.qty),0)}) items</h2>
                           Ksh{cartItems.reduce((acc,item)=>acc+Number(item.qty)*item.price,0).toFixed(2)}
                         </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                    {/* /login?redirect=shipping */}
                        <Link to={!userInfor ? `/login?redirect=shipping` : `/shipping` }>
                        <Button
                        type="button"
                        className="btn-block"
                        disabled={cartItems.length === 0}
                        >
                       Proceed To Checkout
                        </Button>
                        </Link>
                    </ListGroup.Item>
                </Card>
            </Col>                       
        </Row>
    )
}

export default CartScreen
