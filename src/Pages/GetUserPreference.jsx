import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useFlightContext } from "../Context/AppContext";

const GetUserPreference = () => {
  const navigate = useNavigate();
  const { setFormData, formData } = useFlightContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/flights");
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-[3rem] pb-[2rem] md:mt-[5rem] bg-white ">
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h1 className="text-2xl font-bold mb-6">Enter Your Trip Details</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="source"
                className="block text-sm font-medium text-gray-700"
              >
                Source
              </label>
              <input
                type="text"
                id="source"
                className="mt-1 py-1 block w-full rounded-md border-2 border-gray-300 shadow-sm"
                value={formData.source}
                required
                onChange={handleChange}
                name="source"
              />
            </div>
            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700"
              >
                Destination
              </label>
              <input
                type="text"
                id="destination"
                className="mt-1 py-1 block w-full rounded-md border-2 border-gray-300 shadow-sm"
                value={formData.destination}
                onChange={handleChange}
                required
                name="destination"
              />
            </div>
            <div>
              <label
                htmlFor="seats"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Seats
              </label>
              <input
                id="seats"
                className="mt-1 py-1 block w-full rounded-md border-2 border-gray-300 shadow-sm"
                type="number"
                value={formData.seats}
                onChange={handleChange}
                name="seats"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1989C8] text-white rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GetUserPreference;
