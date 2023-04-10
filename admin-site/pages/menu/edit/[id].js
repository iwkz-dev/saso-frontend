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

const id = () => {
    const dispatch = useDispatch();
    const [showLoading, setShowLoading] = useState(false);
    const router = useRouter();
    const { id } = router.query;
    const [showForm, setShowForm] = useState(false);
    const pageTitle = "Saso App | Menu";

    useEffect(() => {
        setShowLoading(true);
        setShowForm(false);
        if (id) {
            Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllCategories()),
                dispatch(getDetailMenu(id)),
            ]).then((responses) => {
                const failed = responses.find((r) => r?.status === "failed");
                if (failed) {
                    message.error(failed.message);
                } else {
                    setShowForm(true);
                }
                setShowLoading(false);
            });
        }
    }, [id]);

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
