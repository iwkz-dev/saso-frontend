import { useEffect } from "react";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import AddMenuForm from "../../../src/components/Form/Menu/AddMenuForm/AddMenuForm";
import Content from "../../../src/components/Layout/Content/Content";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";
import { useDispatch } from "react-redux";
import { message, Typography } from "antd";

const index = () => {
    const dispatch = useDispatch();
    const pageData = {
        name: "Menu",
        href: `/menu/add/`,
        current: true,
    };
    const pageTitle = "Saso App | Menu";

    useEffect(() => {
        Promise.all([
            dispatch(getAllEvents()),
            dispatch(getAllCategories()),
        ]).then((responses) => {
            const failed = responses.find((r) => r?.status === "failed");
            if (failed) {
                message.error(failed.message);
            }
        });
    }, []);

    return (
        <LoggedIn title={pageTitle} pageData={pageData}>
            <Content>
                <Typography.Title level={2}>Add menu</Typography.Title>
                <AddMenuForm />
            </Content>
        </LoggedIn>
    );
};

export default index;
