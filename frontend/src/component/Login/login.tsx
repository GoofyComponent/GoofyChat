import React from 'react'
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import "../Login/login.css";

export default function login(props: { onFormSwitch: (arg0: string) => void; }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(email);
  }
  
  return (

<>
    <form onSubmit={handleSubmit} className=' mx-auto p-4'>
      <h4 className=' text-md-center mb-4 text-primary'> Connexion </h4>
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
     <button className='mt-2 text-center' onClick={() => props.onFormSwitch('register')}> Don't have an account ? Resgister here  </button>
     </form>
</>
  )
}
