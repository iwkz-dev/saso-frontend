import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
import { getAllCategories } from "../../../stores/reducers/category";
import ProductCards from "../ProductCards.js/ProductCards";

const ProductsTabs = ({ event, barcode }) => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);

    useEffect(() => {
        const filter = `?event=${event._id}`;
        dispatch(getAllCategories(filter));
    }, [barcode]);

    const items = category.data
    .filter((c) => c.menus.data.length > 0)
    .map((c, i) => ({
        key: i + 1,
        label: c.name,
        children: (
            <ProductCards
                productList={c.menus.data}
                barcode={barcode}
            />
        ),
    }));

    return <Tabs defaultActiveKey="1" items={items} destroyOnHidden={true} />;
};

export default ProductsTabs;
