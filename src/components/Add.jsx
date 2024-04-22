import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import uploadImg from '../images/uploadimage.webp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';

function Add() {

  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [preview,setPreview]= useState("")
  const [imageFileStatus,setImageFileStatus] = useState(false)
  const [projectDetails,setProjectDetails] = useState({
    title:"",language:"",overview:"",github:"",website:"",projectImage:""
  })
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setProjectDetails({
      title:"",language:"",overview:"",github:"",website:"",projectImage:""
    })
  }
  const handleShow = () => setShow(true);
  console.log(projectDetails);

  useEffect(()=>{
    if(projectDetails.projectImage.type=="image/png"||projectDetails.projectImage.type=="image/jpg"||projectDetails.projectImage.type=="image/jpeg"){
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
    else{
      setImageFileStatus(false)
      setProjectDetails({...projectDetails,projectImage:""})
      setPreview(uploadImg)
    }
  },[projectDetails.projectImage])

  const handleUpload = async()=>{
    const{title,language,overview,github,website,projectImage} = projectDetails
    if(title&&language&&overview&&github&&website&&projectImage){
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)

      const token = sessionStorage.getItem("token")

      if(token){
        const reqHeader = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }

        //API call
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            setAddResponse(result)
            handleClose()
          }
          else{
            toast.warning(result.response.data)
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
      <button onClick={handleShow} className='btn'><i className="fa-solid fa-plus me-1"></i>Add New</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                <img height={'200px'} className='img-fluid' src={preview} alt="" />
              </label>
              {!imageFileStatus && <div className='text-danger'>*Upload only the following file types (png, jpg, jpeg) here!!!</div>}
            </div>
            <div className="col-lg-8">
              <div className='mb-2'>
                <input type="text" value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} className="form-control" placeholder='Project Title'/>
              </div>
              <div className='mb-2'>
                <input type="text" value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} className="form-control" placeholder='Languages used in the Project'/>
              </div>
              <div className='mb-2'>
                <input type="text" value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} className="form-control" placeholder='Project GITHUB Link'/>
              </div>
              <div className='mb-2'>
                <input type="text" value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} className="form-control" placeholder='Project Website Link'/>
              </div>
              <div>
                <input type="text" value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} className="form-control" placeholder='Project Overview'/>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" theme="colored" autoClose={3000}/>
    </>
  )
}

export default Add