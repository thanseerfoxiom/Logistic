import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ContextDatas } from '../../../services/Context';
import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import Table from '../../../components/Table';
import FormikField from '../../../components/InputComponents.jsx';
import { Formik } from 'formik';
import { Form, Button, Row } from 'react-bootstrap';
export default function Quotation() {
  const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide } = useContext(ContextDatas);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectData,setselectData] =useState('')
  const [pagination,setPagination] =useState({
    pageIndex:0,
    pageSize:1
  })
  useEffect(() => {
    const timer = setTimeout(() => {
      setpageLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);
  

  const [productImagePreview, setProductImagePreview] = useState(null);

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result);
        setFieldValue('productDetails', file);
      };
      reader.readAsDataURL(file);
    }
  };
  // Data for the table
  const quotdatalist = useMemo(() => [
    {
      jobId: '1323',
      name: 'a tobcompany shfbs sdufbsd fuisdif u',
      from: 'place',
      to: 'to place',
      distance: '110 km',
      vehicleType: '4 axil',
      quotePrice: '1100 AED',
      date: '13 Mar 2024'
    },
    {
      jobId: '1324',
      name: 'company 2',
      from: 'location A',
      to: 'location B',
      distance: '150 km',
      vehicleType: '2 axil',
      quotePrice: '1200 AED',
      date: '14 Mar 2024'
    },
    {
      jobId: '1325',
      name: 'company 3',
      from: 'city A',
      to: 'city B',
      distance: '200 km',
      vehicleType: '6 axil',
      quotePrice: '1500 AED',
      date: '15 Mar 2024'
    },
    {
      jobId: '1326',
      name: 'company 4',
      from: 'town A',
      to: 'town B',
      distance: '300 km',
      vehicleType: '8 axil',
      quotePrice: '1800 AED',
      date: '16 Mar 2024'
    },
    {
      jobId: '1327',
      name: 'company 5',
      from: 'village A',
      to: 'village B',
      distance: '400 km',
      vehicleType: '10 axil',
      quotePrice: '2000 AED',
      date: '17 Mar 2024'
    },
    {
      jobId: '1328',
      name: 'company 6',
      from: 'district A',
      to: 'district B',
      distance: '500 km',
      vehicleType: '12 axil',
      quotePrice: '2200 AED',
      date: '18 Mar 2024'
    },
    {
      jobId: '1323',
      name: 'a tobcompany shfbs sdufbsd fuisdif u',
      from: 'place',
      to: 'to place',
      distance: '110 km',
      vehicleType: '4 axil',
      quotePrice: '1100 AED',
      date: '13 Mar 2024'
    },
    {
      jobId: '1324',
      name: 'company 2',
      from: 'location A',
      to: 'location B',
      distance: '150 km',
      vehicleType: '2 axil',
      quotePrice: '1200 AED',
      date: '14 Mar 2024'
    },
    {
      jobId: '1325',
      name: 'company 3',
      from: 'city A',
      to: 'city B',
      distance: '200 km',
      vehicleType: '6 axil',
      quotePrice: '1500 AED',
      date: '15 Mar 2024'
    },
    {
      jobId: '1326',
      name: 'company 4',
      from: 'town A',
      to: 'town B',
      distance: '300 km',
      vehicleType: '8 axil',
      quotePrice: '1800 AED',
      date: '16 Mar 2024'
    },
    {
      jobId: '1327',
      name: 'company 5',
      from: 'village A',
      to: 'village B',
      distance: '400 km',
      vehicleType: '10 axil',
      quotePrice: '2000 AED',
      date: '17 Mar 2024'
    },
    {
      jobId: '1328',
      name: 'company 6',
      from: 'district A',
      to: 'district B',
      distance: '500 km',
      vehicleType: '12 axil',
      quotePrice: '2200 AED',
      date: '18 Mar 2024'
    },
    
    {
      jobId: '1327',
      name: 'company 5',
      from: 'village A',
      to: 'village B',
      distance: '400 km',
      vehicleType: '10 axil',
      quotePrice: '2000 AED',
      date: '17 Mar 2024'
    },
    {
      jobId: '1328',
      name: 'company 6',
      from: 'district A',
      to: 'district B',
      distance: '500 km',
      vehicleType: '12 axil',
      quotePrice: '2200 AED',
      date: '18 Mar 2024'
    },
  ], []);

  // Column definitions
  const columns = useMemo(() => [
    {
      header: 'Job ID',
      accessorKey: 'jobId',
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell:info=><strong >{info.getValue()}</strong>
    },
    {
      header: 'From',
      accessorKey: 'from',
    },
    {
      header: 'To',
      accessorKey: 'to',
    },
    {
      header: 'Distance',
      accessorKey: 'distance',
    },
    {
      header: 'Vehicle Type',
      accessorKey: 'vehicleType',
    },
    {
      header: 'Price',
      accessorKey: 'quotePrice',
    },
    {
      header: 'Date',
      accessorKey: 'date',
    },
    {
      header: 'Action',
      // accessorKey: '',
    //   cell:info=><ul className='text-align-center d-flex'>
    //   <li>
    //     <a href="#" class="view" onClick={handleShow && console.log("infoooooooo",info.cell.row.original)}>
    //       <i class="uil uil-eye action_fonts"></i>
    //     </a>
    //   </li>
     
    // </ul>
    cell: ({ row }) => (
      <ul className='text-align-center d-flex'>
        <li>
          <a
            href="#"
            className="view"
            onClick={() => {
              handleShow(); 
              setselectData(row.original);
            }}
          >
            <i className="uil uil-eye action_fonts"></i>
          </a>
        </li>
      </ul>
    )
    },
  ], []);

 
  return (
    <>
      {pageLoading ? (
        <Loader />
      ) : (
        <div className={`contents ${mobileSide ? 'expanded' : ''}`}>
          <div className="demo2 mb-25 t-thead-bg">
            <div className="container-fluid">
              <div className="row mt-50">
                <div className="col-xxl-12 mb-25">
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
                          <Table data={quotdatalist} columns={columns} pagination={pagination} setPagination={setPagination}/>
                          
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
            {/* <FormikField name="jobId" label="Job ID" placeholder="1323" colWidth={6} /> */}
              {/* <Form>
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
                        width: '110px',
                        height: '110px',
                        cursor: 'pointer'
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
              </Form> */}
              <Formik
      initialValues={{
        jobId: '',
        name: '',
        contact: '',
        from: '',
        to: '',
        distance: '',
        quotePrice: '',
        date: '',
        productDetails: null,
      }}
      validate={values => {
        const errors = {};
        if (!values.jobId) errors.jobId = 'Required';
        if (!values.name) errors.name = 'Required';
        if (!values.contact) errors.contact = 'Required';
        if (!values.from) errors.from = 'Required';
        if (!values.to) errors.to = 'Required';
        if (!values.distance) errors.distance = 'Required';
        if (!values.quotePrice) errors.quotePrice = 'Required';
        // if (!values.date) errors.date = 'Required';
        // if (!values.productDetails) errors.productDetails = 'Product image is required';
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <FormikField name="jobId" label="Job ID" placeholder="1323" colWidth={12} />
            <FormikField name="name" label="Name" placeholder="a tobcompany shf..." colWidth={12} />
            <FormikField name="contact" label="Contact" placeholder="+091 12 545 6546" colWidth={12} />
          </Row>
          <Row>
            <FormikField name="from" label="From" placeholder="place" colWidth={6} />
            <FormikField name="to" label="To" placeholder="to place" colWidth={6} />
          </Row>
          <Row>
            <FormikField name="distance" label="Distance" placeholder="110 km" colWidth={12} />
          </Row>
          <Row>
            {/* <Form.Group className="mb-3" controlId="productDetails">
              <Form.Label>Product Details</Form.Label>
              <Form.Control
                type="file"
                name="productDetails"
                onChange={(event) => handleImageUpload(event, setFieldValue)}
              />
              {productImagePreview && (
                <div>
                  <img
                    className="mt-1"
                    src={productImagePreview}
                    alt="Product Preview"
                    style={{ width: '110px', height: '110px', cursor: 'pointer' }}
                  />
                </div>
              )}
            </Form.Group> */}
            <FormikField name="productDetails" label="Product Details" type = 'file' colWidth={12} />
          </Row>
          <Row>
            <FormikField name="quotePrice" label="Quote Price" type = 'number' placeholder="1100 Aed" colWidth={12} />
            <FormikField name="date" label="Date" type = 'date'  placeholder="13 Mar 2024"  colWidth={12} disabled={true} />
          </Row>

          
        </Form>
      )}
    </Formik>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" type='submit' disabled={isSubmitting}  >
                Close
              </Button> */}
              <Button variant="primary" onClick={handleClose}>
                Add job
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}
