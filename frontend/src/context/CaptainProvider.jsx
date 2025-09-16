import React, { useState } from "react";
import { CaptainDataContext } from "./CaptainDataContext";

const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => setCaptain(captainData);

  return (
    <CaptainDataContext.Provider
      value={{
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
      }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainProvider;
