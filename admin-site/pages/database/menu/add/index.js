import { useEffect, useState } from "react";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import AddMenuForm from "../../../../src/components/Form/Menu/AddMenuForm/AddMenuForm";
import Content from "../../../../src/components/Layout/Content/Content";
import { getAllEvents } from "../../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../../src/store/reducers/categoryReducer";
import { useDispatch } from "react-redux";
import { message, Spin, Typography } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const index = () => {
    const dispatch = useDispatch();
    const [showLoading, setShowLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const pageTitle = "Saso App | Menu";

    useEffect(() => {
        const fetchData = async () => {
            setShowLoading(true);

            try {
                const [eventsResponse, categoriesResponse] = await Promise.all([
                    dispatch(getAllEvents()),
                    dispatch(getAllCategories()),
                ]);

                const failedResponse = [
                    eventsResponse,
                    categoriesResponse,
                ].find((response) => response?.status === "failed");

                if (failedResponse) {
                    message.error(failedResponse.message);
                    isAuth(failedResponse);
                } else {
                    setShowForm(true);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                message.error(error.message);
            } finally {
                setShowLoading(false);
            }
        };

        fetchData();
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
