import { useEffect, useState } from "react";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import EditMenuForm from "../../../src/components/Form/Menu/EditMenuForm/EditMenuForm";
import Content from "../../../src/components/Layout/Content/Content";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getDetailMenu } from "../../../src/store/reducers/menuReducer";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";
import { message, Spin, Typography } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";

const id = () => {
    const dispatch = useDispatch();
    const [showLoading, setShowLoading] = useState(false);
    const router = useRouter();
    const { id } = router.query;
    const [showForm, setShowForm] = useState(false);
    const pageTitle = "Saso App | Menu";

    useEffect(() => {
        const fetchData = async () => {
            setShowLoading(true);
            setShowForm(false);

            try {
                await Promise.all([
                    dispatch(getAllEvents()),
                    dispatch(getAllCategories()),
                    dispatch(getDetailMenu(id)),
                ]);

                setShowForm(true);
            } catch (error) {
                message.error(error.message);
                isAuth(error);
            } finally {
                setShowLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, dispatch]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>Edit menu</Typography.Title>
                    {showForm && <EditMenuForm id={id} />}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
