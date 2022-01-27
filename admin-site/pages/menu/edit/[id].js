import { useRouter } from "next/router";
import LoggedInMain from "../../../src/components/Main/loggedInMain/loggedInMain";
import MenuForm from "../../../src/components/Forms/MenuForm";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDetailMenu } from "../../../src/store/reducers/menuReducer";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";

const id = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const pageData = {
    name: "Menu",
    href: `/menu/edit/${id}`,
    current: true,
  };
  const pageTitle = "Saso App | Menu";
  const [showForm, setShowForm] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);
      try {
        await Promise.all([
          dispatch(getAllEvents()),
          dispatch(getAllCategories()),
          dispatch(getDetailMenu(id)),
        ]);
        setShowForm(true);
        setShowLoading(false);
      } catch (e) {
        setShowForm(false);
        setShowLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <LoggedInMain title={pageTitle} pageData={pageData}>
      <h1 className="text-2xl font-bold text-left w-10/12 mb-3">Edit menu</h1>
      {showLoading ? <p>Loading...</p> : ""}
      {showForm ? <MenuForm id={id} /> : ""}
    </LoggedInMain>
  );
};

export default id;
