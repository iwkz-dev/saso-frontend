import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMenu, getAllMenus } from "../../src/store/reducers/menuReducer";
import { getAllCategories } from "../../src/store/reducers/categoryReducer";
import { getAllEvents } from "../../src/store/reducers/eventReducer";
import { HiAdjustments } from "react-icons/hi";
import LoggedInLayout from "../../src/components/Layout/loggedInLayout/loggedInLayout";
import MenuTable from "../../src/components/Table/Menu/MenuTable/MenuTable";
import MenusFilterForm from "../../src/components/Form/Menu/MenusFilterForm/MenusFilterForm";
import Loading from "../../src/components/common/Loading/Loading";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";

const index = () => {
    const dispatch = useDispatch();
    const pageData = { name: "Menu", href: "/menu", current: true };
    const pageTitle = "Saso App | Menu";
    const [filters, setFilters] = useState([]);
    const [showFilterForm, setShowFilterForm] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState("");

    useEffect(() => {
        getAllData();
    }, [filters]);

    const filtersQueryBuilder = () => {
        const queries = [];
        console.log(filters);
        if (filters.length > 0) {
            filters.map((f) => {
                const filtersQuery = `${f.name}=${f.id}`;
                queries.push(filtersQuery);
            });
            return `?${queries.join("&")}`;
        }
        return "";
    };

    const getAllData = () => {
        setShowLoading(true);
        setShowError("");
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
                setShowError(failed.message);
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

    const onDelete = async (id, name) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${name}"`,
        );
        if (isConfirm) {
            setShowError("");
            try {
                const onDelete = await dispatch(deleteMenu(id));
                if (onDelete.status !== "failed") {
                    try {
                        setShowLoading(true);
                        const getMenus = await dispatch(
                            getAllMenus(filtersQueryBuilder()),
                        );
                        if (getMenus.status !== "failed") {
                            setShowLoading(false);
                        } else {
                            setShowError(getMenus.message);
                        }
                    } catch (e) {
                        //TODO: handle error here
                        setShowError(e);
                    }
                } else {
                    setShowError(onDelete.message);
                }
            } catch (e) {
                //TODO: handle error here
                setShowError(e);
            }
        }
    };

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left mb-3">Menu</h1>
                <div className="flex justify-between items-center mb-3">
                    <AddItemButton hrefLink="./menu/add" text="Add Menu" />
                    <div
                        className="flex items-center cursor-pointer mr-5"
                        onClick={() => handleChangeShowFilter()}>
                        <HiAdjustments className="pr-1" size={20} />
                        <span>
                            {showFilterForm ? "Hide Filter" : "Show Filter"}
                        </span>
                    </div>
                </div>
                <MenusFilterForm
                    handleChange={handleChange}
                    showFilterForm={showFilterForm}
                    handleChangeShowFilter={handleChangeShowFilter}
                />
                {showError || ""}
                {showLoading ? (
                    <Loading />
                ) : showTable ? (
                    <MenuTable onDelete={onDelete} />
                ) : (
                    ""
                )}
            </div>
        </LoggedInLayout>
    );
};

export default index;
