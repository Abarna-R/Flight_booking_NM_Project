import React from "react";
import { Route, Routes } from "react-router-dom";
import FlightPage from "../Pages/FlightPage";
import GetUserPreference from "../Pages/GetUserPreference";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GetUserPreference />} />
      <Route path="/flights" element={<FlightPage />} />
    </Routes>
  );
};

export default AllRoutes;
