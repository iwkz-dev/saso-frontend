import React, { useEffect, useState } from "react";
import LoggedInMain from "../../src/components/Main/loggedInMain/loggedInMain";
import MenuTable from "../../src/components/Tables/MenuTable";
import { useDispatch } from "react-redux";
import { getAllMenus } from "../../src/store/reducers/menuReducer";
import { getAllCategories } from "../../src/store/reducers/categoryReducer";
import { getAllEvents } from "../../src/store/reducers/eventReducer";
import MenusFilterForm from "../../src/components/Forms/FilterForms/MenusFilterForm";
import Link from "next/link";
import { HiAdjustments } from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";

const index = () => {
  const dispatch = useDispatch();
  const pageData = { name: "Menu", href: "/menu", current: true };
  const pageTitle = "Saso App | Menu";
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [filters, setFilters] = useState([]);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);
      try {
        await Promise.all([
          dispatch(getAllEvents()),
          dispatch(getAllCategories()),
          dispatch(getAllMenus()),
        ]);
        setShowTable(true);
        setShowLoading(false);
      } catch (e) {
        setShowTable(false);
        setShowLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtersQueryBuilder = () => {
      const queries = [];
      filters.map((f) => {
        const filtersQuery = `${f.name}=${f.id}`;
        queries.push(filtersQuery);
      });
      return `?${queries.join("&")}`;
    };
    dispatch(getAllMenus(filtersQueryBuilder()));
  }, [filters]);

  const handleChangeShowFilter = () => {
    setShowFilterForm(!showFilterForm);
  };

  const handleChange = (e, name) => {
    const value = e.target.value;
    const data = {
      id: value,
      name: name,
    };
    if (name === "event") {
      setSelectedCategory(value);
    } else if (name === "category") {
      setSelectedEvent(value);
    }
    const filterIndex = filters.findIndex((f) => f.name === data.name);
    if (!(filterIndex > -1)) {
      setFilters([...filters, data]);
    } else {
      const tempFilters = [...filters];
      tempFilters[filterIndex].id = data.id;
      setFilters([...tempFilters]);
    }
  };

  return (
    <LoggedInMain title={pageTitle} pageData={pageData}>
      <h1 className="text-2xl font-bold text-left w-10/12 mb-3">Menu</h1>
      <div className="flex justify-between items-center mb-3 w-10/12">
        <div
          className="flex items-center cursor-pointer mr-5"
          onClick={() => handleChangeShowFilter()}>
          <HiAdjustments className="pr-1" size={20} />
          <span>{showFilterForm ? "Hide Filter" : "Show Filter"}</span>
        </div>
        <Link href="./menu/add" className="cursor-pointer">
          <a className="flex items-center rounded-lg p-2 border rounded-xl border-emerald-700">
            <IoMdAddCircle className="pr-1" color="#047857" size={30} />
            <span className="text-emerald-700">Add Menu</span>
          </a>
        </Link>
      </div>
      <MenusFilterForm
        handleChange={handleChange}
        showFilterForm={showFilterForm}
        handleChangeShowFilter={handleChangeShowFilter}
      />
      {showLoading ? <p>Loading...</p> : ""}
      {showTable ? (
        <MenuTable
          selectedEvent={selectedEvent}
          selectedCategory={selectedCategory}
        />
      ) : (
        ""
      )}
    </LoggedInMain>
  );
};

export default index;
