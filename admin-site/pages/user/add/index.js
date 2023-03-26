import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import AddUserForm from "../../../src/components/Form/User/AddUserForm/AddUserForm";
import { getDetailUser } from "../../../src/store/reducers/userReducer";
import { useSelector } from "react-redux";
import { getUserId } from "../../../src/helpers/authHelper";
import Content from "../../../src/components/Layout/Content/Content";
import { Typography } from "antd";

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
        <LoggedIn
            title={pageTitle}
            pageData={pageData}
            isNotAllowed={currUser?.role !== 1}>
            <Content>
                <Typography.Title level={2}>Add User</Typography.Title>
                <AddUserForm />
            </Content>
        </LoggedIn>
    );
};

export default index;
