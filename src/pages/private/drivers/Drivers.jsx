import React, { useContext, useEffect, useState } from "react";
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

export default function Drivers() {
  const [pageLoading, setPageLoading] = useState(true);
  const { mobileSide } = useContext(ContextDatas);

  // For controlling the Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Holds data for the currently selected driver (for editing)
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Dummy array to display in table. Replace with data from your API.
  const driverData = [
    {
      id: 1323,
      name: "a tobcompany shfbs sdufbsd fuisdif u",
      location: "Dubai",
      contact: "+971 58 123 4567",
      vehicleNo: "ABC-1234",
      registerNo: "12540444584",
      vehicleType: "4 axil",
      licenceExpDate: "2025-03-13",
      truckPermission: "/public/img/pdfimg.png",
    },
    {
      id: 1323,
      name: "a tobcompany shfbs sdufbsd fuisdif u",
      location: "Dubai",
      contact: "+971 58 123 4567",
      vehicleNo: "ABC-1234",
      registerNo: "12540444584",
      vehicleType: "4 axil",
      licenceExpDate: "2025-03-13",
      truckPermission: "/public/img/pdfimg.png",
    },
    // ... add more rows if desired
  ];

  // Simulate a loader for 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
  const vehicleTypeOptions = [
    { value: "2 axil", label: "2 axil" },
    { value: "4 axil", label: "4 axil" },
    { value: "6 axil", label: "6 axil" },
  ];

  /**
   * Handler for Formik's onSubmit
   * @param {object} values - The form values
   */
  const handleSubmitForm = (values) => {
    // If you have an API, call it here (POST or PUT).
    // Example: if values.id exists, it's an update; else it's a create.
    console.log("Submitted Driver Values:", values);
    handleClose();
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
                          <div className="userDatatable mt-1 p-2 table-responsive">
                            <table className="table table--default body-px-25">
                              <thead>
                                <tr className="userDatatable-header">
                                  <th>
                                    <span className="userDatatable-title">
                                      Driver ID
                                    </span>
                                  </th>
                                  <th>
                                    <span className="userDatatable-title">
                                      Name
                                    </span>
                                  </th>
                                  <th>
                                    <span className="userDatatable-title">
                                      Mobile
                                    </span>
                                  </th>
                                  <th>
                                    <span className="userDatatable-title">
                                      Location
                                    </span>
                                  </th>
                                  <th>
                                    <span className="userDatatable-title">
                                      Vehicle No
                                    </span>
                                  </th>
                                  <th>
                                    <span className="userDatatable-title">
                                      Register No
                                    </span>
                                  </th>
                                  <th>
                                    <span className="userDatatable-title">
                                      Vehicle Type
                                    </span>
                                  </th>
                                  <th>
                                    <span className="userDatatable-title">
                                      Action
                                    </span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {driverData.map((driver) => (
                                  <tr key={driver.id}>
                                    <td className="text-ellipsis">
                                      {driver.id}
                                    </td>
                                    <td className="text-ellipsis">
                                      {driver.name}
                                    </td>
                                    <td className="text-ellipsis">
                                      {driver.contact}
                                    </td>
                                    <td className="text-ellipsis">
                                      {driver.location}
                                    </td>
                                    <td className="text-ellipsis">
                                      {driver.vehicleNo}
                                    </td>
                                    <td className="text-ellipsis">
                                      {driver.registerNo}
                                    </td>
                                    <td className="text-ellipsis">
                                      {driver.vehicleType}
                                    </td>
                                    <td>
                                      <ul className="text-align-center d-flex">
                                        <li>
                                          <a
                                            href="#!"
                                            className="edit"
                                            onClick={() =>
                                              handleEditDriver(driver)
                                            }
                                          >
                                            <i className="uil uil-edit action_fonts"></i>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#!" className="remove">
                                            <i className="uil uil-trash-alt action_fonts"></i>
                                          </a>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <Pagination />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- Modal with Formik & FormikField/SingleSelect ---------- */}
          <Modal show={show} onHide={handleClose}>
            <Formik
              // If `selectedDriver` is null, default everything to empty string
              initialValues={{
                id: selectedDriver?.id || "",
                name: selectedDriver?.name || "",
                contact: selectedDriver?.contact || "",
                location: selectedDriver?.location || "",
                vehicleNo: selectedDriver?.vehicleNo || "",
                registerNo: selectedDriver?.registerNo || "",
                vehicleType: selectedDriver?.vehicleType || "",
                licenceExpDate:
                  selectedDriver?.licenceExpDate?.slice(0, 10) || "", // Format as YYYY-MM-DD
                truckPermission: selectedDriver?.truckPermission || "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "Driver name is required";
                }
                if (!values.contact) {
                  errors.contact = "Contact is required";
                }
                if (!values.vehicleType) {
                  errors.vehicleType = "Vehicle Type is required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmitForm(values);
                setSubmitting(false);
              }}
              enableReinitialize
            >
              {({
                errors,
                touched,
                isSubmitting,
                setFieldValue,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Header closeButton>
                    <Modal.Title>Driver Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      {/* Driver Name */}
                      <FormikField
                        name="name"
                        label="Name"
                        placeholder="Driver name..."
                        colWidth={12}
                      />
                      {errors.name && touched.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </Row>

                    <Row>
                      {/* Contact */}
                      <FormikField
                        name="contact"
                        label="Contact"
                        placeholder="+971 58 123 4567"
                        colWidth={12}
                      />
                      {errors.contact && touched.contact && (
                        <div className="text-danger">{errors.contact}</div>
                      )}
                    </Row>

                    <Row>
                      {/* Location */}
                      <FormikField
                        name="location"
                        label="Location"
                        placeholder="City / State"
                        colWidth={12}
                      />
                    </Row>

                    <Row>
                      {/* Vehicle No */}
                      <FormikField
                        name="vehicleNo"
                        label="Vehicle No"
                        placeholder="ABC-1234"
                        colWidth={12}
                      />
                    </Row>

                    <Row>
                      {/* Register No */}
                      <FormikField
                        name="registerNo"
                        label="Register No"
                        placeholder="12540444584"
                        colWidth={12}
                      />
                    </Row>

                    <Row>
                      {/* Truck Permission (PDF / Image) */}
                      <FormikField
                        name="truckPermission"
                        label="Truck Permission"
                        type="text"
                        placeholder="/public/img/pdfimg.png"
                        colWidth={12}
                      />
                      {/* 
                        If you want to show an icon/preview:
                        <img
                          className="mt-2"
                          src={values.truckPermission || "/public/img/pdfimg.png"}
                          alt="PDF Icon"
                          style={{ width: "80px", height: "80px" }}
                        />
                      */}
                    </Row>

                    <Row>
                      {/* Vehicle Type */}
                      <SingleSelect
                        name="vehicleType"
                        label="Vehicle Type"
                        placeholder="Select vehicle type"
                        className="w-100"
                        options={vehicleTypeOptions}
                        value={
                          // We find the option whose `value` matches the form's vehicleType
                          vehicleTypeOptions.find(
                            (option) => option.value === selectedDriver?.vehicleType
                          ) || null
                        }
                        onChange={(selected) => {
                          setFieldValue("vehicleType", selected.value);
                        }}
                        colWidth={12}
                        variant="border"
                      />
                      {errors.vehicleType && touched.vehicleType && (
                        <div className="text-danger">{errors.vehicleType}</div>
                      )}
                    </Row>

                    <Row>
                      {/* Licence Expiry Date */}
                      <FormikField
                        name="licenceExpDate"
                        label="Licence Exp. Date"
                        type="date"
                        colWidth={12}
                      />
                    </Row>
                  </Modal.Body>

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
          </Modal>
          {/* ---------- End of Modal ---------- */}
        </div>
      )}
    </>
  );
}
