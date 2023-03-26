import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailCategory } from "../../../src/store/reducers/categoryReducer";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import CategoryDataDisplay from "../../../src/components/DataDisplay/CategoryDataDisplay/CategoryDataDisplay";
import RelatedMenuTable from "../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../src/components/Layout/Content/Content";
import { message, Spin } from "antd";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Category";
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const category = useSelector((state) => state.category.detailCategory);

    useEffect(() => {
        setShowLoading(true);
        if (id) {
            const getData = async () => {
                return await dispatch(getDetailCategory(id));
            };
            getData().then((r) => {
                if (r.status === "success") {
                    setShowDataDisplay(true);
                    setShowLoading(false);
                } else {
                    setShowLoading(false);
                    message.error(r.message);
                }
            });
        }
    }, [id]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <h1 className="text-2xl font-bold text-left mb-3">
                        View Category &quot;{category.name}&quot;
                    </h1>
                    {showDataDisplay ? (
                        <>
                            <CategoryDataDisplay category={category} />
                            <div className="mt-4 mb-3">
                                <h3 className="w-10/12 text-lg leading-7 font-medium text-gray-900 mb-3">
                                    Related Menu
                                </h3>
                                <AddItemButton
                                    hrefLink={`/menu/add?category=${category._id}`}
                                    text="Add Menu for this Category"
                                />
                            </div>
                            <RelatedMenuTable
                                filterName="category"
                                itemFilter={category}
                            />
                        </>
                    ) : (
                        ""
                    )}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
