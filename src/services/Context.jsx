import { createContext, useEffect, useState } from "react";
import places from "../json/places.json"
export const ContextDatas = createContext();

const Context = ({ children }) => {
  const [urlPath, setUrlPath] = useState(window.location.pathname ?? "/");
  const [mobileSide, setmobileSide] = useState(false);
  const [pageLoading, setpageLoading] = useState(true);
  const [user, setuser] = useState(localStorage.getItem("token"))
  const optionPlaces = places?.map(item=>({
    value:item.city,
    label:item.city,
    lat:item.latitude,
    lon:item.longitude
  }))

  return (
    <ContextDatas.Provider
      value={{
        mobileSide,
        setmobileSide,
        urlPath,
        setUrlPath,
        pageLoading, setpageLoading,
        user, setuser,
        optionPlaces
      }}
    >
      {children}
    </ContextDatas.Provider>
  );
};

export default Context;
