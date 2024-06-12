import { createContext, useEffect, useState } from "react";

export const ContextDatas = createContext();

const Context = ({ children }) => {
  const [urlPath, setUrlPath] = useState(window.location.pathname ?? "/");
  const [mobileSide, setmobileSide] = useState(false);

  return (
    <ContextDatas.Provider
      value={{
        mobileSide,
        setmobileSide,
        urlPath,
        setUrlPath,
      }}
    >
      {children}
    </ContextDatas.Provider>
  );
};

export default Context;
