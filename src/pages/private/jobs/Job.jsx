import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ContextDatas } from '../../../services/Context';
import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useCustomMutation } from '../../../services/useCustomMutation';
import { useFetchData } from '../../../services/useQueryFetchData';
import { fetchjob } from '../../../api';
import * as Yup from 'yup';
import Commonmodal from '../../../components/modal/Commonmodal';
import { Formik } from 'formik';
import { formatDate } from '../../../utils/dateConvert';
import FormikField from '../../../components/InputComponents';
import SingleSelect from '../../../components/ui/SingleSelect';
import { Trash2 } from 'lucide-react';
import Table from '../../../components/Table';
export default function Job() {
    const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide,optionPlaces } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const [selectData,setselectData] =useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pagination,setPagination] =useState({
      pageIndex:0,
      pageSize:10
    })
  const [confirmationState,setConfirmationState]=useState(false)
    const {mutation} = useCustomMutation();
    const { data: jobdatalist} = useFetchData('job',fetchjob);
    // console.log("fetchjobfetchjobfetchjobfetchjob",jobdatalist?.data?.docs)
  useEffect(() => {
    const timer = setTimeout(() => {
      setpageLoading(false);
    }, 1000); // 5000 milliseconds = 5 seconds

    // Cleanup function to clear the timer if the component unmounts or the dependency array changes
    return () => clearTimeout(timer);
}, []);
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  contact: Yup.string().required('Contact is required'),
  from: Yup.string().required('From location is required'),
  to: Yup.string().required('To location is required'),
  distance: Yup.number().required('Distance is required'),
  quotePrice: Yup.number().required('Quote Price is required'),
  date: Yup.date().required('Date is required'),
  productDetails: Yup.mixed(), // Adjust based on your requirements
  vehicleType: Yup.string().required('Vehicle Type is required'),
  driver: Yup.string().required('Driver selection is required'),
  status: Yup.string().required('Status is required'),
});
const columns = useMemo(() => [
  {
    header: 'Job ID',
    accessorKey: 'job_id',
    size:110
  },
  {
    header: 'Name',
    accessorKey: 'name',
    // cell:info=><strong >{info.getValue()}</strong>
    cell:({row})=>(
      <strong >{row.original.quotationId.name}</strong>
    )
  },
  {
    header: 'From',
    accessorKey: 'from',
    cell:({row})=>(
      `${row.original.quotationId.from}`
    )
  },
  {
    header: 'To',
    accessorKey: 'to',
    cell:({row})=>(
      row.original?.quotationId?.to
    ),
    isTruncated:true
  },
  {
    header: 'Distance',
    accessorKey: 'distance',
    cell: ({ row }) => `${row.original?.quotationId?.distance} km`,
  },
  {
    header: 'Vehicle Type',
    accessorKey: 'vehicleType',
    cell:({row})=>(
      row.original?.quotationId?.vehicleType?.name
    )
  },
  {
    header: 'Price',
    accessorKey: 'quotePrice',
    size:110,
    cell:({row})=>(
      row.original?.quotationId?.quotePrice
    )
  },
  {
    header: 'Date',
    accessorKey: 'date',
    size:120,
    cell:({row})=>(
      formatDate(row.original?.quotationId?.date)
    )
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
 const handleDelete=()=>{
    try {
      mutation.mutate({
        method: "delete",
        url: `${quotationapi}/${deleteId}`,
        key:'quotation',
      });
    } catch (error) {
      console.log(error)
    }}
      const handleSubmit = (values, actions) => {
        // console.log("values...............................",values)
        // return 
        try {
          const apiurl = values?.id? `${quotationapi}/${values.id}` : quotationapi;
          mutation.mutate({
              method: values?.id? "put":"post",
              url: apiurl,
              values: { ...values },
              key: "quotation",
              next: () => {
                handleClose(); 
                actions.resetForm()
                actions.setSubmitting(false)
                setdata(null)
              },
          },       { onError: (error) => {
            actions.setSubmitting(false); 
          },}
        );
        } catch (error) {
          console.log(error)
          actions.setSubmitting(false); 
        }
       
      };
    console.log("sleecteddata",selectData)
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
                    <h6>Jobs</h6>
                    {/* <div className="card-extra">
                        <ul
                          className="card-tab-links nav-tabs nav"
                          role="tablist"
                        >
                          <li>
                            <a
                              href="#t_selling-month333"
                              data-bs-toggle="tab"
                              id="t_selling-month333-tab"
                              role="tab"
                              aria-selected="true"
                              className='active'
                              onClick={()=>
                              {handleShow(); 
                                setselectData('')}
                              }
                            >
                              Add New +
                            </a>
                          </li>
                        </ul>
                      </div> */}
                  </div>
                  <div className="card-body p-0">
                                        <div className="tab-content">
                                          <div
                                            className="tab-pane fade active show"
                                            id="t_selling-today222"
                                            role="tabpanel"
                                            aria-labelledby="t_selling-today222-tab"
                                          >
                                            <Table data={jobdatalist?.data?.docs??[]} columns={columns} pagination={pagination} 
                                            // setPagination={setPagination}
                                            />
                                            
                                          </div>
                                        </div>
                                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Commonmodal show={show} handleClose={handleClose} title={"Job Details"}>
      <Formik
        initialValues={{
          name: selectData?.quotationId?.name || "",
          contact: selectData?.quotationId?.contact || "",
          email: selectData?.quotationId?.email || "",
          from: selectData?.quotationId?.from || "",
          to: selectData?.quotationId?.to || "",
          distance: selectData?.quotationId?.distance || "",
          quotePrice: selectData?.quotationId?.quotePrice || "",
          date: selectData?.quotationId?.date? formatDate(selectData?.quotationId?.date):"" || formatDate(new Date().toISOString()),
          productDetails: selectData?.quotationId?.productDetails || [],
          deliveryDocuments:selectData?.quotationId?.deliveryDocuments|| "",
          vehicleType: selectData?.quotationId?.vehicleType || "",
          driver: selectData?.driver || "",
          status: selectData?.status || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        
        {({
          handleSubmit,
          isSubmitting,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          {console.log("initialValues",values)}
          return(
          
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <FormikField
                    name="name"
                    label="Name"
                    disabled
                    placeholder="Company Name"
                    type="text"
                  />
                </Col>
                <Col md={6}>
                  <FormikField
                    name="contact"
                    disabled
                    label="Contact"
                    placeholder="+091 12 545 6546"
                    type="text"
                  />
                </Col>
               
                <Col md={6}>
                  {/* <SingleSelect
                    name="from"
                    label="From"
                    placeholder="Select from"
                    className="w-100"
                    disabled
                    options={optionPlaces || []}
                    // onChange={(value) => {
                    //   setFieldValue("from", value.value);
                    //   setFieldValue("fromlat", value.lat);
                    //   setFieldValue("fromlon", value.lon);
                    //   setFieldValue(
                    //     "distance",
                    //     calculatedistance(
                    //       value.lat,
                    //       value.lon,
                    //       values.tolat,
                    //       values.tolon
                    //     )
                    //   );
                    // }}
                    colWidth={6}
                    variant="border"
                  /> */}
                   <FormikField
                    name="from"
                    disabled
                    label="From"
                    placeholder="From"
                    type="text"
                  />
                </Col>
                <Col md={6}>
                  {/* <SingleSelect
                    name="to"
                    label="To"
                    placeholder="Select to"
                    className="w-100"
                    disabled
                    options={optionPlaces || []}
                    // onChange={(value) => {
                    //   setFieldValue(
                    //     "distance",
                    //     calculatedistance(
                    //       values.fromlat,
                    //       values.fromlon,
                    //       value.lat,
                    //       value.lon
                    //     )
                    //   );
                    //   setFieldValue("to", value.value);
                    //   setFieldValue("tolat", value.lat);
                    //   setFieldValue("tolon", value.lon);
                    // }}
                    colWidth={6}
                    variant="border"
                  /> */}
                   <FormikField
                    name="to"
                    disabled
                    label="To"
                    placeholder="To "
                    type="text"
                  />
                </Col>
                <Col md={6}>
                  <FormikField
                    name="distance"
                    label="Distance"
                    placeholder="110 km"
                    type="number"
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <FormikField
                    name="quotePrice"
                    label="Quote Price"
                    placeholder="1100 AED"
                    disabled
                    type="number"
                  />
                </Col>
                <Col md={6}>
                  <FormikField
                    name="date"
                    label="Date"
                    type="date"
                    placeholder="13 Mar 2024"
                    disabled
                  />
                </Col>
                {/* <Col md={6}>
                  <FormikField
                    name="email"
                    label="Email"
                    placeholder="email@gmail.com"
                    type="email"
                  />
                </Col> */}
                <Col md={6}>
                  {/* <SingleSelect
                    name="vehicleType"
                    label="Vehicle Type"
                    placeholder="Select Vehicle Type"
                    className="w-100"
                    // options={optionVehicles || []}
                    onChange={(value) => {
                      setFieldValue("vehicleType", value.value);
                    }}
                    colWidth={6}
                    variant="border"
                  /> */}
                   <FormikField
                    name="vehicleType"
                    disabled
                    label="vehicleType"
                    // placeholder="vehicle Type"
                    type="text"
                  />
                </Col>
                <Col md={6}>
                <SingleSelect
                    name="driver"
                    label="Driver"
                    placeholder="Select driver"
                    className="w-100"
                    // options={optionVehicles || []}
                    onChange={(value) => {
                      setFieldValue("driver", value.value);
                    }}
                    colWidth={6}
                    variant="border"
                  />
                  {/* <FormikField
                    name="driver"
                    label="Driver"
                    placeholder="Select Driver"
                    as="select"
                  >
                    <option value="">Select Driver</option>
                    <option value="driver1">Driver 1</option>
                    <option value="driver2">Driver 2</option>
                    <option value="driver3">Driver 3</option>
                    <option value="driver4">Driver 4</option>
                  </FormikField> */}
                </Col>
                <Col md={6}>
                <SingleSelect
                    name="status"
                    label="status"
                    placeholder="Select status"
                    className="w-100"
                    options={[
                      {value:"request-pending",label:"Request pending"},
                      {value:"driver-arrived",label:"Driver Arrived"},
                      {value:"picked-up",label:"Picked up"},
                      {value:"delivered",label:"Delivered"},
                    ] || []}
                    onChange={(value) => {
                      setFieldValue("status", value.value);
                    }}
                    colWidth={6}
                    variant="border"
                  />
                  {/* <FormikField
                    name="status"
                    label="Status"
                    as="select"
                  >
                    <option value="">Select Status</option>
                    <option value="request-pending">Request Pending</option>
                    <option value="driver-arrived">Driver Arrived</option>
                    <option value="picked-up">Picked Up</option>
                    <option value="delivered">Delivered</option>
                  </FormikField> */}
                </Col>
                <Col md={6}>
                {/* <FormikField name="productDetails" label="Product Details" type = 'file' colWidth={12} /> */}
                <label>Product details</label>
            {values?.productDetails.length ? (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}> 
    {/* Flex container to display items in a row */}
    {values?.productDetails?.map((item, index) => (
      <div
        key={index}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center content vertically
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative', // For positioning the delete button
          width: '100px',
        }}
      >
        {/* PDF Icon */}
        <img
          src="/public/img/pdfimg.png"
          alt="PDF Icon"
          style={{
            width: '80px',
            height: '80px',
            marginBottom: '5px',
          }}
        />

        {/* Text underneath */}
        <p
          style={{
            fontSize: '14px',
            color: '#555',
            cursor: 'pointer',
            width: '100px', // Set fixed width for text
            overflow: 'hidden', // Hide overflow text
            whiteSpace: 'nowrap', // Keep text in a single line
            textOverflow: 'ellipsis', // Add ellipsis if text overflows
            margin: 0,
          }}
          title={item} // Full text on hover
        >
          {item}
        </p>

        {/* Delete Button */}
        {/* <Trash2   
          size={18}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            cursor: 'pointer',
            color: 'red',
          }}
          onClick={() => {
            handleDeleteImage(item,setFieldValue,values)
          }}
        /> */}
      </div>
    ))}
  </div>
) : (
  null
)}
                </Col>
                <Col>
                <label>Delivery Documents</label>
                <div
        // key={index}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center content vertically
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative', // For positioning the delete button
          width: '100px',
        }}
      >
        {/* PDF Icon */}
        {values?.deliveryDocuments?
        <>
        
        <img
          src="/public/img/pdfimg.png"
          alt="PDF Icon"
          style={{
            width: '80px',
            height: '80px',
            marginBottom: '5px',
          }}
        />

        {/* Text underneath */}
        <p
          style={{
            fontSize: '14px',
            color: '#555',
            cursor: 'pointer',
            width: '100px', // Set fixed width for text
            overflow: 'hidden', // Hide overflow text
            whiteSpace: 'nowrap', // Keep text in a single line
            textOverflow: 'ellipsis', // Add ellipsis if text overflows
            margin: 0,
          }}
          title={values?.deliveryDocuments} // Full text on hover
        >
          {values?.deliveryDocuments}
        </p>
        </>:""}
        {/* Delete Button */}
        {/* <Trash2   
          size={18}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            cursor: 'pointer',
            color: 'red',
          }}
          onClick={() => {
            handleDeleteImage(item,setFieldValue,values)
          }}
        /> */}
      </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        )} }
      </Formik>
    </Commonmodal>
      {/* </Modal> */}
      </div>
      
    )}
  </>
  )
}
