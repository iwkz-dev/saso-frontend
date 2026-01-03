import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailMenu } from "../../../../src/store/reducers/menuReducer";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import MenuDataDisplay from "../../../../src/components/DataDisplay/MenuDataDisplay/MenuDataDisplay";
import Content from "../../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const MenuViewPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Menu";

    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const menu = useSelector((state) => state.menu.detailMenu);

    useEffect(() => {
        if (!router.isReady || !id) return;

        let cancelled = false;

        const fetchData = async () => {
            setShowLoading(true);
            try {
                const res = await dispatch(getDetailMenu(id));
                if (cancelled) return;

                if (res?.status === "success") {
                    setShowDataDisplay(true);
                } else {
                    message.error(res?.message || "Failed to load menu");
                    isAuth(res);
                    setShowDataDisplay(false);
                }
            } catch (err) {
                if (!cancelled) {
                    message.error(err?.message || "Failed to load menu");
                    setShowDataDisplay(false);
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
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>
                    View Menu &quot;{menu?.name || ""}&quot;
                </Typography.Title>
                <Spin spinning={showLoading} tip="Loading...">
                    {showDataDisplay ? (
                        <MenuDataDisplay menu={menu} />
                    ) : (
                        !showLoading && (
                            <div
                                style={{
                                    padding: "16px",
                                    background: "#fff",
                                    border: "1px dashed #e5e7eb",
                                    borderRadius: 12,
                                    color: "#6b7280",
                                }}>
                                No data to display.
                            </div>
                        )
                    )}
                </Spin>
            </Content>
        </Protected>
    );
};

export default MenuViewPage;
