import { useEffect, useState } from "react";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import AddMenuForm from "../../../../src/components/Form/Menu/AddMenuForm/AddMenuForm";
import Content from "../../../../src/components/Layout/Content/Content";
import { getAllEvents } from "../../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../../src/store/reducers/categoryReducer";
import { getAllVendors } from "../../../../src/store/reducers/vendorReducer";
import { useDispatch } from "react-redux";
import { message, Spin, Typography } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const AddMenuPage = () => {
    const dispatch = useDispatch();
    const [showLoading, setShowLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const pageTitle = "Saso App | Menu";

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            setShowLoading(true);
            setShowForm(false);

            try {
                const results = await Promise.all([
                    dispatch(getAllEvents()),
                    dispatch(getAllCategories()),
                    dispatch(getAllVendors()),
                ]);

                const failed = results.find((r) => r?.status === "failed");
                if (failed) {
                    if (!cancelled) {
                        message.error(
                            failed?.message || "Failed to load prerequisites",
                        );
                        isAuth(failed);
                    }
                    return;
                }

                if (!cancelled) setShowForm(true);
            } catch (err) {
                if (!cancelled) {
                    message.error(
                        err?.message || "Failed to load prerequisites",
                    );
                    isAuth(err);
                }
            } finally {
                if (!cancelled) setShowLoading(false);
            }
        };

        fetchData();
        return () => {
            cancelled = true;
        };
    }, [dispatch]);

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Add menu</Typography.Title>
                <Spin spinning={showLoading} tip="Loading...">
                    {showForm ? (
                        <AddMenuForm />
                    ) : (
                        !showLoading && (
                            <div
                                style={{
                                    padding: 16,
                                    background: "#fff",
                                    border: "1px dashed #e5e7eb",
                                    borderRadius: 12,
                                    color: "#6b7280",
                                }}>
                                Unable to display the form. Please try again.
                            </div>
                        )
                    )}
                </Spin>
            </Content>
        </Protected>
    );
};

export default AddMenuPage;
