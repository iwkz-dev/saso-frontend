import React, { useEffect, useState } from "react";
import LoggedInMain from "../../src/components/Main/loggedInMain/loggedInMain";
import MenuTable from "../../src/components/Tables/MenuTable";
import { useDispatch } from "react-redux";
import { deleteMenu, getAllMenus } from "../../src/store/reducers/menuReducer";
import { getAllCategories } from "../../src/store/reducers/categoryReducer";
import { getAllEvents } from "../../src/store/reducers/eventReducer";
import MenusFilterForm from "../../src/components/Forms/Menu/MenusFilterForm";
import Link from "next/link";
import { HiAdjustments } from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";

const index = () => {
  const dispatch = useDispatch();
  const pageData = { name: "Menu", href: "/menu", current: true };
  const pageTitle = "Saso App | Menu";
  const [filters, setFilters] = useState([]);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    getAllData();
  }, []);

  const filtersQueryBuilder = () => {
    const queries = [];
    if (filters.length > 0) {
      filters.map((f) => {
        const filtersQuery = `${f.name}=${f.id}`;
        queries.push(filtersQuery);
      });
      return `?${queries.join("&")}`;
    }
    return "";
  };

  useEffect(() => {
    dispatch(getAllMenus(filtersQueryBuilder()));
  }, [filters]);

  const getAllData = () => {
    setShowLoading(true);
    Promise.all([
      dispatch(getAllEvents()),
      dispatch(getAllCategories()),
      dispatch(getAllMenus(filtersQueryBuilder())),
    ]).then((responses) => {
      const failed = responses.find((r) => r?.status === "failed");
      if (!failed) {
        setShowTable(true);
        setShowLoading(false);
      } else {
        setShowTable(false);
        setShowLoading(false);
      }
    });
  };

  const handleChangeShowFilter = () => {
    setShowFilterForm(!showFilterForm);
  };

  const handleChange = (e, name) => {
    const value = e.target.value;
    const data = {
      id: value,
      name: name,
    };

    const filterIndex = filters.findIndex((f) => f.name === data.name);
    if (!(filterIndex > -1)) {
      setFilters([...filters, data]);
    } else {
      const tempFilters = [...filters];
      tempFilters[filterIndex].id = data.id;
      setFilters([...tempFilters]);
    }
  };

  const onDelete = async (id) => {
    try {
      const onDelete = await dispatch(deleteMenu(id));
      if (onDelete?.status !== "failed") {
        try {
          setShowLoading(true);
          const getMenus = await dispatch(getAllMenus(filtersQueryBuilder()));
          if (getMenus?.status !== "failed") {
            setShowLoading(false);
          }
        } catch (e) {
          //TODO: handle error here
          console.log(e);
        }
      }
    } catch (e) {
      //TODO: handle error here
      console.log(e);
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
      {showLoading ? (
        <p>Loading...</p>
      ) : showTable ? (
        <MenuTable onDelete={onDelete} />
      ) : (
        ""
      )}
    </LoggedInMain>
  );
};

export default index;
