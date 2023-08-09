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
        } border-b p-10 shadow-sm`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div
            onClick={() => navigate("/")}
            className="sm:text-xl font-bold cursor-pointer"
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
      <div className="px-2 flex flex-row p-2 items-center justify-center">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io/home"
          target="_blank"
          rel="noopener noreferrer"
          className="pl-2"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://www.frontendmentor.io/profile/jpentinio"
          target="_blank"
          className="px-2"
        >
          Joshua M. Pentinio
        </a>
      </div>
    </div>
  );
};

export default Layout;
