import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../src/store/reducers/orderReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import { useRouter } from "next/router";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";
import OrderDataDisplay from "../../../src/components/DataDisplay/OrderDataDisplay/OrderDataDisplay";
import RelatedMenuOrder from "../../../src/components/Table/Order/RelatedMenuOrderList/RelatedMenuOrder";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageData = {
        name: "Order",
        href: `/order/view/${id}`,
        current: true,
    };
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showError, setShowError] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const pageTitle = "Saso App | Order";
    const orders = useSelector((state) => state.order.orders);
    const [orderDetail, setOrderDetail] = useState({});

    //TODO view order
    useEffect(() => {
        setShowLoading(true);
        const getOrders = async () => {
            return dispatch(getAllOrders());
        };
        if (orders.length === 0) {
            getOrders().then((r) => {
                if (r.status === "success") {
                    setShowLoading(false);
                } else {
                    setShowLoading(false);
                    setShowError(r.message);
                }
            });
        } else {
            if (id) {
                const order = orders.find((o) => {
                    return o["_id"] === id;
                });
                if (order) {
                    setOrderDetail(order);
                    setShowDataDisplay(true);
                    setShowLoading(false);
                    setShowError("");
                    console.log(orderDetail);
                } else {
                    setShowLoading(false);
                    setShowError(
                        "Unfortunately, your searched order detail is not found",
                    );
                }
            }
        }
    }, [id, orders]);
    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12">
                {showLoading ? (
                    <Loading />
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-left mb-3">
                            View Order
                        </h1>
                        {showDataDisplay ? (
                            <>
                                <OrderDataDisplay order={orderDetail} />
                                <div className="mt-4 mb-3">
                                    <h3 className="w-10/12 text-lg leading-7 font-medium text-gray-900 mb-3">
                                        Ordered Menu
                                    </h3>
                                </div>
                                <RelatedMenuOrder menus={orderDetail.menus} />
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
