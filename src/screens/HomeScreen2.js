import React,{useEffect, useState} from 'react'
import {Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import Product from '../components/Product';
import {listProducts} from "../actions/productActions";
import Loader from '../components/Loader';
import Message from "../components/Message"
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel';
import Categories from '../components/Categories';
import BestSelling from '../components/BestSelling';
import Landing from '../components/Landing';

const HomeScreen2 = ({keyw}) => {
    const [category,setCategory]=useState(null);
    
    const dispatch=useDispatch()    
    
    const productList=useSelector(state=>state.productList)
    const {error,loading,products,page,pages}=productList;
    const [products1,setProducts]=useState(products)
    
     let keyword=window.location.hash !== "#/" ? window.location.hash.split('#')[1] : '';
     let key=keyw.keyword

    useEffect(()=>{
        dispatch(listProducts(keyword))
    },[dispatch,keyword,key])


    // Function to filter products by category
    const filterProductsByCategory = () => {
        if (category) {
        const filteredProducts = products.filter(product => product.category === category);
        setProducts(filteredProducts);
        }
    };
    
    // Call the function whenever the category state changes or as needed.
    useEffect(() => {
        filterProductsByCategory();
    }, [category]);


    return (
        <div>
          {/* {!key && <ProductCarousel/>} */}

            <Landing/>

            <Categories setCategory={setCategory}/>

            <BestSelling/>
            
            <section id="products">
                <h1 className='text-center text-capitalize'>{category ? category : "Latest Products"}</h1>
                {loading? <Loader/> 
                    :error? <Message variant={'danger'}>{error}</Message>
                    :
                    <div>
                    <Row>
                    {category ? products1.map((product)=>(
                    <Col key={product._id}  sm={12} md={6} lg={4} xl={3} >
                        <Product  product={product}/>
                    </Col>  
                    )) : products.map((product)=>(
                        <Col key={product._id}  sm={12} md={6} lg={4} xl={3} >
                            <Product  product={product}/>
                        </Col>  
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
                }
            </section>          
          
        </div>
    )
}

export default HomeScreen2