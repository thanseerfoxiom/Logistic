import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ContextDatas } from '../../../services/Context';
import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import Table from '../../../components/Table';
import { useFetchData } from '../../../services/useQueryFetchData';
import { fetchTrucks, fetchvehicle } from '../../../api';
import Commonmodal from '../../../components/modal/Commonmodal';
import { Formik } from 'formik';
import FormikField from '../../../components/InputComponents';
import { formatDate } from '../../../utils/dateConvert';
import ConfirmationDialog from '../../../components/modal/ConfirmationDialog';
import SingleSelect from '../../../components/ui/SingleSelect';
import { Switch } from '../../../components/ui/switch';
import { BaseUrl, truckapi } from '../../../services/BaseUrls';
import { useCustomMutation } from '../../../services/useCustomMutation';
import { Pencil, Trash2 } from 'lucide-react';
export default function Trucks() {
    const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide,optionPlaces } = useContext(ContextDatas);
  const {mutation} = useCustomMutation(); 
  const [params,setparams] = useState({
    page:"",
    limit:""
  })
  const [show, setShow] = useState(false);
 const [selectData,setselectData] =useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deleteId,setDeleteId]=useState(null)
const { data: vehiclelist} = useFetchData('vehicletype',fetchvehicle);
const {data:trucklist} = useFetchData("truckS",fetchTrucks,params)

  // Holds data for the currently selected driver (for editing)
  const optionvehicles = vehiclelist?.data?.docs?.map(item=>({
    value:item._id,
    label:item.name,
  }))
const [confirmationState,setConfirmationState]=useState(false)
const [pagination,setPagination] =useState({
  pageIndex:0,
  pageSize:10
})
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setpageLoading(false);
  //   }, 1000); // 5000 milliseconds = 5 seconds

  //   // Cleanup function to clear the timer if the component unmounts or the dependency array changes
  //   return () => clearTimeout(timer);
  // }, []);
  const columns = useMemo(() => [
    {
      header: "Sl.no",
      accessorKey: "",
      cell: (info) => info.row.index + 1,
    },
      {
        header: 'Truck ID',
        accessorKey: 'truck_id',
        cell:info=><strong >{info.getValue()}</strong>
      },
      {
        header: 'VehicleType',
        accessorKey: 'vehicleType.name',
      },
      {
        header: 'Weight',
        accessorKey: 'weight',
      },
      {
        header: 'Hight',
        accessorKey: 'hight',
        size:110,
      },
      {
        header: 'Width',
        accessorKey: 'width',
      },
      {
        header: 'Price',
        accessorKey: 'price',
        size:110,
      },
      {
        header: 'Image',
        accessorKey: 'image',
        size:125,
        cell:({row})=>(
          row.original?.image?
        <img
          src={BaseUrl+row.original?.image}
          alt="image Icon"
          style={{
            width: '80px',
            height: '80px',
            marginBottom: '5px',
          }}
        />:"")
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
            <a href="#" className="view m-3"onClick={() => {
                handleShow(); 
                setselectData(row.original);
              }} >
                <Pencil className="wh-20 flex-shrink-0 cursor-pointer" />
              </a>
          <a href="#" className="view" onClick={()=>handleDeleteConfirmation(row?.original?._id)}>
                <Trash2 className="wh-20 flex-shrink-0 cursor-pointer" />
              </a>
           
          </li>
        </ul>
      )
      },
    ], []);
    const handleDeleteConfirmation = (deleteId) => {
      setConfirmationState(true);
      setDeleteId(deleteId);
    };
  const handleDelete=()=>{
    try {
      mutation.mutate({
        method: "delete",
        url: `${truckapi}/${deleteId}`,
        key:'quotation',
      });
    } catch (error) {
      console.log(error)
    }}
      const handleSubmit = (values, actions) => {
        console.log("values...............................",values)
        // return 
        try {
          const apiurl = values?._id? `${truckapi}/${values._id}` : truckapi;
          mutation.mutate({
              method: values?._id? "put":"post",
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
  return (
    <>
     (
      <div className={`contents  ${mobileSide ? "expanded" : ""}`}>
        <div className="demo2 mb-15 t-thead-bg">
          <div className="container-fluid">
            <div className="row mt-20">
              <div className="col-xxl-8 mb-25">
                <div className="card border-0 px-25">
                  <div className="card-header px-0 border-0">
                    <h6>Trucks and Prices</h6>
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
                          <Table data={trucklist?.data?.docs??[]} columns={columns} pagination={pagination} 
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
          <Commonmodal show={show} handleClose={handleClose} title={"Truck"}>
          <Formik
      initialValues={{
        // jobId: selectData?.jobId||"",
        truck_id: selectData?.truck_id||"",
        vehicleType: selectData?.vehicleType||"",
        weight: selectData?.weight||"",
        hight: selectData?.hight||"",
        width: selectData?.width||"",
        image: selectData?.image||"",
        price: selectData?.price||"",
        isActive: selectData?.isActive||true,
        ...(selectData?._id ? { _id: selectData._id } : {}),
        

      }}
      validate={values => {
        const errors = {};
        // if (!values.jobId) errors.jobId = 'Required';
        if (!values.truck_id) errors.truck_id = 'truck_id Required';
        if (!values.vehicleType) errors.vehicleType = 'vehicleType Required';
        if (!values.image) errors.image = ' image Required';
        if (!values.price) errors.price = 'price Required';
        console.log("error",errors)
        return errors;
      }}
      onSubmit={(values,actions ) => {
        handleSubmit(values,actions)
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
        return(
        <Form onSubmit={handleSubmit}>
         <Row>
         <div className="d-flex align-items-center ms-auto">
    <Switch name="isActive" label="isActive" />
  </div>
         
         <FormikField name="truck_id" label="Truck ID" placeholder="Truck ID" colWidth={12}/>
         <SingleSelect
            name="vehicleType"
            label="Vehicle Type "
            placeholder="Select VehicleType"
            className="w-100"
            options={optionvehicles??[]}
            // onChange={(value)=>{
            //   setFieldValue("distance",calculatedistance(values?.fromlat,values?.fromlon,value.lat,value.lon,));
            //   // calculatedistance(values?.fromlat,values?.fromlon,value?.lat,value.lon)
            // }
            // }
            colWidth={12} 
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border"  
          /> 
          <FormikField name="weight" label="Weight" placeholder="weight" sx={6} colWidth={6}/>
          <FormikField name="hight" label="Hight" placeholder="hight" sx={6} colWidth={6}/>
          <FormikField name="width" label="Width" placeholder="width" sx={6} colWidth={6}/>
          <FormikField name="price" label="Price" placeholder="price" sx={6} colWidth={6}/>
          {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <FormikField
                name="image"
                label="Image"
                type="file"
                // colWidth={4}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  if (file) {
                    setFieldValue("image", file.name);
                  }
                }}
              />
              {values?.image && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100px",
                  }}
                >
                  <img
                    src="/public/img/pdfimg.png"
                    alt="PDF Icon"
                    style={{
                      width: "90px",
                      height: "90px",
                      marginBottom: "5px",
                      marginTop: "25px",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      cursor: "pointer",
                      width: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      margin: 0,
                    }}
                    title={values?.image}
                  >
                    {values?.image}
                  </p>
                </div>
              )}
            </div> */}
           <div style={{ 
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",  // vertically center items
  // gap: "20px"            // space between items
}}>
  <FormikField
    name="image"
    label="Image"
    type="file"
    xs={4}
    colWidth={6}
    onChange={(event) => {
      const file = event.currentTarget.files[0];
      if (file) {
        setFieldValue("image", file.name);
      }
    }}
  />

  {values?.image && (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100px",
      }}
    >
      <img
        src={BaseUrl+values.image}
        alt="PDF Icon"
        style={{
          width: "90px",
          height: "90px",
          marginBottom: "5px",
          marginTop: "12px",
        }}
      />
      <p
        style={{
          fontSize: "14px",
          color: "#555",
          cursor: "pointer",
          width: "100px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          margin: 0,
        }}
        title={values?.image}
      >
        {values?.image}
      </p>
    </div>
  )}
</div>

         </Row>
      
          <Modal.Footer>
          <Button variant="primary"  type="submit" disabled={isSubmitting}>
                Add Truck
              </Button>
             
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
        message="Are you sure you want to delete this truck ?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
     )
    
     </>
   );
 }
