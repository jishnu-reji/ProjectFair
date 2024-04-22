import React, { useEffect, useState } from "react";
import image from "../images/Admin1.webp";
import ProjectCard from "../components/ProjectCard";
import { Link, useNavigate } from "react-router-dom";
import image1 from '../images/Image (1).png'
import image2 from '../images/Image (2).png'
import image3 from '../images/Image (3).png'
import image4 from '../images/Image (4).png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gethomeProjectsAPI } from "../services/allAPI";

function Home() {
    
  const [loginStatus,setLoginStatus]= useState(false)
  const [homeProjects,setHomeProjects] = useState([])
  const navigate = useNavigate()
  console.log(homeProjects);

  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setLoginStatus(true)
    }
    else{
      setLoginStatus(false)
    }
  },[])


  const handleProjects=()=>{
    if(loginStatus){
      navigate('/projects')
    }
    else{
      toast.warning("Please login to get full access!!!")
    }
  }

  const getHomeProjects=async()=>{
    try{
      const result = await gethomeProjectsAPI()
      console.log(result);
      if(result.status==200){
        setHomeProjects(result.data)
      }
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div style={{ height: "100vh" }} className="">
        <div className="container">
          <div className="row">
            <div
              style={{ height: "100vh" }}
              className="col-lg-6 d-flex flex-column justify-content-center"
            >
              <h1 style={{fontSize:'50px'}}><i class="fa-brands fa-docker me-2"></i>PROJECT FAIR</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                nobis, rerum iure quibusdam nesciunt sunt quo vero sit deleniti.
                Fugit repellat, quaerat officiis eveniet cum minus voluptas ab
                tempora doloribus? Labore totam pariatur repellat dicta
                accusamus obcaecati magni reiciendis possimus aut rerum,
                perspiciatis sit voluptatum, aliquam unde ducimus soluta,
                dolores ut non. 
              </p>
              <div>
                {
                  loginStatus?
                  <Link to={'/dashboard'} className="btn btn-warning">Manage your Projects<i class="fa-solid fa-arrow-right ms-2"></i></Link>:
                  <Link to={'/login'} className="btn btn-warning">Explore more<i class="fa-solid fa-arrow-right ms-2"></i></Link>
                }
              </div>
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
              <img className="pp" style={{width:"600px"}} src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div  className="text-center">
        <h2>Explore Our Projects</h2>
        <marquee behavior="" direction="">
          <div className="d-flex">
            {homeProjects?.length>0 &&
              homeProjects.map(project=>(
                <div key={project} className="my-4 me-5">
                  <ProjectCard displayData={project} />
                </div>
              ))
            }
            
          </div>
        </marquee>
        <button onClick={handleProjects} className="btn btn-link mt-3">Click here to view more Projects</button>
      </div>
      <div className="container mt-3 mb-5">
        <h2 className="text-center mb-4">Clint Reviews</h2>
        <div className="row">
          <div className="col-lg-3">
            <div className="card d-flex justify-content-center align-items-center flex-column p-3">
              <img style={{height:'70px'}} src={image1} alt="" />
              <h4>Max miller</h4>
              <div className="d-flex justify-content-center mb-2">
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star "></i>
                <i className="fa-solid fa-star "></i>
              </div>
              <p style={{textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur rerum neque molestias dolorem amet sit provident aspernatur ex doloremque.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card d-flex justify-content-center align-items-center flex-column p-3">
              <img style={{height:'70px'}} src={image2} alt="" />
              <h4>Annie Mary</h4>
              <div className="d-flex justify-content-center mb-2">
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
              </div>
              <p style={{textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur rerum neque molestias dolorem amet sit provident aspernatur ex doloremque.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card d-flex justify-content-center align-items-center flex-column p-3">
              <img style={{height:'70px'}} src={image3} alt="" />
              <h4>James Bond</h4>
              <div className="d-flex justify-content-center mb-2">
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p style={{textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur rerum neque molestias dolorem amet sit provident aspernatur ex doloremque.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card d-flex justify-content-center align-items-center flex-column p-3">
              <img style={{height:'70px'}} src={image4} alt="" />
              <h4>Dashamoolam Damu</h4>
              <div className="d-flex justify-content-center mb-2">
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p style={{textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur rerum neque molestias dolorem amet sit provident aspernatur ex doloremque.</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoClose={3000}/>
    </>
  );
}

export default Home;
