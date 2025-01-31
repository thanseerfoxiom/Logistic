import React, { useContext, useEffect, useMemo, useState } from "react";
import { ContextDatas } from "../../../services/Context";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { Formik, Form } from "formik";
import { Row } from "react-bootstrap";

// --- Custom Formik input component ---
import FormikField from "../../../components/InputComponents.jsx";
// --- Custom SingleSelect component ---
import SingleSelect from "../../../components/ui/SingleSelect.jsx";
import { fetchDriver, fetchTrucks, fetchvehicle } from "../../../api/index.js";
import { useFetchData } from "../../../services/useQueryFetchData.js";
import { useCustomMutation, useGetFetchQuery } from "../../../services/useCustomMutation.js";
import { usersapi } from "../../../services/BaseUrls.jsx";
import { formatDate } from "../../../utils/dateConvert.js";
import Table from "../../../components/Table.jsx";
import Commonmodal from "../../../components/modal/Commonmodal.jsx";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmationDialog from "../../../components/modal/ConfirmationDialog.jsx";

export default function Drivers() {
  const {mutation} = useCustomMutation();
  const [pageLoading, setPageLoading] = useState(false);
  const { mobileSide,optionPlaces } = useContext(ContextDatas);
  const [pagination,setPagination] =useState({
        pageIndex:0,
        pageSize:10
      })

  // For controlling the Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deleteId,setDeleteId]=useState(null)
  const [confirmationState,setConfirmationState]=useState(false)
  const { data: driverlist} = useFetchData('driver',fetchDriver);
  console.log("driverdta",driverlist)
  const {data:trucklist} = useFetchData("truckS",fetchTrucks)
    const optiontrucks = trucklist?.data?.docs?.map(item=>({
      value:item._id,
      label:item.truck_id
      ,
    }))
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  // Dummy array to display in table. Replace with data from your API.

  const columns = useMemo(() => [
    {
      header: "Driver ID",
      accessorKey: "driverId",
      // size: 110,
      // cell: ({ row }) => <strong>{row.original.id}</strong>,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => <strong>{row.original.name}</strong>,
    },
    {
      header: "Location",
      accessorKey: "location",
  
    },
    {
      header: "Contact",
      accessorKey: "mobile",

    },
    {
      header: "Vehicle Number",
      accessorKey: "vehicleNo",

    },
    {
      header: "Register Number",
      accessorKey: "registerNo",

    },
    {
      header: "Truck",
      accessorKey: "vehicleType.truck_id",
  
    },
    {
      header: "Licence Expiry Date",
      accessorKey: "licenceExpDate",
      cell: ({ row }) => formatDate(row.original.license_exp),
    },
    {
      header: "Truck Permission",
      accessorKey: "truckPermission",
      cell: ({ row }) => (
        <a href={row.original.truckPermission} target="_blank" rel="noopener noreferrer">
          <img
            src={"/public/img/pdfimg.png"}
            alt="Truck Permission"
            style={{ width: "50px", height: "50px" }}
          />
        </a>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <ul className="text-align-center d-flex">
          <li>
            <a href="#" className="view m-3"onClick={() => {
                handleShow(); 
                handleEditDriver(row.original);
              }} >
                <Pencil className="wh-20 flex-shrink-0 cursor-pointer" />
              </a>
          <a href="#" className="view" onClick={()=>handleDeleteConfirmation(row?.original?._id)}>
                <Trash2 className="wh-20 flex-shrink-0 cursor-pointer" />
              </a>
           
          </li>
        </ul>
      ),
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
        url: `${usersapi}/${deleteId}`,
        key:'quotation',
      });
    } catch (error) {
      console.log(error)
    }}
  // Simulate a loader for 1 second
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setPageLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  /** 
   * Handler for the Edit button inside the table
   * - Sets the selected driver
   * - Opens the modal
   */
  const handleEditDriver = (driver) => {
    setSelectedDriver(driver);
    handleShow();
  };

  // SingleSelect-friendly array for Vehicle Type options
  // Must be [{ value: string, label: string }]

  /**
   * Handler for Formik's onSubmit
   * @param {object} values - The form values
   */
  const handleSubmitForm = (values , actions) => {
    try {
      values.role = "driver"
      const apiurl = values?._id? `${usersapi}/${values._id}` : usersapi;
      mutation.mutate({
          method: values?._id? "put":"post",
          url: apiurl,
          values: { ...values },
          key: "driver",
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
      {pageLoading ? (
        <Loader />
      ) : (
        <div className={`contents ${mobileSide ? "expanded" : ""}`}>
          <div className="demo2 mb-25 t-thead-bg">
            <div className="container-fluid">
              <div className="row mt-50">
                <div className="col-xxl-8 mb-25">
                  <div className="card border-0 px-25">
                    <div className="card-header px-0 border-0">
                      <h6>Drivers</h6>
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
                                setSelectedDriver('')}
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
                           <Table data={driverlist?.data?.docs??[]} columns={columns} pagination={pagination} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- Modal with Formik & FormikField/SingleSelect ---------- */}
          <Commonmodal show={show} size={"lg"} handleClose={handleClose} title={"Drivers"}>
  <Formik
    initialValues={{
      driverId: selectedDriver?.driverId || "",
      name: selectedDriver?.name || "",
      email: selectedDriver?.email || "",
      password: selectedDriver?.password || "",
      mobile: selectedDriver?.mobile || "",
      location: selectedDriver?.location || "",
      vehicleNo: selectedDriver?.vehicleNo || "",
      registerNo: selectedDriver?.registerNo || "",
      vehicleType: selectedDriver?.vehicleType || "",
      license_exp: selectedDriver?.license_exp
        ? formatDate(selectedDriver?.license_exp)
        : "", // Format as YYYY-MM-DD
      truckPermission: selectedDriver?.truckPermission || "",
      // role: selectedDriver?.role || "driver", // Default role is driver
      ...(selectedDriver?._id ? { _id: selectedDriver._id } : {}),
    }}
    validate={(values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Driver name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(values.email)) {
          errors.email = "Invalid email address";
        }
      }
      if (!values.password && !selectedDriver) {
        // Password required only for new drivers
        errors.password = "Password is required";
      }
      if (!values.mobile) {
        errors.mobile = "Mobile number is required";
      } else {
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
        if (!phoneRegex.test(values.mobile)) {
          errors.mobile = "Invalid phone number";
        }
      }
      if (!values.vehicleType) {
        errors.vehicleType = "Vehicle Type is required";
      }
      console.log(errors)
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      handleSubmitForm(values); // Submit the form data to the backend
      setSubmitting(false);
    }}
    enableReinitialize
  >
    {({
      errors,
      touched,
      values,
      isSubmitting,
      setFieldValue,
      handleSubmit,
    }) => (
      <Form onSubmit={handleSubmit}>
        
    
          <Row>
            {/* Driver ID (optional, read-only) */}
         
              <FormikField
                name="driverId"
                label="Driver ID"
                placeholder="Driver ID..."
                colWidth={6}
                
              />
           
          
            {/* Driver Name */}
            <FormikField
              name="name"
              label="Name"
              placeholder="Driver name..."
              colWidth={6}
            />
          
            {/* Email */}
            <FormikField
              name="email"
              label="Email"
              placeholder="Driver email..."
              colWidth={6}
            />
         

          {!selectedDriver && (
           <>
              {/* Password */}
              <FormikField
                name="password"
                label="Password"
                type="password"
                placeholder="Driver password..."
                colWidth={6}
              />
           </>
          )}
            {/* Mobile */}
            <FormikField
              name="mobile"
              label="Mobile"
              placeholder="Mobile number..."
              colWidth={6}
            />
         
            {/* Location */}
            {/* <FormikField
              name="location"
              label="Location"
              placeholder="City / State"
              colWidth={6}
            /> */}
             <SingleSelect
            name="location"
            label="Location"
            placeholder="Select Location..."
            className="w-100"
            options={optionPlaces??[]}
            colWidth={6}  
            
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border" 
          /> 
          
            {/* Vehicle No */}
            <FormikField
              name="vehicleNo"
              label="Vehicle No"
              placeholder=" Vehicle No..."
              colWidth={6}
            />
          
            {/* Register No */}
            <FormikField
              name="registerNo"
              label="Register No"
              placeholder="Register No..."
              colWidth={6}
            />
          </Row>

          <Row>
            {/* Truck Permission */}
            {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <FormikField
                name="truckPermission"
                label="Truck Permission"
                type="file"
                colWidth={3}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  if (file) {
                    setFieldValue("truckPermission", file.name);
                  }
                }}
              />
              {values?.truckPermission && (
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
                      marginTop: "9px",
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
                    title={values?.truckPermission}
                  >
                    {values?.truckPermission}
                  </p>
                </div>
              )}
            </div> */}
             <div style={{ 
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",  // vertically center items
  // gap: "20px"            // space between items
}}>
  <FormikField
    name="truckPermission"
    label="Truck Permission"
    type="file"
    xs={4}
    colWidth={3}
    onChange={(event) => {
      const file = event.currentTarget.files[0];
      if (file) {
        setFieldValue("truckPermission", file.name);
      }
    }}
  />

  {values?.truckPermission && (
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
        src={"/public/img/pdfimg.png"}
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
        title={values?.truckPermission}
      >
        {values?.truckPermission}
      </p>
    </div>
  )}
</div>
          </Row>

          <Row>
            {/* Vehicle Type */}
            <SingleSelect
              name="vehicleType"
              label="Truck Type"
              placeholder="Select Truck type..."
              className="w-100"
              options={optiontrucks}
              
              onChange={(selected) => {
                setFieldValue("vehicleType", selected.value);
              }}
              colWidth={6}
              variant="border"
            />
          
            {/* License Expiry Date */}
            <FormikField
              name="license_exp"
              label="License Exp. Date"
              type="date"
              colWidth={6}
            />
          </Row>
      

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    )}
  </Formik>
  </Commonmodal>
  <ConfirmationDialog
        open={confirmationState}
        onOpenChange={setConfirmationState}
        title="Confirm Deletion"
        message="Are you sure you want to delete this driver ?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />

          {/* ---------- End of Modal ---------- */}
        </div>
      )}
    </>
  );
}
