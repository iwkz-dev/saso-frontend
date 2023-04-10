import { useEffect, useState } from "react";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import AddMenuForm from "../../../src/components/Form/Menu/AddMenuForm/AddMenuForm";
import Content from "../../../src/components/Layout/Content/Content";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";
import { useDispatch } from "react-redux";
import { message, Spin, Typography } from "antd";

const index = () => {
    const dispatch = useDispatch();
    const [showLoading, setShowLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const pageTitle = "Saso App | Menu";

    useEffect(() => {
        setShowLoading(true);
        setShowForm(false);
        Promise.all([
            dispatch(getAllEvents()),
            dispatch(getAllCategories()),
        ]).then((responses) => {
            const failed = responses.find((r) => r?.status === "failed");
            if (failed) {
                message.error(failed.message);
            } else {
                setShowForm(true);
            }
            setShowLoading(false);
        });
    }, []);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>Add menu</Typography.Title>
                    {showForm ? <AddMenuForm /> : ""}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default index;
