import LoggedInMain from "../../../src/components/Main/loggedInMain/loggedInMain";
import AddMenuForm from "../../../src/components/Forms/Menu/AddMenuForm";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";
import { useDispatch } from "react-redux";

const id = () => {
  const dispatch = useDispatch();
  const pageData = {
    name: "Menu",
    href: `/menu/add/`,
    current: true,
  };
  const pageTitle = "Saso App | Menu";
  const [showForm, setShowForm] = useState(false);
  const [showError, setShowError] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    if (id) {
      Promise.all([
        dispatch(getAllEvents()),
        dispatch(getAllCategories()),
      ]).then((responses) => {
        const failed = responses.find((r) => r?.status === "failed");
        if (!failed) {
          setShowForm(true);
          setShowLoading(false);
        } else {
          setShowLoading(false);
          setShowError(failed.message);
        }
      });
    }
  }, [id]);

  return (
    <LoggedInMain title={pageTitle} pageData={pageData}>
      <h1 className="text-2xl font-bold text-left w-10/12 mb-3">Add menu</h1>
      {showLoading ? <p>Loading...</p> : ""}
      {showForm ? <AddMenuForm name="imageUrls" /> : ""}
      {showError || ""}
    </LoggedInMain>
  );
};

export default id;
