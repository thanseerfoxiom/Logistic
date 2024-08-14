import React, { useContext, useEffect, useState } from 'react'
import { ContextDatas } from '../../../services/Context';
import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Col ,Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { detailsPath } from '../../../services/UrlPaths';

export default function Finance() {
    const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
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
            <div className="row mt-50">
              <div className="col-xxl-8 mb-25">
                <div className="card border-0 px-25">
                  <div className="card-header px-0 border-0">
                    <h6>finance</h6>
                    <div className="card-extra">
                      <ul
                        className="card-tab-links nav-tabs nav"
                        role="tablist"
                      >
                        <li>
                          <a
                            className="active"
                            href="#t_selling-today222"
                            data-bs-toggle="tab"
                            id="t_selling-today222-tab"
                            role="tab"
                            aria-selected="true"
                          >
                            Today
                          </a>
                        </li>
                        <li>
                          <a
                            href="#t_selling-week222"
                            data-bs-toggle="tab"
                            id="t_selling-week222-tab"
                            role="tab"
                            aria-selected="true"
                          >
                            Week
                          </a>
                        </li>
                        <li>
                          <a
                            href="#t_selling-month333"
                            data-bs-toggle="tab"
                            id="t_selling-month333-tab"
                            role="tab"
                            aria-selected="true"
                          >
                            Month
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="t_selling-today222"
                        role="tabpanel"
                        aria-labelledby="t_selling-today222-tab"
                      >
                        <div className="userDatatable  mt-1 p-2 table-responsive">
                          <table className="table table--default body-px-25">
                            <thead>
                              <tr class="userDatatable-header">
                                
                                <th>
                                  <span class="userDatatable-title">job_id</span>
                                </th>
                                <th>
                                  <span class="userDatatable-title">Name</span>
                                </th>
                                <th>
                                  <span class="userDatatable-title">
                                    job status
                                  </span>
                                </th>
                                <th>
                                  <span class="userDatatable-title">
                                    Quote Price
                                  </span>
                                </th>
                                <th>
                                  <span class="userDatatable-title">
                                    payment status
                                  </span>
                                </th>
                                <th>
                                  <span class="userDatatable-title">advance amouut</span>
                                </th>
                                <th>
                                  <span class="userDatatable-title">pending amount</span>
                                </th>
                               
                                {/* <th>
                                  <span class="userDatatable-title">
                                   Date
                                  </span>
                                </th> */}
                                <th
                                  // style={{
                                  //   textAlign: "right",
                                  //   paddingRight: "40px",
                                  // }}
                                >
                                  <span className="userDatatable-title">
                                    Action
                                  </span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                               
                                <td className='text-ellipsis'> 1323</td>
                                <td className='text-ellipsis cursor-true' onClick={() =>navigate(`/${detailsPath}`)} > a tobcompany shfbs sdufbsd fuisdif u</td>
                                <td className='text-ellipsis'>completed</td>
                                <td className='text-ellipsis'>154 aed</td>
                                <td className='text-ellipsis'>Not paid</td>
                                <td className='text-ellipsis'>100 Aed</td>
                                <td className='text-ellipsis'>54 Aed</td>
                                {/* <td className='text-ellipsis'>13 Mar 2024</td> */}
                               

                                <td>
                               
                                  {/* <ul className='text-align-center d-flex'>
                                    <li>
                                      <a href="#" class="view" onClick={handleShow}>
                                        <i class="uil uil-eye action_fonts"></i>
                                      </a>
                                    </li>
                                   
                                  </ul> */}
                                    <ul class="text-align-center d-flex">
                                       
                                       <li>
                                         <a href="#" class="edit" onClick={handleShow}>
                                           <i class="uil uil-edit action_fonts"></i>
                                         </a>
                                       </li>
                                       <li>
                                         <a href="#" class="remove">
                                           <i class="uil uil-trash-alt action_fonts"></i>
                                         </a>
                                       </li>
                                     </ul>
                                </td>
                              </tr>
                              {/* <tr>
                            <td colSpan={7}>
                              <div class="dm-empty text-center">
                                <div class="dm-empty__image">
                                  <img src="/img/svg/1.png" alt="Admin Empty" />
                                </div>
                                <div class="dm-empty__text">
                                  <p class>No Data Available</p>
                                </div>
                              </div>
                            </td>
                          </tr> */}
                            </tbody>
                          </table>
                        </div>
                        <Pagination/>
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
