import React from "react";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../utils/Validation";

function PageLogin() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      //login function will be call here
    },
  });

  return (
    <div>
      <main className="main-content" style={{ marginTop: "-20px" }}>
        <div className="admin">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-8">
                <div className="edit-profile">
                  <div className="edit-profile__logos">
                    <a href="/">
                      <img
                        className="dark"
                        src="/img/clarita/logo.svg"
                        alt
                        width={40}
                      />
                      <img className="light" src="/img/clarita/logo.svg" alt />
                    </a>
                  </div>
                  <div className="card border-0">
                    <div className="card-header">
                      <div className="edit-profile__title">
                        <h6>Sign in Clarita Admin</h6>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="edit-profile__body">
                        <div className="form-group mb-25">
                          <label htmlFor="username">
                            Username or Email Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="name@example.com"
                          />
                        </div>
                        <div className="form-group mb-15">
                          <label htmlFor="password-field">password</label>
                          <div className="position-relative">
                            <input
                              id="password-field"
                              type="password"
                              className="form-control"
                              name="password"
                              placeholder="Password"
                            />
                            <div className="uil uil-eye-slash text-lighten fs-15 field-icon toggle-password2"></div>
                          </div>
                        </div>
                        <div className="admin-condition">
                          <div className="checkbox-theme-default custom-checkbox ">
                            <input
                              className="checkbox"
                              type="checkbox"
                              id="check-1"
                            />
                            <label htmlFor="check-1">
                              <span className="checkbox-text">
                                Keep me logged in
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="admin__button-group button-group d-flex pt-1 justify-content-md-start justify-content-center">
                          <button className="btn btn-primary btn-default w-100 btn-squared text-capitalize lh-normal px-50 signIn-createBtn ">
                            sign in
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div id="overlayer">
        <div className="loader-overlay">
          <div className="dm-spin-dots spin-lg">
            <span className="spin-dot badge-dot dot-primary" />
            <span className="spin-dot badge-dot dot-primary" />
            <span className="spin-dot badge-dot dot-primary" />
            <span className="spin-dot badge-dot dot-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLogin;
