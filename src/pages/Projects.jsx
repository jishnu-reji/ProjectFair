import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { getallProjectsAPI } from '../services/allAPI'

function Projects() {

  const [searchKey,setSearchKey] = useState("")
  const [allProjects,setAllProjects] = useState([])
  console.log(allProjects);

  useEffect(()=>{
    getAllProjects()
  },[searchKey])

  const getAllProjects = async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization" : `Bearer ${token}`
    }
      try{
        const result = await getallProjectsAPI(searchKey,reqHeader)
        console.log(result);
        if(result.status==200){
          setAllProjects(result.data)
        }
      }
      catch(err){
        console.log(err);
      }
  }

  return (

    <>
      <Header/>
      <div style={{marginTop:'150px'}} className="container-fluid">
        <div className="d-flex justify-content-between">
          <h1>All Projects</h1>
          <div><input onChange={(e)=>setSearchKey(e.target.value)} type="text" className='ms-auto form-control' placeholder='Search projects by language'/></div>
        </div>
        <Row className="my-3">
          {allProjects?.length>0?
            allProjects.map(project=>(
              <Col key={project} className='mb-3' sm={12} md={6} lg={4}>
              <ProjectCard displayData={project}/>
            </Col>
            ))
            :
            <div className='fw-bolder text-danger m-5 '>Projects Not Found!!!</div>
          }
        </Row>
      </div>
    </>
  )
}

export default Projects