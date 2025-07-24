import React, { useEffect, useRef, useState } from "react";

const seasons = ["Spring", "Summer", "Autumn", "Winter"];

const cityData = [
  { name: "Paris", image: "./images/hawamahal.jpg" },
  { name: "Tokyo", image: "/api/placeholder/400/300" },
  { name: "New York", image: "/api/placeholder/400/300" },
  { name: "London", image: "/api/placeholder/400/300" },
  { name: "Rome", image: "/api/placeholder/400/300" },
  { name: "Sydney", image: "/api/placeholder/400/300" },
  { name: "Barcelona", image: "/api/placeholder/400/300" },
  { name: "Dubai", image: "/api/placeholder/400/300" },
  { name: "Amsterdam", image: "/api/placeholder/400/300" },
  { name: "Singapore", image: "/api/placeholder/400/300" },
  { name: "San Francisco", image: "/api/placeholder/400/300" },
  { name: "Rio de Janeiro", image: "/api/placeholder/400/300" },
];

const TravelShowcase = () => {
  const [selectedSeason, setSelectedSeason] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const scrollAnimation = () => {
        if (
          scrollElement.scrollTop + scrollElement.clientHeight >=
          scrollElement.scrollHeight
        ) {
          scrollElement.scrollTop = 0;
        } else {
          scrollElement.scrollTop += 1;
        }
      };

      const intervalId = setInterval(scrollAnimation, 50);
      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg mt-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-indigo-700">
          Popular Cities,
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {selectedSeason || "Select Season"}
            <svg
              className="fill-current h-4 w-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
              {seasons.map((season) => (
                <button
                  key={season}
                  className="block w-full text-left px-4 py-2 text-sm capitalize text-gray-700 hover:bg-indigo-500 hover:text-white"
                  onClick={() => {
                    setSelectedSeason(season);
                    setIsOpen(false);
                  }}
                >
                  {season}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden h-[900px]" ref={scrollRef}>
        <div className="grid grid-cols-3 gap-6">
          {cityData.map((city, index) => (
            <div key={index} className="relative group">
              <div className="bg-white rounded-lg shadow-md transition duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-xl overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 flex items-end justify-center pb-4">
                  <span className="text-white text-xl font-bold">
                    {city.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelShowcase;
