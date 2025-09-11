import { useEffect, useState } from "react";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import EditMenuForm from "../../../../src/components/Form/Menu/EditMenuForm/EditMenuForm";
import Content from "../../../../src/components/Layout/Content/Content";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getDetailMenu } from "../../../../src/store/reducers/menuReducer";
import { getAllEvents } from "../../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../../src/store/reducers/categoryReducer";
import { getAllVendors } from "../../../../src/store/reducers/vendorReducer";
import { message, Spin, Typography } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const EditMenuPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const pageTitle = "Saso App | Menu";

    useEffect(() => {
        if (!router.isReady || !id) return;

        let cancelled = false;

        const fetchData = async () => {
            setShowLoading(true);
            setShowForm(false);

            try {
                const results = await Promise.all([
                    dispatch(getAllEvents()),
                    dispatch(getAllCategories()),
                    dispatch(getAllVendors()),
                    dispatch(getDetailMenu(id)),
                ]);

                const failed = results.find((r) => r?.status === "failed");
                if (failed) {
                    if (!cancelled) {
                        message.error(failed?.message || "Failed to load data");
                        isAuth(failed);
                        setShowForm(false);
                    }
                    return;
                }

                if (!cancelled) setShowForm(true);
            } catch (err) {
                if (!cancelled) {
                    message.error(err?.message || "Failed to load data");
                    isAuth(err);
                    setShowForm(false);
                }
            } finally {
                if (!cancelled) setShowLoading(false);
            }
        };

        fetchData();
        return () => {
            cancelled = true;
        };
    }, [router.isReady, id, dispatch]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Edit menu</Typography.Title>
                <Spin spinning={showLoading} tip="Loading...">
                    {showForm && <EditMenuForm id={id} />}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default EditMenuPage;
