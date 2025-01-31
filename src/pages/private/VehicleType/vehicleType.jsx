
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
import { fetchvehicle } from '../../../api';
import Commonmodal from '../../../components/modal/Commonmodal';
import { Formik } from 'formik';
import FormikField from '../../../components/InputComponents';
import { formatDate } from '../../../utils/dateConvert';
import ConfirmationDialog from '../../../components/modal/ConfirmationDialog';
import SingleSelect from '../../../components/ui/SingleSelect';
import { Switch } from '../../../components/ui/switch';
import { truckapi, vehicleTypeapi } from '../../../services/BaseUrls';
import { useCustomMutation } from '../../../services/useCustomMutation';
import { Eye, Pencil, Trash2 } from 'lucide-react';

export default function VehicleType() {
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


  // Holds data for the currently selected driver (for editing)
  
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
      size:120,
      accessorKey: "",
      cell: (info) => info.row.index + 1,
    },
      {
        header: 'Name',
        accessorKey: 'name',
        cell:info=><strong >{info.getValue()}</strong>
      },
     
      {
        header: 'Action',
        size:120,
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
        url: `${vehicleTypeapi}/${deleteId}`,
        key:'vehicletype',
      });
    } catch (error) {
      console.log(error)
    }}
      const handleSubmit = (values, actions) => {
        // console.log("values...............................",values)
        // return 
        try {
          const apiurl = values?._id? `${vehicleTypeapi}/${values._id}` : vehicleTypeapi;
          mutation.mutate({
              method: values?._id? "put":"post",
              url: apiurl,
              values: { ...values },
              key: "vehicletype",
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
                    <h6>Vehicle Types</h6>
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
                          <Table data={vehiclelist?.data?.docs??[]} columns={columns} pagination={pagination} 
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
          <Commonmodal show={show} handleClose={handleClose} title={"Vehicle Types"}>
          <Formik
      initialValues={{
        // jobId: selectData?.jobId||"",
        name: selectData?.name||"",
        ...(selectData?._id ? { _id: selectData._id } : {}),
        

      }}
      validate={values => {
        const errors = {};
        // if (!values.jobId) errors.jobId = 'Required';
        if (!values.name) errors.name = 'vehicle type is  Required';
       
       
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
        return(
        <Form onSubmit={handleSubmit}>
         <Row>
       
         
        
          <FormikField name="name" label="vehicle Type" placeholder="vehicle type name" sx={6} colWidth={6}/>
   
         
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
        message="Are you sure you want to delete this vehicle type ?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
     )
    
     </>
   );
 }
