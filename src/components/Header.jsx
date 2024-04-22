import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/TokenAuth'

function Header({insideDashboard}) {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const logout = ()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }
  return (
    <>
      <Navbar style={{zIndex:"10"}} className="card position-fixed w-100 top-0">
        <Container>
          <Navbar.Brand className='fw-bolder text-white'><i class="fa-brands fa-docker me-2"></i>PROJECT FAIR</Navbar.Brand>
          {insideDashboard &&
          <div className="ms-auto">
            <button onClick={logout} className='btn btn-link'>Logout <i className="fa-solid fa-arrow-right"></i></button>
          </div>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header