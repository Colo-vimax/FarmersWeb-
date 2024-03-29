import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {LinkContainer} from "react-router-bootstrap"
import { Table,Button,Row,Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {listProducts,deleteProduct,createProduct} from "../actions/productActions"
import {PRODUCT_CREATE_RESET} from "../constants/productConstants"
import Paginate from '../components/Paginate'

const ProductListScreen = ({keyw}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch();

    const productList=useSelector(state=>state.productList);
    const {loading,error,products,pages,page}=productList;

    const productDelete=useSelector(state=>state.productDelete);
    const {success:successDelete,loading:loadingDelete,error:errorDelete}=productDelete;

    const productCreate=useSelector(state=>state.productCreate);
    const {product:createdProduct,success:successCreate,loading:loadingCreate,error:errorCreate}=productCreate;


    const userLogin=useSelector(state=>state.userLogin);
    const {userInfor}=userLogin;

   
    let keyword =window.location.hash !== "#/productlist" ? window.location.hash.split('#/productlist')[1] : '';
    
    // let key=keyw.keyword
    // console.log('key=',key)

    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfor.isAdmin){
            navigate('/login')
        }
        if(successCreate){
            navigate(`/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts(keyword));
        }
        
    },[keyword,dispatch,userInfor,successDelete,successCreate,createdProduct,navigate])

    const deleteHandler=(id)=>{
        if(window.confirm("Are u sure u want 2 delete this product ?")){
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler=()=>{
        dispatch(createProduct())
    }
    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                   <Button className="my-3" onClick={createProductHandler}>
                       <i className="fas fa-plus"></i> Create Product
                   </Button>
                </Col>
            </Row>
            {loadingDelete && (<Loader/>)}
            {errorDelete && (<Message variant={'danger'}>{errorDelete}</Message>)}

            {loadingCreate && (<Loader/>)}
            {errorCreate && (<Message variant={'danger'}>{errorCreate}</Message>)}

            {loading ? (<Loader/>) :
            error ? (<Message variant={'danger'}>{error}</Message>):
            (
                <div>
               <Table striped bordered hover responsive className='table-sm'>
                   <thead>
                       <tr>
                       <th>ID</th>
                       <th>NAME</th>
                       <th>PRICE</th>
                       <th>CATEGORY</th>
                       <th>BRAND</th>
                       <th></th>
                       </tr>
                   </thead>
                   <tbody>
                       {products.map((product)=>(
                           <tr key={product._id}>
                               <td>{product._id}</td>
                               <td>{product.name}</td>
                               <td>${product.price}</td>
                               <td>{product.category}</td>
                               <td>{product.brand}</td>
                            
                                 <td>
                                     <LinkContainer to={`/product/${product._id}/edit`}>
                                         <Button variant='light' className='btn-sm'>
                                         <i className='fas fa-edit'></i>
                                          </Button>
                                     </LinkContainer>

                                     <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                         <i className='fas fa-trash'></i>
                                     </Button>
                                 </td>
                           </tr>
                       ))}
                   </tbody>
               </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
               </div>
            )}
        </div>
    )
}


export default ProductListScreen
