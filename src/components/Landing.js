import React from 'react'
import { Col, Row } from 'react-bootstrap'
import BG from "../images/farming.jpg"

const Landing = () => {
  return (
    <div className='mb-4'>
        <Row>
            <Col sm={12} md={6}>
          
              <div>
                <div className='p-3 mt-5' style={{marginBottom:"5rem"}}> 
                    <h1 className='display-1 font-weight-bolder text-uppercase'>Rooted in Tradition, <br/>Growing with Technology</h1>
                </div>
                {/* <img  src={BG2} width={"100%"}/> */}
              </div>
            </Col>
            <Col sm={12} md={6}>
            <div>
                <img src={BG} width={"100%"} height={"780px"}/>
              </div>
            </Col>
        </Row>
    </div>
  )
}

export default Landing