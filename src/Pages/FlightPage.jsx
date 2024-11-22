import React, { useState, useEffect } from "react";
import ProjectData from "../Data/ProjectData.js";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Navbar from "../Components/Navbar.jsx";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useFlightContext } from "../Context/AppContext.jsx";

const FlightPage = () => {
  // Main screen input Data grabbing from Context
  const { formData } = useFlightContext();
  console.log("formData:", formData.seats);
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 9000]);
  const [durationFilter, setDurationFilter] = useState("all");
  const [airlineFilter, setAirlineFilter] = useState("all");
  const [departureFilter, setDepartureFilter] = useState("all");
  const [arrivalFilter, setArrivalFilter] = useState("all");
  const [sortOption, setSortOption] = useState("price");

  // Read flight data from the Data file and setting into State
  useEffect(() => {
    setFlights(ProjectData);
  }, []);

  // Apply filtering based on selected options
  useEffect(() => {
    let filtered = flights;

    // Price slider filter
    filtered = filtered.filter(
      (flight) => flight.Price >= priceRange[0] && flight.Price <= priceRange[1]
    );

    // Filter by Duration
    if (durationFilter === "2h") {
      filtered = filtered.filter((flight) => flight.Duration === "2h");
    } else if (durationFilter === "3h") {
      filtered = filtered.filter(
        (flight) => flight.Duration > "2h" && flight.Duration < "3h"
      );
    } else if (durationFilter === "moreThan3h") {
      filtered = filtered.filter((flight) => flight.Duration >= "3h");
    }

    // Filter by Airline
    if (airlineFilter !== "all") {
      filtered = filtered.filter((flight) => flight.Airline === airlineFilter);
    }

    // Filter by Departure time
    if (departureFilter !== "all") {
      filtered = filtered.filter((flight) =>
        isWithinTimeRange(flight.Departure, departureFilter)
      );
    }

    // Filter by Arrival time
    if (arrivalFilter !== "all") {
      filtered = filtered.filter((flight) =>
        isWithinTimeRange(flight.Arrival, arrivalFilter)
      );
    }

    setFilteredFlights(filtered);
  }, [
    flights,
    priceRange,
    durationFilter,
    airlineFilter,
    departureFilter,
    arrivalFilter,
  ]);

  // Helper function to check if a time falls within a range - 3 AM to 5:59 AM
  const isWithinTimeRange = (time, range) => {
    const [start, end] = range.split(" to ");
    return time >= start && time <= end;
  };

  // Sort logic here
  const sortFlights = () => {
    let sortedFlights = [...filteredFlights];
    switch (sortOption) {
      case "price":
        sortedFlights.sort((a, b) => a.Price - b.Price);
        break;
      case "duration":
        sortedFlights.sort(
          (a, b) => parseInt(a.Duration) - parseInt(b.Duration)
        );
        break;
      case "arrival":
        // localeCompare - for comparing which value come before and after
        sortedFlights.sort((a, b) => a.Arrival.localeCompare(b.Arrival));
        break;
      case "departure":
        sortedFlights.sort((a, b) => a.Departure.localeCompare(b.Departure));
        break;
      case "seats":
        sortedFlights.sort((a, b) => a.SeatsAvailable - b.SeatsAvailable);
        break;
      case "airline":
        sortedFlights.sort((a, b) => a.Airline.localeCompare(b.Airline));
        break;
      default:
        break;
    }
    setFilteredFlights(sortedFlights);
  };

  // Apply sorting when the sortOption state changes
  useEffect(() => {
    sortFlights();
  }, [sortOption]);

  const isSeatsMatched = (seats, seatsAvailable) => {
    // If formData.seats is empty, consider it as a match for all flights
    if (seats == "") return true;
    else if (seats == seatsAvailable) return true;
    else return false;
  };

  // Checking if there are flights that are matching in with the selected number of seats
  const areFlightsAvailable = filteredFlights.some((flight) =>
    isSeatsMatched(formData.seats, flight.SeatsAvailable)
  );

  return (
    <>
      <Navbar />
      <div className="p-4 mt-[1.5rem]">
        <div className="w-[95%] m-auto">
          {/* <div className="w-[95%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "> */}
          <Link to={"/"}>
            <button className="flex items-center px-4 py-2 bg-[#1989C8] text-white rounded-md">
              <BiArrowBack
                style={{
                  marginRight: "5px",
                }}
              />
              <p>Back</p>
            </button>
          </Link>
          {/* Filters */}
          <div className="col-span-full mb-4 mt-[1rem]">
            {/* Price Range Slider */}
            <div className="mb-4">
              <div className="text-lg font-bold mb-2">Price Range</div>
              <div className="flex items-center">
                <div className="w-1/2 pr-2">
                  <Slider
                    min={0}
                    max={9000}
                    value={priceRange}
                    onChange={(value) => setPriceRange(value)}
                    range
                    trackStyle={{
                      backgroundColor: "#1989C8",
                      height: "4px",
                    }}
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <div className="text-center">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>
            </div>

            <div className="block md:flex md:justify-between lg:flex lg:justify-between">
              {/* Duration Filter */}
              <div className="mb-4">
                <div className="text-lg font-bold mb-2">Duration</div>
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full bg-white border rounded px-4 py-2"
                >
                  <option value="all">All</option>
                  <option value="2h">Less than 2 Hours</option>
                  <option value="3h">2 Hours to less than 3 Hours</option>
                  <option value="moreThan3h">More than 3 Hours</option>
                </select>
              </div>

              {/* Airline Filter */}
              <div className="mb-4">
                <div className="text-lg font-bold mb-2">Airline</div>
                <select
                  value={airlineFilter}
                  onChange={(e) => setAirlineFilter(e.target.value)}
                  className="w-full bg-white border rounded px-4 py-2"
                >
                  <option value="all">All</option>
                  <option value="Air India">Air India</option>
                  <option value="Jet Airways">Jet Airways</option>
                  <option value="Indigo">IndiGo</option>
                </select>
              </div>

              {/* Departure Time Filter */}
              <div className="mb-4">
                <div className="text-lg font-bold mb-2">Departure</div>
                <select
                  value={departureFilter}
                  onChange={(e) => setDepartureFilter(e.target.value)}
                  className="w-full bg-white border rounded px-4 py-2"
                >
                  <option value="all">All</option>
                  <option value="12 AM to 2:59 AM">12 AM to 2:59 AM</option>
                  <option value="3 AM to 5:59 AM">3 AM to 5:59 AM</option>
                  <option value="4 AM to 7:59 AM">4 AM to 7:59 AM</option>
                  <option value="8 AM to 11:59 AM">8 AM to 11:59 AM</option>
                </select>
              </div>

              {/* Arrival Time Filter */}
              <div className="mb-4">
                <div className="text-lg font-bold mb-2">Arrival</div>
                <select
                  value={arrivalFilter}
                  onChange={(e) => setArrivalFilter(e.target.value)}
                  className="w-full bg-white border rounded px-4 py-2"
                >
                  <option value="all">All</option>
                  <option value="12 AM to 2:59 AM">12 AM to 2:59 AM</option>
                  <option value="3 AM to 5:59 AM">3 AM to 5:59 AM</option>
                  <option value="4 AM to 7:59 AM">4 AM to 7:59 AM</option>
                  <option value="8 AM to 11:59 AM">8 AM to 11:59 AM</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="mb-4">
                <div className="text-lg font-bold mb-2">Sort By</div>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full bg-white border rounded px-4 py-2"
                >
                  <option value="price">Price</option>
                  <option value="duration">Duration</option>
                  <option value="arrival">Arrival</option>
                  <option value="departure">Departure</option>
                  <option value="seats">No. of Seats</option>
                  <option value="airline">Airline</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Cards */}
        <div className="w-[95%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {areFlightsAvailable ? (
            filteredFlights.map((flight, index) =>
              isSeatsMatched(formData.seats, flight.SeatsAvailable) ? (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-custom-hover hover:transition ease-in-out duration-300"
                >
                  <img
                    src={
                      "https://simg.nicepng.com/png/small/131-1313581_mode-vector-and-png-airplane-blue-logo-png.png"
                    }
                    alt={flight.Airline}
                    className="h-8 w-8 mx-auto mb-4"
                  />

                  <div className="text-center mb-2 font-bold">
                    {flight.Airline}
                  </div>
                  <div className=" md:flex justify-center  text-center text-sm text-gray-600 mb-4">
                    <p className="mr-[5px]">Departure: {flight.Departure}</p> -{" "}
                    <p className="ml-[5px]">Arrival: {flight.Arrival}</p>
                  </div>
                  <div className="text-center mb-4">{flight.Duration}</div>
                  <div className="text-center text-xl font-bold mb-4">
                    ${flight.Price}
                  </div>
                  <div className="text-center">
                    Seats: {flight.SeatsAvailable}
                  </div>
                </div>
              ) : null
            )
          ) : (
            <h1 className="text-center text-red-500 font-bold">
              No flights available with the selected number of seats.
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default FlightPage;
