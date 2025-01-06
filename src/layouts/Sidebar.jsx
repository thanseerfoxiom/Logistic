import React, { useContext } from "react";
import { ContextDatas } from "../services/Context";
import {
  basePath,
  driversPath,
  financePath,
  jobsPath,
  notificationPath,
  quotationPath,
  settingsPath,
  truckPath,
} from "../services/UrlPaths";
import { Link, useNavigate } from "react-router-dom/dist";

function Sidebar() {
  const { mobileSide, setmobileSide, urlPath, setUrlPath } =
    useContext(ContextDatas);

  let navigate = useNavigate();

  return (
    <div className="sidebar-wrapper">
      <div
        className={`sidebar sidebar-collapse ${mobileSide ? "collapsed" : ""}`}
        id="sidebar"
      >
        <div className="sidebar__menu-group">
          <ul className="sidebar_nav">
            <li className={urlPath === basePath ? "active" : ""}>
              <Link to={basePath} onClick={() => setUrlPath(basePath)}>
                <span className="nav-icon uil uil-create-dashboard" />
                <span className="menu-text">Dashboard</span>
                {/* <span className="badge badge-info-10 menuItem rounded-pill">
              1.1.7
            </span> */}
              </Link>
            </li>
            <li className={urlPath.includes(quotationPath) ? "active" : ""}>
             
            <Link
                to={basePath + quotationPath}
                onClick={() => setUrlPath(basePath + quotationPath)}
              >
                <span className="nav-icon uil uil-truck-loading" />
                <span className="menu-text">Quotation</span>
                {/* <span className="badge badge-info-10 menuItem rounded-pill">
              1.1.7
            </span> */}
              </Link>
            </li>
            <li className={urlPath.includes(jobsPath) ? "active" : ""}>
             
              <Link
                to={basePath + jobsPath}
                onClick={() => setUrlPath(basePath + jobsPath)}
              >
                <span className="nav-icon uil uil-bag" />
                <span className="menu-text">jobs</span>
                {/* <span className="badge badge-info-10 menuItem rounded-pill">
              1.1.7
            </span> */}
              </Link>
    
            </li>

            <li className={urlPath.includes(driversPath) ? "active" : ""}>
              <Link
                to={basePath + driversPath}
                onClick={() => setUrlPath(basePath + driversPath)}
              >
                <span className="nav-icon uil uil-car-sideview" />
                <span className="menu-text">Drivers</span>
                {/* <span className="badge badge-info-10 menuItem rounded-pill">
              1.1.7
            </span> */}
              </Link>
            </li>

            <li className={urlPath.includes(truckPath) ? "active" : ""}>
              <Link
                to={basePath + truckPath}
                onClick={() => setUrlPath(basePath + truckPath)}
              >
                <span className="nav-icon uil uil-truck" />
                <span className="menu-text">Trucks and Price</span>
                {/* <span className="badge badge-info-10 menuItem rounded-pill">
              1.1.7
            </span> */}
              </Link>
            </li>

       

            {/* <li className={`has-child ${isOpen ? "open" : ""}`}>
          <a
            href="#"
            className="active"
            onClick={(e) => {
              e.preventDefault();
              setisOpen(!isOpen);
            }}
          >
            <span className="nav-icon uil uil-stethoscope" />
            <span className="menu-text">Doctor Management</span>
            <span className="toggle-icon" />
          </a>
          <ul style={{ display: isOpen ? "block" : "none" }}>
            <li className="active">
              <a href="index-2.html">Doctors</a>
            </li>
            <li className="">
              <a href="index-2.html">Specialization</a>
            </li>
            <li className="">
              <a href="index-2.html">Pricing Plans</a>
            </li>
          </ul>
        </li> */}

            <li className={urlPath.includes(financePath) ? "active" : ""}>
              <Link
                to={basePath + financePath}
                onClick={() => setUrlPath(basePath + financePath)}
              >
                <span className="nav-icon uil uil-usd-circle" />
                <span className="menu-text">Finance</span>
                {/* <span className="badge badge-info-10 menuItem rounded-pill">
              1.1.7
            </span> */}
              </Link>
            </li>

            {/* <li className={urlPath.includes("settings") ? "active" : ""}>
              <Link
                to={basePath + settingsPath}
                onClick={() => setUrlPath(basePath + settingsPath)}
              >
                <i className="nav-icon fas fa-cog" />
                <span className="menu-text">Settings</span>
              
              </Link>
            </li> */}


            {/* <li className="menu-title mt-30">
          <span>Applications</span>
        </li> */}

            {/* <li className>
          <a href="sign-up.html">
            <span className="nav-icon uil uil-sign-out-alt" />
            <span className="menu-text">Sign Up</span>
          </a>
        </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
