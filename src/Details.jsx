import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Actions from "./redux/actions";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.countriesAPI.countryDetails.loading
  );
  const data = useSelector((state) => state.countriesAPI.countryDetails.data);
  const theme = useSelector((state) => state.countriesAPI.theme);

  useEffect(() => {
    if (id) {
      async function getDetails() {
        await dispatch(Actions.getCountryDetails(id));
      }
      getDetails();
    }
  }, []);

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className={`flex items-center px-8 py-2 border w-fit shadow rounded-lg ${
          theme === "dark" && "bg-dark-blue border-very-dark-blue"
        }`}
      >
        <MdOutlineKeyboardBackspace />
        <span className="ml-2">Back</span>
      </button>
      <div className="my-16 grid grid-cols-2 gap-20">
        <img
          src={data.flags?.png}
          alt={data.flags?.alt}
          className="w-full h-fit"
        />
        <div className="flex flex-col justify-center">
          <div className="text-4xl font-bold">{data.name?.common}</div>
          <div className="grid grid-cols-2 gap-10 mt-8">
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-semibold mr-2">Native Name:</span>
                {data.name?.nativeName &&
                  Object.values(data.name?.nativeName)
                    .map((item) => item.common)
                    .join(", ")}
              </div>
              <div>
                <span className="font-semibold mr-2">Population:</span>
                {data.population?.toLocaleString()}
              </div>
              <div>
                <span className="font-semibold mr-2">Region:</span>
                {data?.region}
              </div>
              <div>
                <span className="font-semibold mr-2">Sub Region:</span>
                {data?.subregion}
              </div>
              <div>
                <span className="font-semibold mr-2">Capital:</span>
                {data.capital?.length > 0 ? data?.capital.join(", ") : ""}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-semibold mr-2">Top Level Domain:</span>
                {data.tld?.length > 0 ? data?.tld.join(", ") : ""}
              </div>
              <div>
                <span className="font-semibold mr-2">Currencies:</span>
                {data?.currencies &&
                  Object.values(data?.currencies)
                    .map((item) => item.name)
                    .join(", ")}
              </div>
              <div>
                <span className="font-semibold mr-2">Languages:</span>
                {data?.languages &&
                  Object.values(data?.languages)
                    .map((item) => item)
                    .join(", ")}
              </div>
            </div>
          </div>
          {data.borders?.length > 0 ? (
            <div className="mt-14 flex">
              <div className="font-semibold mr-4">Border Countries: </div>
              <div className="grid grid-cols-4 gap-4">
                {data?.borders.map((item, index) => (
                  <button
                    key={index}
                    className={`px-6 py-2 shadow border text-xs rounded-lg cursor-default ${
                      theme === "dark" && "border-very-dark-blue bg-dark-blue"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
