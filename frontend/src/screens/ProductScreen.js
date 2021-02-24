import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem, FormControl, FormGroup, FormLabel,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails,productReviewCreate } from '../actions/productActions'
import{PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConst'
import Meta from '../components/Meta'

const ProductScreen = ({match,history}) => {
const [qty,setQty]=useState(1)
const [rating,setRating]=useState(0)
const [comment,setComment]=useState('')


 const dispatch=useDispatch()
const productDetails=useSelector(state=>state.productDetails)
const{loading,error,product}=productDetails

const userLogin=useSelector(state=>state.userLogin)
const{userInfo}=userLogin

const productCreateReview=useSelector(state=>state.productCreateReview)
const{success:successProductReview,error:errorProductReview}=productCreateReview


useEffect(()=>{
    if(successProductReview){
        alert('Review submitted!')
        setRating(0)
        setComment('')
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }
   dispatch(listProductDetails(match.params.id))
    },[dispatch,match,successProductReview])

    const submitHandler=()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitCommentHandler=(e)=>{
        e.preventDefault()
        dispatch(productReviewCreate(match.params.id,{
            rating,comment
        }))
    }
    return  <>
    <Link className='btn btn-dark my-3' to='/'>Go back</Link>
    {loading  ?(<Loader></Loader>):error?( <Message variant='danger'>{error}</Message>):(
        <>
        <Meta title={product.name}/>
 <Row>
 <Col md={6}>
<Image src={product.image} alt={product.name} fluid></Image>
 </Col>
 <Col md={3}>
     <ListGroup variant='flush'>
         <ListGroupItem>
             <h3>{product.name}</h3>

         </ListGroupItem>
         <ListGroupItem>
             <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
         </ListGroupItem>
         <ListGroupItem>
             Price: ${product.price}
         </ListGroupItem>
         <ListGroupItem>
            Description: {product.description}
         </ListGroupItem>
     </ListGroup>
 </Col>
 <Col md={3}>
     <Card>
         <ListGroup variant='flush'>
             <ListGroupItem>
                 <Row>
                     <Col>
                     Price:
                     </Col>
                     <Col>
                     <strong>${product.price}</strong>
                     </Col>
                 </Row>
             </ListGroupItem>
             <ListGroupItem>
                 <Row>
                     <Col>
                     Status:
                     </Col>
                     <Col>
                     {product.countInStock >0 ? 'In stock':'Out of stock'}
                     </Col>
                 </Row>
             </ListGroupItem>
             {product.countInStock >0 && (
                 <ListGroupItem>
                     <Row>
                         <Col>Qty</Col>
                         <Col>
                         <FormControl as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                             {
                             [...Array(product.countInStock).keys()].map(x=>(
                                 <option key={x+1} value={x+1}>
                                     {x+1}
                                 </option>
                             ))
}
                         </FormControl>
                         </Col>
                     </Row>
                 </ListGroupItem>
             )}

             <ListGroupItem>
                 <Button
                 onClick={submitHandler}
                 className='btn-block' type='button' disabled={product.countInStock===0}>
                     Add to cart
                 </Button>
             </ListGroupItem>
         </ListGroup>
     </Card>
 </Col>
</Row>
<Row>
    <Col md={6}>
        <h2>Reviews</h2>
        {product.reviews.length===0 && <Message>No reviews</Message>}
        <ListGroup variant='flush'>
            {product.reviews.map(review=>(
                <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}/>
                    <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                </ListGroupItem>
            ))}
            <ListGroupItem>
                <h2>Write a customer review</h2>
                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                {userInfo ?(
                    <Form onSubmit={submitCommentHandler}>
                        <FormGroup controlId='rating'>
                            <FormLabel>Rating</FormLabel>
                            <FormControl as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very good</option>
                                <option value='5'>5 - Excellent</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='comment'>
                            <FormLabel>Comment</FormLabel>
                            <FormControl as='textarea' row='3' value={comment} onChange={(e)=>setComment(e.target.value)}>
                            </FormControl>
                        </FormGroup>
                        <Button type='submit' variant='primary'>Submit</Button>
                    </Form>
                ):<Message>Please <Link to='/login'>sign in </Link>to write a review</Message>}
            </ListGroupItem>
        </ListGroup>
    </Col>
</Row>
</>
    )}
   
    </>

    }
export default ProductScreen