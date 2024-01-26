import React from 'react'
import Product from './Product';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

const BestSelling = () => {
    const productList=useSelector(state=>state.productList)
    const {error,loading,products,page,pages}=productList;


  return (
    <div className='my-5'>
        <div className='bs_container1'/>
        <div className='bs_container'>
            <h4 className='p-3 font-weight-bold text-white'>BEST SELLING <br/> PRODUCT</h4>
            <Row >
            {products?.slice(0, 4).map((product) => (
                <Col key={product._id} sm={6} md={3}>
                  <Product product={product} bs={false} />
                </Col>
            ))}
            </Row>
         </div>
        <div className='bs_container2'/>
    </div>
  )
}

export default BestSelling