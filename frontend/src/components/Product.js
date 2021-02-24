import React from 'react';
import { Card, CardImg } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating'


const Product = ({ product }) => {
  return (
    <Card className='h-90 my-4 p-2'>
      <Link to={`/product/${product._id}`}>
        <CardImg src={product.image} style={{height:'260px'}} />
      </Link>
      <Card.Body>
      <Link to={`/product/${product._id}`}>
          <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
      </Link>
      <Card.Text as='div'>
       <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </Card.Text>
      <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
};

export default Product;
