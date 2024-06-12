import React, { useState } from "react";
import { Route, Routes } from "react-router-dom/dist";
import RouterConnection from "./connection/RouterConnection";
import PageLogin from "./pages/public/PageLogin";
import PageDashboard from "./pages/private/Dasboard/PageDashboard";
import Table from "./components/Table";
import PageNotFound from "./pages/public/PageNotFound";
import {
  basePath,

  driversPath,

  financePath,
  jobsPath,
  
  quotationPath,
  settingsPath,
  truckPath,
} from "./services/UrlPaths";

import SettingsManagement from "./pages/private/Settings/SettingsManagement";
import Quotation from "./pages/private/Quatation/Quotation";
import Job from "./pages/private/jobs/Job";
import Finance from "./pages/private/finance/Finance";
import Drivers from "./pages/private/drivers/Drivers";
import Trucks from "./pages/private/Trucks/Trucks";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<PageLogin />} />
        <Route path={basePath} element={<RouterConnection />}>
          <Route index element={<PageDashboard />} />
         
          <Route
            path={basePath + settingsPath}
            element={<SettingsManagement />}
          />
        
          {/* new for logistics */}
          <Route
            path={basePath + quotationPath}
            element={<Quotation />}
          />
          <Route
            path={basePath + jobsPath }
            element={<Job />}
          />
          <Route
            path={basePath + financePath }
            element={<Finance/>}
          />
          <Route
            path={basePath + driversPath }
            element={<Drivers/>}
          />
          <Route
            path={basePath + truckPath }
            element={<Trucks/>}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
