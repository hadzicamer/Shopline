import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getDetails,updateUsUser } from '../actions/userActions';
import{USER_UPDATE_US_RESET} from '../constants/userConst'

const UserEditScreen = ({match,history}) => {
  const userId=match.params.id
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setisAdmin] = useState(false);

  const dispatch=useDispatch()
  const userDetails=useSelector(state=>state.userDetails)
  const{loading,error,user}=userDetails

  const userUpdateUs=useSelector(state=>state.userUpdateUs)
  const{loading:loadingUp,error:errorUp,success:successUp}=userUpdateUs

  useEffect(() => {
      if(successUp){
          dispatch({type:USER_UPDATE_US_RESET})
          history.push('/admin/userList')
      }
      else{
          if(!user.name || user._id!==userId){
              dispatch(getDetails(userId))
          }else{
              setName(user.name)
              setEmail(user.email) 
              setisAdmin(user.isAdmin)
          }
      }
  }, [dispatch,history,userId,user,successUp]);

  const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(updateUsUser({_id:userId,name,email,isAdmin}))
  }
  return (
      <>
      <Link to='/admin/userList' className='btn btn-light my-3'>Go back</Link>
    <FormContainer>
      <h1>Edit user</h1>
      {loadingUp&& <Loader></Loader>}
      {errorUp && <Message variant='danger'>{errorUp}</Message>}
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
        <FormGroup controlId='email'>
          <FormLabel>Email adress</FormLabel>
          <FormControl
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId='isAdmin'>
          <FormCheck
            type='checkbox'
            label='Admin?'
            checked={isAdmin}
            onChange={(e) => setisAdmin(e.target.checked)}
          ></FormCheck>
        </FormGroup>

      
        <Button type='submit' variant='primary'>Update</Button>
      </Form>
      )}
    </FormContainer>
      </>
  );
};

export default UserEditScreen;
