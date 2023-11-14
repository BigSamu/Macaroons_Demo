"use client";

import { createContext, useState, useContext } from "react";

const ResourceContext = createContext({});

export const ResourceProvider = ({ children }) => {
  const [currentResource, setCurrentResource] = useState({});
  const [isLoadingResource, setIsLoadingResource] = useState(false);

  const context = {
    currentResource,
    setCurrentResource,
    isLoadingResource,
    setIsLoadingResource

  };

  return (
    <ResourceContext.Provider value={context}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResourceContext = () => useContext(ResourceContext);
