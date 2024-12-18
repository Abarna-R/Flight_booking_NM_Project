import React, { createContext, useState, useContext } from "react";

const FlightContext = createContext();

export const useFlightContext = () => useContext(FlightContext);

export const FlightContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    seats: "",
  });
  return (
    <FlightContext.Provider value={{ formData, setFormData }}>
      {children}
    </FlightContext.Provider>
  );
};
