import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailEvent } from "../../../src/store/reducers/eventReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";
import EventDataDisplay from "../../../src/components/DataDisplay/EventDataDisplay/EventDataDisplay";
import RelatedMenuTable from "../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageData = {
        name: "Event",
        href: `/event/view/${id}`,
        current: true,
    };
    const pageTitle = "Saso App | Event";
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showError, setShowError] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const event = useSelector((state) => state.event.detailEvent);

    useEffect(() => {
        setShowLoading(true);
        if (id) {
            const getData = async () => {
                return await dispatch(getDetailEvent(id));
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
                            View Event &quot;{event.name}&quot;
                        </h1>
                        {showDataDisplay ? (
                            <>
                                <EventDataDisplay event={event} />
                                <div className="mt-4 mb-3">
                                    <h3 className="w-10/12 text-lg leading-7 font-medium text-gray-900 mb-3">
                                        Related Menu
                                    </h3>
                                    <AddItemButton
                                        hrefLink={`/menu/add?event=${event._id}`}
                                        text="Add Menu for this Event"
                                    />
                                </div>
                                <RelatedMenuTable event={event} />
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
