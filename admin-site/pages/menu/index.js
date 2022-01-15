import LoggedInMain from "../../src/components/Main/loggedInMain/loggedInMain";
import MenuTable from "../../src/components/Tables/MenuTable";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllCategories,
  getAllEvents,
  getAllMenus,
} from "../../src/store/reducers/productReducer";
import MenusFilterForm from "../../src/components/Forms/FilterForms/MenusFilterForm";

const index = () => {
  const dispatch = useDispatch();
  const pageData = { name: "Menu", href: "/menu", current: true };
  const pageTitle = "Saso App | Menu";
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(getAllMenus());
    dispatch(getAllEvents());
    dispatch(getAllCategories());
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
      <MenusFilterForm handleChange={handleChange} />
      <MenuTable
        selectedEvent={selectedEvent}
        selectedCategory={selectedCategory}
      />
    </LoggedInMain>
  );
};

export default index;
