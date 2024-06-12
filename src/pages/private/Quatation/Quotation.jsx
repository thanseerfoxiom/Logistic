import React, { useContext, useEffect, useState } from 'react'
import { ContextDatas } from '../../../services/Context';
import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
export default function Quotation() {
    const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide } = useContext(ContextDatas);
  const [show, setShow] = useState(false);

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
                    <h6>Quotation</h6>
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
                                    From
                                  </span>
                                </th>
                                <th>
                                  <span class="userDatatable-title">
                                    To
                                  </span>
                                </th>
                                <th>
                                  <span class="userDatatable-title">Distance</span>
                                </th>
                                <th>
                                  <span class="userDatatable-title">vehicle type</span>
                                </th>
                                <th>
                                  <span class="userDatatable-title">
                                    Quote Price
                                  </span>
                                </th>
                                <th>
                                  <span class="userDatatable-title">
                                   Date
                                  </span>
                                </th>
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
                                <td className='text-ellipsis'> a tobcompany shfbs sdufbsd fuisdif u</td>
                                <td className='text-ellipsis'>place</td>
                                <td className='text-ellipsis'>to place</td>
                                <td className='text-ellipsis'>110 km</td>
                                <td className='text-ellipsis'>4 axil</td>
                                <td className='text-ellipsis'>1100 Aed</td>
                                <td className='text-ellipsis'>13 Mar 2024</td>
                               

                                <td>
                               
                                  <ul className='text-align-center d-flex'>
                                    <li>
                                      <a href="#" class="view" onClick={handleShow}>
                                        <i class="uil uil-eye action_fonts"></i>
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
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quotation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formJobId">
              <Form.Label>Job ID</Form.Label>
              <Form.Control type="text" placeholder="1323" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="a tobcompany shf..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" placeholder="+091 12 545 6546 " />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFrom">
              <Form.Label>From</Form.Label>
              <Form.Control type="text" placeholder="place" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTo">
              <Form.Label>To</Form.Label>
              <Form.Control type="text" placeholder="to place" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDistance">
              <Form.Label>Distance</Form.Label>
              <Form.Control type="text" placeholder="110 km" />
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="formQuotePrice">
              <Form.Label>Quote Price</Form.Label>
              <Form.Control type="text" placeholder="1100 Aed" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="text" placeholder="13 Mar 2024" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add job
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      
    )}
  </>
  )
}
