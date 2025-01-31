import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ContextDatas } from '../../../services/Context';
import Loader from '../../../components/Loader';
// import Pagination from '../../../components/Pagination';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import {useFetchData} from '../../../services/useQueryFetchData.js'
import Table from '../../../components/Table';
import FormikField from '../../../components/InputComponents.jsx';
import { Formik } from 'formik';
import { Form, Button, Row } from 'react-bootstrap';
import { fetchQuatation, fetchTrucks, fetchvehicle } from '../../../api/index.js';
import { useCustomMutation } from '../../../services/useCustomMutation.js';
import Commonmodal from '../../../components/modal/Commonmodal.jsx';
import SingleSelect from '../../../components/ui/SingleSelect.jsx';
import places from '../../../json/places.json'
import { calculateDistance } from '../../../utils/calculateDistance.js';
import { Trash2 } from 'lucide-react';
import { quotationapi, uploadapi } from '../../../services/BaseUrls.jsx';
import { formatDate } from '../../../utils/dateConvert.js';
import ConfirmationDialog from '../../../components/modal/ConfirmationDialog.jsx';

export default function Quotation() {
  const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide,optionPlaces } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectData,setselectData] =useState('')
  const [isloading,setisloading]= useState(false)
  const [pagination,setPagination] =useState({
    pageIndex:0,
    pageSize:10
  })
  const [confirmationState,setConfirmationState]=useState(false)
  const {mutation} = useCustomMutation();
  const { data: quotdatalist} = useFetchData('quotation',fetchQuatation);
  const {data:trucklist} = useFetchData("truckS",fetchTrucks)
  const optiontrucks = trucklist?.data?.docs?.map(item=>({
    value:item._id,
    label:item.truck_id
    ,
  }))
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setpageLoading(false);
  //   }, 1000); 

  //   return () => clearTimeout(timer);
  // }, []);
  // console.log("places",places)
  // const optionPlaces = places?.map(item=>({
  //   value:item.city,
  //   label:item.city,
  //   lat:item.latitude,
  //   lon:item.longitude
  // }))
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

  const handleDeleteImage =(image,setFieldValue,values)=>{
    try {
      mutation.mutate({
        method:"post",
        url: `${uploadapi}`,
        values:{previousFiles:image},
        key:'quotation',
      },
      {
        onSuccess: () => {
          let newArr = values.productDetails.filter(ite => ite !== image);
          // console.log("Updated Array:", newArr);
          setFieldValue("productDetails", newArr);
        },
        onError: (error) => {
          console.log(error)
        },
      }
    )
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit2 = (values, actions,createJob) => {
    // console.log("values...............................",values)
    // return 
    try {
      if(createJob){
        values.createJob = true
      }
      const apiurl = values?._id?`${quotationapi}/${values._id}` : quotationapi;
      mutation.mutate({
          method: values?._id? "put":"post",
          url: apiurl,
          values: {...values},
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

  const [productImagePreview, setProductImagePreview] = useState(null);
  // Data for the table
  // const quotdatalist = useMemo(() => [
  //   {
  //     jobId: '1323',
  //     name: 'a tobcompany shfbs sdufbsd fuisdif u',
  //     from: 'place',
  //     to: 'to place',
  //     distance: '110 km',
  //     vehicleType: '4 axil',
  //     quotePrice: '1100 AED',
  //     date: '13 Mar 2024'
  //   },
  //   {
  //     jobId: '1324',
  //     name: 'company 2',
  //     from: 'location A',
  //     to: 'location B',
  //     distance: '150 km',
  //     vehicleType: '2 axil',
  //     quotePrice: '1200 AED',
  //     date: '14 Mar 2024'
  //   },
  //   {
  //     jobId: '1325',
  //     name: 'company 3',
  //     from: 'city A',
  //     to: 'city B',
  //     distance: '200 km',
  //     vehicleType: '6 axil',
  //     quotePrice: '1500 AED',
  //     date: '15 Mar 2024'
  //   },
  //   {
  //     jobId: '1326',
  //     name: 'company 4',
  //     from: 'town A',
  //     to: 'town B',
  //     distance: '300 km',
  //     vehicleType: '8 axil',
  //     quotePrice: '1800 AED',
  //     date: '16 Mar 2024'
  //   },
  //   {
  //     jobId: '1327',
  //     name: 'company 5',
  //     from: 'village A',
  //     to: 'village B',
  //     distance: '400 km',
  //     vehicleType: '10 axil',
  //     quotePrice: '2000 AED',
  //     date: '17 Mar 2024'
  //   },
  //   {
  //     jobId: '1328',
  //     name: 'company 6',
  //     from: 'district A',
  //     to: 'district B',
  //     distance: '500 km',
  //     vehicleType: '12 axil',
  //     quotePrice: '2200 AED',
  //     date: '18 Mar 2024'
  //   },
  //   {
  //     jobId: '1323',
  //     name: 'a tobcompany shfbs sdufbsd fuisdif u',
  //     from: 'place',
  //     to: 'to place',
  //     distance: '110 km',
  //     vehicleType: '4 axil',
  //     quotePrice: '1100 AED',
  //     date: '13 Mar 2024'
  //   },
  //   {
  //     jobId: '1324',
  //     name: 'company 2',
  //     from: 'location A',
  //     to: 'location B',
  //     distance: '150 km',
  //     vehicleType: '2 axil',
  //     quotePrice: '1200 AED',
  //     date: '14 Mar 2024'
  //   },
  //   {
  //     jobId: '1325',
  //     name: 'company 3',
  //     from: 'city A',
  //     to: 'city B',
  //     distance: '200 km',
  //     vehicleType: '6 axil',
  //     quotePrice: '1500 AED',
  //     date: '15 Mar 2024'
  //   },
  //   {
  //     jobId: '1326',
  //     name: 'company 4',
  //     from: 'town A',
  //     to: 'town B',
  //     distance: '300 km',
  //     vehicleType: '8 axil',
  //     quotePrice: '1800 AED',
  //     date: '16 Mar 2024'
  //   },
  //   {
  //     jobId: '1327',
  //     name: 'company 5',
  //     from: 'village A',
  //     to: 'village B',
  //     distance: '400 km',
  //     vehicleType: '10 axil',
  //     quotePrice: '2000 AED',
  //     date: '17 Mar 2024'
  //   },
  //   {
  //     jobId: '1328',
  //     name: 'company 6',
  //     from: 'district A',
  //     to: 'district B',
  //     distance: '500 km',
  //     vehicleType: '12 axil',
  //     quotePrice: '2200 AED',
  //     date: '18 Mar 2024'
  //   },
    
  //   {
  //     jobId: '1327',
  //     name: 'company 5',
  //     from: 'village A',
  //     to: 'village B',
  //     distance: '400 km',
  //     vehicleType: '10 axil',
  //     quotePrice: '2000 AED',
  //     date: '17 Mar 2024'
  //   },
  //   {
  //     jobId: '1328',
  //     name: 'company 6',
  //     from: 'district A',
  //     to: 'district B',
  //     distance: '500 km',
  //     vehicleType: '12 axil',
  //     quotePrice: '2200 AED',
  //     date: '18 Mar 2024'
  //   },
  // ], []);

  // Column definitions
  const calculatedistance = (fromlat,fromlon,tolat,tolon)=>{
    try {
      // console.log("fromlat",`${fromlat},${fromlon}`)
      // console.log("toooooo",`${tolat},${tolon}`)
      if(fromlat && tolat){
        const data = calculateDistance(fromlat,fromlon,tolat,tolon)
        return data.toFixed(2)
      }else{
        return ""
      }
    } catch (error) {     
    }
  }
  const columns = useMemo(() => [
    // {
    //   header: 'Job ID',
    //   accessorKey: 'jobId',
    // },
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
      size:110,
    },
    {
      header: 'Truck Type',
      accessorKey: 'vehicleType.truck_id',
    },
    {
      header: 'Price',
      accessorKey: 'quotePrice',
      size:110,
    },
    {
      header: 'Date',
      accessorKey: 'date',
      size:125,
      cell:({row})=>(
        formatDate(row.original.date)
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
  return (
    <>
       (
        
        <div className={`contents ${mobileSide ? 'expanded' : ''}`}>
          <div className="demo2 mb-25 t-thead-bg">
            <div className="container-fluid">
              <div className="row mt-20">
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
                          <Table data={quotdatalist?.data?.docs??[]} columns={columns} pagination={pagination} 
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
          <Commonmodal size={"lg"} show={show} handleClose={handleClose} title={"Quoatation"}>
          <Formik
      initialValues={{
        // jobId: selectData?.jobId||"",
        name: selectData?.name||"",
        contact: selectData?.contact||"",
        from: selectData?.from||"",
        to: selectData?.to||"",
        distance: selectData?.distance||"",
        quotePrice: selectData?.quotePrice||"",
        vehicleType:selectData?.vehicleType?._id||"",
        date: selectData?.date?formatDate(selectData?.date): formatDate(new Date().toISOString()),
        productDetails: selectData?.productDetails?.length?selectData?.productDetails:[]||[],
        ...(selectData?._id ? { _id: selectData._id } : {}),
        

      }}
      validate={values => {
        const errors = {};
        // if (!values.jobId) errors.jobId = 'Required';
        if (!values.name) errors.name = 'Name Required';
        if (!values.contact) errors.contact = 'Contact Required';
        if (!values.from) errors.from = 'From Location Required';
        if (!values.to) errors.to = 'To Location Required';
        if (!values.distance) errors.distance = 'Distance Required';
        if (!values.quotePrice) errors.quotePrice = 'QuotePrice Required';
        // if (!values.date) errors.date = 'Required';
        // if (!values.productDetails) errors.productDetails = 'Product image is required';
        return errors;
      }}
      onSubmit={(values,actions ) => {
        handleSubmit2(values,actions)
      }}
    >
      {({
        handleSubmit,
        isSubmitting,
        resetForm,
        setSubmitting,
        setFieldValue,
        values
      }) => {
        console.log("values",values)
        console.log("selectData",selectData)
        return(
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* <FormikField name="jobId" label="Job ID" placeholder="1323" disabled colWidth={12} /> */}
            <FormikField name="name" label="Name" placeholder="company name" colWidth={6}/>
            <FormikField name="contact" label="Contact" placeholder="contact number" colWidth={6} />
          
            {/* <FormikField name="from" label="From" placeholder="from place" colWidth={6} />
            <FormikField name="to" label="To" placeholder="to place" colWidth={6} /> */}
            <SingleSelect
            name="from"
            label="From "
            placeholder="Select from"
            className="w-100"
            options={optionPlaces??[]}
            colWidth={6}  
            onChange={(value)=>{
              setFieldValue("from",value.value);
              setFieldValue("fromlat",value.lat);
              setFieldValue("fromlon",value.lon);
              setFieldValue("distance",calculatedistance(value?.lat,value.lon,values?.tolat,values?.tolon));
            //  calculatedistance(value?.lat,value.lon,values?.tolat,values?.tolon,setFieldValue)         
            }    
            }
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border" 
          />   
            <SingleSelect
            name="to"
            label="To "
            placeholder="Select to"
            className="w-100"
            options={optionPlaces??[]}
            onChange={(value)=>{
              setFieldValue("distance",calculatedistance(values?.fromlat,values?.fromlon,value.lat,value.lon,));
              // calculatedistance(values?.fromlat,values?.fromlon,value?.lat,value.lon)
            }
            }
            colWidth={6} 
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border"  
          />   
          
            <FormikField name="distance" label="Distance" placeholder="distacnce " disabled colWidth={6} />
          
            <SingleSelect
            name="vehicleType"
            label="Truck Type "
            placeholder="Select Truck Type"
            className="w-100"
            options={optiontrucks??[]}
            colWidth={6} 
            variant="border"  
          /> 
            <FormikField name="productDetails" label="Product Details" type = 'file' imagetype = "array" colWidth={12} />
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
        <Trash2
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
        />
      </div>
    ))}
  </div>
) : (
  null
)}
          </Row>
          <Row>
          </Row>
          <Row>
            <FormikField name="quotePrice" label="Quote Price" type = 'number' placeholder="quote price" colWidth={6} />
            <FormikField name="date" label="Date" type= 'date'  placeholder="13 Mar 2024"  colWidth={6}  />
          </Row>
          <Modal.Footer>
          <Button variant="primary"  type="submit" disabled={isSubmitting}>
                Add Quoatation
              </Button>
              {values?._id?
          <Button variant="primary"  type="button" onClick={()=>handleSubmit2(values,{ resetForm, setSubmitting },true)}  disabled={isloading}>
                Approve
              </Button>
              :""}
        </Modal.Footer>
        </Form>
      )}}
    </Formik>
            {/* <Modal.Footer>  
              <Button variant="primary" onClick={handleClose}>
                Add job
              </Button>
            </Modal.Footer> */}
          </Commonmodal>
          <ConfirmationDialog
        open={confirmationState}
        onOpenChange={setConfirmationState}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product ?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
      )
    </>
  );
}
