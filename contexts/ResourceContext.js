"use client";

import { createContext, useState, useContext } from "react";

const ResourceContext = createContext({});

export const ResourceProvider = ({ children }) => {
  const [currentResource, setCurrentResource] = useState({});

  const context = {
    currentResource,
    setCurrentResource,
  };

  return (
    <ResourceContext.Provider value={context}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResourceContext = () => useContext(ResourceContext);
