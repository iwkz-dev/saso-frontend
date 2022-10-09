import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helpers/dateHelper";

const DashboardCard = () => {
    const events = useSelector((state) => state.event.events);
    const orders = useSelector((state) => state.order.orders);

    const getAllInfo = (event) => {
        const eventOrders = orders.filter((order) => order.event === event._id);
        const deliveredOrders = eventOrders?.filter(
            (eventOrder) => eventOrder.status === 3,
        );
        const canceledOrders = eventOrders?.filter(
            (eventOrder) => eventOrder.status === 2,
        );
        let sum = 0;
        deliveredOrders?.map((deliveredOrder) => {
            sum += deliveredOrder.totalPrice;
        });
        const info = {
            totalOrders: eventOrders.length,
            totalCanceledOrders: canceledOrders.length,
            deliveredOrdersNumber: deliveredOrders.length,
            sumTotalPrice: sum,
        };
        return info;
    };

    const eventCardComponent = events.map((event, i) => {
        if (event.status === 2 || event.status === 1) {
            return (
                <div
                    key={i}
                    className="flex  rounded-lg shadow-lg bg-white max-w-sm text-center">
                    <div className="block">
                        <div className="py-3 px-6 border-b border-gray-300">
                            <h5 className="text-gray-900 text-xl font-medium">
                                {event.name}
                            </h5>
                        </div>
                        <div className="p-6">
                            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left mb-3">
                                <h3 className="text-sm leading-6 font-medium text-gray-400">
                                    Total Orders
                                </h3>
                                <p className="text-3xl font-bold text-black">
                                    {getAllInfo(event).totalOrders}
                                </p>
                            </div>
                            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left mb-3">
                                <h3 className="text-sm leading-6 font-medium text-gray-400 ">
                                    Total Canceled Orders
                                </h3>
                                <p className="text-3xl font-bold text text-red-700">
                                    {getAllInfo(event).totalCanceledOrders}
                                </p>
                            </div>
                            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left mb-3">
                                <h3 className="text-sm leading-6 font-medium text-gray-400">
                                    Total Delivered Orders
                                </h3>
                                <p className="text-3xl font-bold text-green-700">
                                    {getAllInfo(event).deliveredOrdersNumber}
                                </p>
                            </div>
                            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left mb-3">
                                <h3 className="text-sm leading-6 font-medium text-gray-400">
                                    Total Price in Euro (€)
                                </h3>
                                <p className="text-3xl font-bold text-blue-900">
                                    {getAllInfo(event).sumTotalPrice}
                                </p>
                            </div>
                        </div>
                        <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                            {formatDate(event.started_at, false, true)}
                        </div>
                    </div>
                </div>
            );
        } else {
            return "";
        }
    });

    return (
        <div className="flex flex-auto flex-row flex-wrap gap-4 justify-start">
            {eventCardComponent}
        </div>
    );
};

export default DashboardCard;
