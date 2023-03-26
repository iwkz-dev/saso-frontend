import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailMenu } from "../../../src/store/reducers/menuReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import MenuDataDisplay from "../../../src/components/DataDisplay/MenuDataDisplay/MenuDataDisplay";
import Content from "../../../src/components/Layout/Content/Content";
import { Typography } from "antd";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageData = {
        name: "Menu",
        href: `/menu/view/${id}`,
        current: true,
    };
    const pageTitle = "Saso App | Menu";
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showError, setShowError] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const menu = useSelector((state) => state.menu.detailMenu);

    useEffect(() => {
        setShowLoading(true);
        if (id) {
            const getData = async () => {
                return await dispatch(getDetailMenu(id));
            };
            getData().then((r) => {
                if (r.status === "success") {
                    setShowDataDisplay(true);
                    setShowLoading(false);
                } else {
                    setShowLoading(false);
                    setShowError(r.message);
                }
            });
        }
    }, [id]);

    return (
        <LoggedIn title={pageTitle} pageData={pageData}>
            <Content>
                {showLoading ? (
                    <Loading />
                ) : (
                    <>
                        <Typography.Title level={2}>
                            View Menu &quot;{menu.name}&quot;
                        </Typography.Title>
                        {showDataDisplay ? (
                            <>
                                <MenuDataDisplay menu={menu} />
                            </>
                        ) : (
                            ""
                        )}
                        {showError || ""}
                    </>
                )}
            </Content>
        </LoggedIn>
    );
};

export default id;
