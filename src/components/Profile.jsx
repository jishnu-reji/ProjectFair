import { Collapse } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import uploadProImg from '../images/uploadProfile.png'
import { SERVER_URL } from '../services/serverURL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProfileAPI } from '../services/allAPI';


function Profile() {

  const [preview,setPreview] = useState("")
  const [existingImg,setExistingImg] = useState("")
  const [userdetails,setUserDetails]=useState({
    username:"",email:"",password:"",github:"",linkedin:"",profileImage:""
  })

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const existingUserDetails = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({
        ...userdetails,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,github:existingUserDetails.github,linkedin:existingUserDetails.linkedin
      }) 
      setExistingImg(existingUserDetails.profile)
    }
  },[open])

  useEffect(()=>{
    if(userdetails.profileImage){
      setPreview(URL.createObjectURL(userdetails.profileImage))
    }
    else{
      setPreview("")
    }
  },[userdetails.profileImage])

  const handleUserProfile = async ()=>{
    const {username,email,password,github,linkedin,profileImage} = userdetails
    if(github&&linkedin){
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImg)

      const token = sessionStorage.getItem("token")

      if(token){
        const reqHeader = {
          "Content-Type" : preview?"multipart/form-data":"application/json",
          "Authorization" : `Bearer ${token}`
        }

        try{
          const result = await editProfileAPI(reqBody,reqHeader)
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          }
          else{
            console.log(result);
          }
        }
        catch(err){
          console.log(err);
        }

      }
    }
    else{
      toast.warning("Please fill the form completely!!!")
    }
  }

  return (
    <>
      <div className="w-100 p-2">
        <div className="d-flex justify-content-between">
          <h3 className='text-warning'>User Profile</h3>
          <button onClick={() => setOpen(!open)} className='btn'><i className="fa-solid fa-chevron-down"></i></button>
        </div>
        <Collapse in={open}>
        <div className='row justify-content-center mt-3 shadow rounded p-2' id="example-collapse-text">
          <label className='text-center'>
            <input type="file" onChange={(e)=>setUserDetails({...userdetails,profileImage:e.target.files[0]})} style={{display:'none'}}/>
            {existingImg == ""?
              <img width={'150px'} height={'150px'} className='rounded-circle' src={preview?preview:uploadProImg} alt="" />
              :
              <img width={'150px'} height={'150px'} className='rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="" />
            }
          </label>
          <div className='mt-2'>
            <input type="text" value={userdetails.github} onChange={(e)=>setUserDetails({...userdetails,github:e.target.value})} className='form-control' placeholder='GitHub URL'/>
          </div>
          <div className='mt-2'>
            <input type="text" value={userdetails.linkedin} onChange={(e)=>setUserDetails({...userdetails,linkedin:e.target.value})} className='form-control' placeholder='LinkedIn URL'/>
          </div>
          <div className='mt-2 d-grid'>
            <button onClick={handleUserProfile} className="btn btn-warning">Update Profile</button>
          </div>
        </div>
      </Collapse>
      <ToastContainer position="top-center" theme="colored" autoClose={3000}/>
      </div>
      
    </>
  )
}

export default Profile