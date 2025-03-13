import React, { useContext } from "react";
import { ContextDatas } from "../../../services/Context";

function PageDashboard() {
  const { mobileSide, setmobileSide } = useContext(ContextDatas);

  return (
    <div className={`contents  ${mobileSide ? "expanded" : ""}`}>
      <div className="demo4 crm">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-lg-12">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">Demo 4</h4>
                <div className="breadcrumb-action justify-content-center flex-wrap">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="#">
                          <i className="uil uil-estate" />
                          Dashboard
                        </a>
                      </li>
                    
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            
            <div className="col-xxl-4 mb-25">
              <div className="row">
                <div className="col-md-6">
                  <div className="overview-content products-awards pt-20 pb-20 text-center radius-xl">
                    <div className="d-inline-flex flex-column align-items-center justify-content-center">
                      <div className="revenue-chart-box__Icon order-bg-opacity-primary color-primary me-0">
                        <i className="uil uil-briefcase-alt" />
                      </div>
                      <div className="d-flex align-items-start flex-wrap">
                        <div>
                          <p className="mb-1 mb-0 color-gray">
                            Total Jobs{""}
                          </p>
                          <h1>21K</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="overview-content products-awards pt-20 pb-20 text-center radius-xl">
                    <div className="d-inline-flex flex-column align-items-center justify-content-center">
                      <div className="revenue-chart-box__Icon order-bg-opacity-info color-info me-0">
                        <i className="uil uil-award" />
                      </div>
                      <div className="d-flex align-items-start flex-wrap">
                        <div>
                          <p className="mb-1 mb-0 color-gray">Total Quotes</p>
                          <h1>15K</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
           
           
        
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageDashboard;
