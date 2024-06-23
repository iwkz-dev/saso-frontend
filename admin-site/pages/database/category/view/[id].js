import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailCategory } from "../../../../src/store/reducers/categoryReducer";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import CategoryDataDisplay from "../../../../src/components/DataDisplay/CategoryDataDisplay/CategoryDataDisplay";
import RelatedMenuTable from "../../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../../src/components/Layout/Content/Content";
import { message, Space, Spin, Typography } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Category";
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const category = useSelector((state) => state.category.detailCategory);

    useEffect(() => {
        const fetchData = async () => {
            setShowLoading(true);

            if (id) {
                try {
                    const response = await dispatch(getDetailCategory(id));

                    if (response.status === "success") {
                        setShowDataDisplay(true);
                    } else {
                        message.error(response.message);
                        isAuth(response);
                    }
                } catch (error) {
                    // Handle any error that might occur during the API call
                    message.error(error.message);
                } finally {
                    setShowLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>
                        View Category &quot;{category.name}&quot;
                    </Typography.Title>
                    {showDataDisplay ? (
                        <Space direction="vertical" style={{ display: "flex" }}>
                            <CategoryDataDisplay category={category} />
                            <Typography.Title level={3}>
                                Related Menu
                            </Typography.Title>
                            <AddItemButton
                                hrefLink={`/menu/add?category=${category._id}`}
                                text="Add Menu for this Category"
                            />
                            <RelatedMenuTable
                                filterName="category"
                                itemFilter={category}
                            />
                        </Space>
                    ) : (
                        ""
                    )}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
