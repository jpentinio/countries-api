import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Card = ({ flag, country, population, region, capital }) => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.countriesAPI.theme);
  return (
    <div
      onClick={() => navigate(`/details/${country.official.toLowerCase()}`)}
      className={`${
        theme === "light" ? "bg-white" : "bg-dark-blue"
      } flex flex-col rounded-lg shadow-lg cursor-pointer hover:shadow-xl`}
    >
      <img
        src={flag?.png}
        alt={flag?.alt}
        className="w-full h-60 rounded-t-lg"
      />
      <div className="p-6 flex flex-col gap-4">
        <div className="text-xl font-bold">{country.common}</div>
        <div>
          <div>
            <span className="font-semibold">Population:</span>{" "}
            {population.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Region:</span> {region}
          </div>
          <div>
            <span className="font-semibold">Capital:</span> {capital.join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
