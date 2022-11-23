import React from 'react'
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";

export default function register(props: { onFormSwitch: (arg0: string) => void; }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      console.log(email);
  }
  return (
    <div>
          <form onSubmit={handleSubmit} className=' mx-auto p-4'>
      <h4 className=' text-md-center mb-4 text-primary'> Register </h4>
      <div className="mb-3">
       <label htmlFor="name" className="form-label ">Full Name </label>
       <input 
       onChange={(e) => setEmail(e.target.value)}
       value = {name}
       type="" 
       className="form-control" 
       id="exampleInputName" />
     </div> 
     <div className="mb-3">
       <label htmlFor="exampleInputEmail1" className="form-label ">Email address </label>
       <input 
       onChange={(e) => setEmail(e.target.value)}
       value = {email}
       type="email" 
       className="form-control" 
       id="exampleInputEmail1" />
     </div>
     <div className="mb-3">
       <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
       <input
       onChange={(e) => setPass(e.target.value)}
       value = {pass}
       type="password" 
       className="form-control"
       id="exampleInputPassword1" />
     </div>
     <button type="submit" className="btn btn-outline-primary form-control mt-4 mb-2">Login </button>
     <button className='mt-2 text-center' onClick={() => props.onFormSwitch('login')}> Already have an account? Login here. </button>
     </form>
    </div>
  )
}
