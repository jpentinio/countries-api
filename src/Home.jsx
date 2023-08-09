import { Button, Dropdown, Input, Pagination, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Actions from "./redux/actions";
import Card from "./components/Card";

// const items = [
//   { key: "Africa", label: "Africa" },
//   { key: "2", label: "America" },
//   { key: "3", label: "Asia" },
//   { key: "4", label: "Europe" },
//   { key: "5", label: "Oceania" },
// ];

const items = ["All", "Africa", "Americas", "Asia", "Europe"];

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.countriesAPI.countries.loading);
  const data = useSelector((state) => state.countriesAPI.countries.data);
  const search = useSelector((state) => state.countriesAPI.search);
  const filter = useSelector((state) => state.countriesAPI.filter);
  const theme = useSelector((state) => state.countriesAPI.theme);

  async function getData() {
    let res = await dispatch(Actions.getCountries("all"));
    return res.status;
  }

  async function searchCountries(value) {
    await dispatch(Actions.getCountries(value));
  }

  async function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
    try {
      searchCountries(!e.target.value ? "all" : `name/${e.target.value}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFilter(e) {
    let res = await getData();
    if (res === 200) {
      dispatch(Actions.setFilter(e.key));
    }
  }

  function setSearch(value) {
    dispatch(Actions.setSearch(value));
  }

  useEffect(() => {
    if (!search && filter === "All") {
      getData();
    }
  }, []);

  useEffect(() => {
    if (search !== "") {
      const delayDebounceFn = setTimeout(() => {
        handleSearch(search);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [search]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          placeholder="Search for a country..."
          size="large"
          prefix={<BsSearch className="text-gray-500" />}
          className={`px-4 sm:w-[400px] ${
            theme === "light"
              ? "bg-white"
              : "bg-dark-blue text-white border-very-dark-blue"
          }`}
          value={search}
          onChange={(e) => handleSearch(e)}
        />
        <div>
          <style>
            {`
              .ant-input {
                background-color: inherit;
                color: ${theme === "dark" && "white"};
              }
            `}
          </style>
        </div>
        <Tooltip title="Filter by Region">
          <Dropdown
            menu={{
              onClick: handleFilter,
              items: items.map((item) => {
                return { key: item, label: item };
              }),
            }}
            trigger={["click"]}
          >
            <Button
              className={`${
                theme === "dark" &&
                "text-white bg-dark-blue border-very-dark-blue"
              } w-full sm:w-auto`}
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                {filter}
                <BiChevronDown />
              </Space>
            </Button>
          </Dropdown>
        </Tooltip>
      </div>
      <div className="py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {loading ? (
          [...Array(8)].map(() => (
            <div
              className={`${
                theme === "light" ? "bg-white" : "bg-dark-blue"
              } animate-pulse  flex flex-col rounded-lg shadow-lg cursor-pointer hover:shadow-xl`}
            >
              <div className="w-full h-60 rounded-t-lg bg-slate-400" />
              <div className="p-6 flex flex-col gap-4">
                <div className="rounded-full bg-slate-400 h-4 w-full"></div>
                <div className="pt-4">
                  <div className="rounded-full bg-slate-400 h-4 w-52">
                    <span className="font-semibold"></span>{" "}
                  </div>
                  <div className="my-4 rounded-full bg-slate-400 h-4 w-40">
                    <span className="font-semibold"></span>{" "}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <Card
              key={index}
              flag={item.flags}
              country={item.name}
              population={item.population}
              region={item.region}
              capital={item.capital}
            />
          ))
        ) : (
          <div className="p-12 text-center w-full absolute left-0 right-0">
            No results
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
