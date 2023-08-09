import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Actions from "./redux/actions";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.countriesAPI.theme);

  return (
    <div className={`theme ${theme}`}>
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-dark-blue border-very-dark-blue"
        } border-b p-6 shadow-sm`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div
            onClick={() => navigate("/")}
            className="text-xl font-bold cursor-pointer"
          >
            Where in the world?
          </div>
          <div
            onClick={() =>
              dispatch(Actions.setTheme(theme === "light" ? "dark" : "light"))
            }
            className="select-none font-medium flex items-center cursor-pointer"
          >
            {theme === "light" ? (
              <BsMoon className="w-4 h-4" />
            ) : (
              <BsSun className="w-4 h-4" />
            )}
            <span className="ml-2 font-semibold">
              {theme === "light" ? "Dark" : "Light"} Mode
            </span>
          </div>
        </div>
      </div>
      <div className={`p-10 min-h-[100vh]`}>
        <div className="container mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
