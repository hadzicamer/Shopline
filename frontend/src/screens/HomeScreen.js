import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
import { Link } from 'react-router-dom';


const HomeScreen = ({match}) => {
  const keyword=match.params.keyword
  const pageNumber=match.params.pageNumber || 1

  const dispatch = useDispatch();

  const productList=useSelector(state=>state.productList)
  const {loading,error,products,page,pages}=productList

  useEffect(() => {
    dispatch(listProducts(keyword,pageNumber));
  }, [dispatch,keyword,pageNumber]);

  return (
      <>
     <Meta/>
    {!keyword ?( <ProductCarousel/>):(<Link to='/' className='btn btn-light'>Go back</Link>)}
    <br></br>
      <strong style={{fontSize:'30px'}}>Latest products</strong>
      {loading ? <Loader>loading...</Loader>:error?<Message variant='danger'>{error}</Message>:
      <>
      <Row>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
    <Paginate pages={pages} page={page} keyword={keyword ? keyword:''}/>
    </>
      }
      
    </>
  );
};

export default HomeScreen;
