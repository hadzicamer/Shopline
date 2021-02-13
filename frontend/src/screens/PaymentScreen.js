import React, { useState } from 'react';
import { Form, Button, Col, FormGroup, FormLabel, FormCheck } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({history}) => {

    const cart=useSelector(state=>state.cart)
    const{shippingAddress}=cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [payment,setPayment]=useState('PayPal')
    
    const dispatch=useDispatch()

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(payment))
        history.push('/placeOrder')
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment method</h1>
        <Form onSubmit={submitHandler}>
           <FormGroup>
           <FormLabel as='legend'>Select method:
           </FormLabel>
           <Col>
           <FormCheck type='radio' label='PayPal or credit card' id='PayPal' name='payment' value='PayPal' checked 
           onChange={(e)=>setPayment(e.target.value)}></FormCheck>
           </Col>
       </FormGroup>
        <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
}


export default PaymentScreen;