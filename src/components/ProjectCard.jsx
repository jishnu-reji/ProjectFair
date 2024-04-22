import React, { useState } from 'react'
import {Card, Modal } from 'react-bootstrap'
import { SERVER_URL } from '../services/serverURL';


function ProjectCard({displayData}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
    <Card onClick={handleShow} style={{ width: '28rem' }}>
      <Card.Img style={{height:"250px"}} variant="top" src={`${SERVER_URL}/uploads/${displayData.projectImage}`} />
      <Card.Body>
        <Card.Title className='text-center'>{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>


    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <img className='img-fluid' src={`${SERVER_URL}/uploads/${displayData.projectImage}`} alt="" />
            </div>
            <div className="col-lg-6">
              <h3>{displayData?.title}</h3>
              <h5>Languages Used : {displayData?.language}</h5>
              <p style={{textAlign:'justify'}}> <span className='fw-bolder'>Description :</span>{displayData?.overview}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <div className="d-flex">
              <a href={displayData?.github} target='_blank' className='btn btn-secondary me-2'>
                <i class="fa-brands fa-github"></i>
              </a>
              <a href={displayData?.website} target='_blank' className='btn btn-secondary'>
                <i class="fa-solid fa-link"></i>
              </a>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default ProjectCard