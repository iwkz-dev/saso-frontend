import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailMenu } from "../../../src/store/reducers/menuReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";
import MenuDataDisplay from "../../../src/components/DataDisplay/MenuDataDisplay/MenuDataDisplay";

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
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                {showLoading ? (
                    <Loading />
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-left mb-3">
                            View Menu &quot;{menu.name}&quot;
                        </h1>
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
            </div>
        </LoggedInLayout>
    );
};

export default id;
