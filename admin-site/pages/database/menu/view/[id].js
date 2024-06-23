import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailMenu } from "../../../../src/store/reducers/menuReducer";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import MenuDataDisplay from "../../../../src/components/DataDisplay/MenuDataDisplay/MenuDataDisplay";
import Content from "../../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Menu";
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const menu = useSelector((state) => state.menu.detailMenu);

    useEffect(() => {
        const fetchData = async () => {
            setShowLoading(true);
            try {
                const response = await dispatch(getDetailMenu(id));
                if (response.status === "success") {
                    setShowDataDisplay(true);
                } else {
                    message.error(response.message);
                    isAuth(response);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error as needed
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
                    <Typography.Title level={3}>
                        View Menu &quot;{menu.name}&quot;
                    </Typography.Title>
                    {showDataDisplay ? <MenuDataDisplay menu={menu} /> : ""}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
