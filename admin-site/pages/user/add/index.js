import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";
import AddUserForm from "../../../src/components/Form/User/AddUserForm/AddUserForm";
import { getDetailUser } from "../../../src/store/reducers/userReducer";
import { useSelector } from "react-redux";
import { getUserId } from "../../../src/helpers/authHelper";

const index = () => {
    const dispatch = useDispatch();
    const currUser = useSelector((state) => state.user.detailUser);
    const pageData = {
        name: "User",
        href: `/user/add/`,
        current: true,
    };
    const pageTitle = "Saso App | User";

    useEffect(() => {
        const getCurrUser = async () => {
            return await dispatch(getDetailUser(getUserId()));
        };
        getCurrUser();
    }, []);

    return (
        <LoggedInLayout
            title={pageTitle}
            pageData={pageData}
            isNotAllowed={currUser?.role !== 1}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left mb-3">Add User</h1>
                <AddUserForm />
            </div>
        </LoggedInLayout>
    );
};

export default index;
