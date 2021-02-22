import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck, FormFile } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {listProductDetails,updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConst';

const ProductEditScreen = ({match,history}) => {
  const productId=match.params.id
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);


  const dispatch=useDispatch()
  const productDetails=useSelector(state=>state.productDetails)
  const{loading,error,product}=productDetails

  const productUpdate=useSelector(state=>state.productUpdate)
  const{loading:loadingUpdate,error:errorUpdate,success:successUpdate}=productUpdate

  useEffect(() => {
      if(successUpdate){
          dispatch({type:PRODUCT_UPDATE_RESET})
          history.push('/admin/productList')
      }else{
          if(!product.name || product._id!==productId){
              dispatch(listProductDetails(productId))
          }else{
              setName(product.name)
              setPrice(product.price) 
              setImage(product.image)
              setBrand(product.brand)
              setCategory(product.category)
              setCountInStock(product.countInStock)
              setDescription(product.description)
          }
      }
  }, [dispatch,history,productId,product,successUpdate]);

  const uploadFileHandler=async(e)=>{
    const file=e.target.files[0]
    const formData=new FormData()
    formData.append('image',file)
    setUploading(true)

    try {
      const config={
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      const {data}=await axios.post('/api/upload',formData,config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }

  }

  const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(updateProduct({
          _id:productId,
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock
      }))
  }
  return (
      <>
      <Link to='/admin/productList' className='btn btn-light my-3'>Go back</Link>
    <FormContainer>
      <h1>Edit product</h1>
      {loadingUpdate && <Loader></Loader>}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

      {loading ? <Loader></Loader>:error?<Message variant='danger'>{error}</Message>:(
      <Form onSubmit={submitHandler}>
      <FormGroup controlId='name'>
          <FormLabel>Name</FormLabel>
          <FormControl
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId='price'>
          <FormLabel>Price</FormLabel>
          <FormControl
            type='number'
            placeholder='Enter price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId='image'>
        <FormLabel>Image</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter image url'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></FormControl>
          <FormFile id='image-file' label='Choose file' custom onChange={uploadFileHandler}> 
          {uploading && <Loader/>}
          </FormFile>
        </FormGroup>

        <FormGroup controlId='brand'>
        <FormLabel>Brand</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId='countInStock'>
        <FormLabel>Count in stock</FormLabel>
          <FormControl
            type='number'
            placeholder='Enter count in stock'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId='category'>
        <FormLabel>Category</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId='description'>
        <FormLabel>Description</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></FormControl>
        </FormGroup>
      
        <Button type='submit' variant='primary'>Update</Button>
      </Form>
      )}
    </FormContainer>
      </>
  );
};

export default ProductEditScreen;
