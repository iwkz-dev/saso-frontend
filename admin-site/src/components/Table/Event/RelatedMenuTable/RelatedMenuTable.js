import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useRouter } from "next/router";

import Table from "../../Table";
import { getAllCategories } from "../../../../store/reducers/categoryReducer";
import { getAllMenus } from "../../../../store/reducers/menuReducer";
import { getAllVendors } from "../../../../store/reducers/vendorReducer";
import filtersQueryBuilder from "../../../../helpers/filterQueryBuilders";

const DEBOUNCE_MS = 500;

const RelatedMenuTable = ({ onDelete, filterValues = [] }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const isFirstRender = useRef(true);

    const menus = useSelector((s) => s.menu.menus) || [];
    const categories = useSelector((s) => s.category.categories) || [];
    const detailEvent = useSelector((s) => s.event.detailEvent);
    const vendors = useSelector((s) => s.vendor.vendors) || [];

    const [loading, setLoading] = useState(true);

    const filtersQuery = useMemo(() => {
        if (!detailEvent?._id) return "";

        const baseFilters = Array.isArray(filterValues)
            ? [...filterValues]
            : [];

        if (!baseFilters.some((f) => f.name === "event")) {
            baseFilters.push({ id: detailEvent._id, name: "event" });
        }

        return `?${filtersQueryBuilder(baseFilters)}`;
    }, [filterValues, detailEvent?._id]);

    useEffect(() => {
        if (!id) return;
        Promise.all([
            dispatch(getAllCategories()),
            dispatch(getAllVendors()),
        ]).catch(() => message.error("Failed to load table metadata"));
    }, [dispatch, id]);

    useEffect(() => {
        if (!id || !filtersQuery) return;

        const fetchMenus = async () => {
            setLoading(true);
            try {
                await dispatch(getAllMenus(filtersQuery));
            } catch (err) {
                message.error(err?.message || "Failed to load menus");
            } finally {
                setLoading(false);
            }
        };

        // Don't debounce the very first load so the user doesn't see a blank screen
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetchMenus();
            return;
        }

        const handler = setTimeout(fetchMenus, DEBOUNCE_MS);
        return () => clearTimeout(handler);
    }, [dispatch, id, filtersQuery]);

    const tableHead = useMemo(
        () => [
            { key: "name", dataIndex: "name", title: "Name" },
            { key: "event", dataIndex: "event", title: "Event" },
            {
                key: "description",
                dataIndex: "description",
                title: "Description",
            },
            {
                key: "category",
                dataIndex: "category",
                title: "Category",
                filterMode: "menu",
                filterSearch: true,
                filters: categories.map((c) => ({
                    text: c.name,
                    value: c._id,
                })),
                onFilter: (value, record) => {
                    const v = record.category;
                    return Array.isArray(v)
                        ? v.includes(value)
                        : String(v) === String(value);
                },
            },
            { key: "price", dataIndex: "price", title: "Price (€)" },
            { key: "quantity", dataIndex: "quantity", title: "Quantity" },
            {
                key: "quantityOrder",
                dataIndex: "quantityOrder",
                title: "Ordered Quantity",
            },
            { key: "vendor", dataIndex: "vendor", title: "Vendor" },
            { key: "created_at", dataIndex: "created_at", title: "Created At" },
            { key: "updated_at", dataIndex: "updated_at", title: "Updated At" },
        ],
        [categories],
    );

    return (
        <Table
            onDelete={onDelete}
            data={menus}
            events={[detailEvent]}
            vendors={vendors}
            categories={categories}
            dataHead={tableHead}
            emptyMessage="Menu is empty"
            linkToEdit="/database/menu/edit/"
            linkToView="/database/menu/view/"
            isLoading={loading}
        />
    );
};

export default RelatedMenuTable;
