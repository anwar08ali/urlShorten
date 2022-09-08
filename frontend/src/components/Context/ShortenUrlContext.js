import React, { createContext, useState } from "react";

export const UrlContext = createContext();
//Creating context for the urls from API so that these can be used in any child components directly
const ShortenUrlContext = ({ children }) => {
  const [urlData, setUrlData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <UrlContext.Provider
      value={{ urlData, setUrlData, isLoading, setIsLoading }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export default ShortenUrlContext;
