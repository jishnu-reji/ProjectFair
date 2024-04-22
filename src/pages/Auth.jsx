import React, { useContext, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from "../services/allAPI";
import { tokenAuthContext } from "../contexts/TokenAuth";


function Auth({ insideRegister }) {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const [userInputs,setUserInputs] = useState({
    username:"",email:"",password:""
  })

  console.log(userInputs);

  const handleRegister= async(e)=>{
    e.preventDefault()
    if(userInputs.username && userInputs.email && userInputs.password){
      try{
        const result = await registerAPI(userInputs)
        console.log(result);
        if(result.status==200){
          toast.success(`Welcome ${result.data.username}..Please login to explore our website`)
          setUserInputs({username:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/login')
          },2000)
        }
        else{
          toast.error(result.response.data)
          setUserInputs({username:"",email:"",password:""})
        }
      }catch(err){
        console.log(err);
      }
    }
    else{
      toast.warning("Please fill the form completely")
    }
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    if(userInputs.email && userInputs.password){
      try{
        const result = await loginAPI(userInputs)
        if(result.status==200){
          //store existing user and token
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)
          toast.success(`Welcome ${result.data.existingUser.username}...`)
          setUserInputs({username:"",email:"",password:""})
          setTimeout(() => {
            navigate('/')
          }, 2000);
        }
        else{
          toast.error(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
    else{
      toast.warning("Please fill the form completely")
    }
  }
  
  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="container w-75">
        <Link style={{ textDecoration: "none" }} to={"/"}>
          {" "}
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>
        <div className="card shadow p-3">
          <div className="row">
            <div className="col-lg-6">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/mobile-login-5650377-4707996.png"
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <h1>
                <i class="fa-brands fa-docker me-2"></i>PROJECT FAIR
              </h1>
              <h5 className="fw-bolder mt-2">
                Sign {insideRegister ? "up" : "in"} to your Account
              </h5>
              {insideRegister &&
                <FloatingLabel className="mb-3" controlId="floatingUser" label="User Name">
                <Form.Control type="text" placeholder="User Name" value={userInputs.username} onChange={(e)=>setUserInputs({...userInputs,username:e.target.value})}/>
              </FloatingLabel>
              }
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" value={userInputs.email} onChange={(e)=>setUserInputs({...userInputs,email:e.target.value})}/>
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" value={userInputs.password} onChange={(e)=>setUserInputs({...userInputs,password:e.target.value})}/>
              </FloatingLabel>
              {
                insideRegister ?
                <div className="mt-3">
                  <button onClick={handleRegister} className="btn btn-primary">Register</button>
                  <p className="mt-2">Alredy have an accout? <Link className="text-info" to={'/login'}>Log in</Link></p>
                </div>
                :
                <div className="mt-5">
                  <button onClick={handleLogin} className="btn btn-primary">Log in</button>
                  <p className="mt-2">Alredy have an accout? <Link className="text-info" to={'/register'}>Register</Link></p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoClose={3000}/>
    </div>
  );
}

export default Auth;
