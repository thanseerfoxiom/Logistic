import React, { useContext, useEffect, useState } from 'react'
import { ContextDatas } from '../../../services/Context';
import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Col ,Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { financePath } from '../../../services/UrlPaths';

export default function Details() {
    const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
    const navigate=useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setpageLoading(false);
    }, 1000); // 5000 milliseconds = 5 seconds

    // Cleanup function to clear the timer if the component unmounts or the dependency array changes
    return () => clearTimeout(timer);
}, []);
  return (
    <>
    {pageLoading ? (
      <Loader/>
    ) : (
      <div className={`contents  ${mobileSide ? "expanded" : ""}`}>
        <div className="demo2 mb-25 t-thead-bg">
          <div className="container-fluid">
         <div className="row">
  <div className="col-lg-12">
    <div className="breadcrumb-main">
      <h4 className="text-capitalize breadcrumb-title">Job Details</h4>
      <div className="breadcrumb-action justify-content-center flex-wrap">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
          <li className="breadcrumb-item">
        <span onClick={() => navigate(`/${financePath}`)} style={{ cursor: 'pointer' }}>
            <i className="uil uil-estate" /> Finance
        </span>
        </li>
            <li className="breadcrumb-item active" aria-current="page">Job Details</li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
  <div className="col-xxl-3 col-md-4  ">
    <aside className="profile-sider">
      <div className="card mb-25">
        <div className="card-body text-start pt-sm-30 pb-sm-30   px-25 pb-0">
          <div className="account-profile">
            
      <div className="product-details__availability">
  <div className="title">
    <p>JobId:</p>
    <span className="free">25561</span>
  </div>
  <div className="title">
    <p>Contact:</p>
    <span className="free">Furniture</span>
  </div>
  <div className="title">
    <p>email:</p>
    <span className="free"> Blue, Green, Light</span>
  </div>
</div>

            
          </div>
         
        </div>
      </div>
    
    </aside>
  </div>
  <div className="col-xxl-9 col-md-8">
    <div className="ap-tab ap-tab-header">
      <div className="card-body ">
      <div className="job-details__availability">
  <div className="title">
    <p>From:</p>
    <span className="free">kuwait</span>
  </div>
  <div className="title">
    <p>To:</p>
    <span className="free"> Dubai</span>
  </div>
  <div className="title">
    <p>distance:</p>
    <span className="free"> 125 KM</span>
  </div>
  <div className="title">
    <p>Quote Price:</p>
    <span className="free"> 5615 AED</span>
  </div>
  
  <div className="title">
    <p>Driver:</p>
    <span className="free"> AbCDE</span>
  </div>
  <div className="title">
    <p>Date:</p>
    <span className="free"> 24/07/2024</span>
  </div>
  <div className="title">
    <p>Product Details:</p>
    <span className="free"><div>
                <img
                  className=""
                  src="/img/pdfimg.png"
                  alt="PDF Icon"
                  style={{
                    width: "110px",
                    height: "110px",
                    cursor: "pointer"
                  }}
                />
              </div></span>
  </div>
</div>

      </div>
      
    </div>
   
  </div>
</div>

          </div>
        </div>
        <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Finance Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <Form>
        <Row>
        
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="a tobcompany shf..." />
            </Form.Group>
          </Col>
        
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" placeholder="+091 12 545 6546 " />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="email@gmail.com " />
            </Form.Group>
          </Col>
       
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formFrom">
              <Form.Label>From</Form.Label>
              <Form.Control type="text" placeholder="place" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formTo">
              <Form.Label>To</Form.Label>
              <Form.Control type="text" placeholder="to place" />
            </Form.Group>
          </Col>
       
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formDistance">
              <Form.Label>Distance</Form.Label>
              <Form.Control type="text" placeholder="110 km" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formQuotePrice">
              <Form.Label>Quote Price</Form.Label>
              <Form.Control type="text" placeholder="1100 Aed" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formQuotePrice">
              <Form.Label>Advance amount</Form.Label>
              <Form.Control type="text" placeholder="1100 Aed" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Paid Status</Form.Label>
              <div className="select-wrapper">
                <Form.Control as="select">
                  <option value="">Select status</option>
                  <option value="request-pending">pending</option>
                  <option value="driver-arrived">advance paid</option>
                  <option value="picked-up">fully paid</option>
              
                </Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <div className="select-wrapper">
                <Form.Control as="select">
                  <option value="">Select status</option>
                  <option value="request-pending">Request pending</option>
                  <option value="driver-arrived">Driver arrived</option>
                  <option value="picked-up">Picked up</option>
                  <option value="delivered">Delivered</option>
                </Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="productDetails">
              <Form.Label>Product Details</Form.Label>
              <div>
                <img
                  className="mt-1"
                  src="/public/img/pdfimg.png"
                  alt="PDF Icon"
                  style={{
                    width: "110px",
                    height: "110px",
                    cursor: "pointer"
                  }}
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="productDetails">
              <Form.Label>delivery document</Form.Label>
              <div>
                <img
                  className="mt-1"
                  src="/public/img/pdfimg.png"
                  alt="PDF Icon"
                  style={{
                    width: "110px",
                    height: "110px",
                    cursor: "pointer"
                  }}
                />
              </div>
            </Form.Group>
          </Col>
        
       
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formDriverDetails">
              <Form.Label>Driver</Form.Label>
              <div className="select-wrapper">
                <Form.Control as="select">
                  <option value="">Select Driver</option>
                  <option value="request-pending">Driver 1</option>
                  <option value="driver-arrived">Driver 2</option>
                  <option value="picked-up">Driver 3</option>
                  <option value="delivered">Driver 4</option>
                </Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="text" placeholder="13 Mar 2024" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      
    )}
  </>
  )
}
