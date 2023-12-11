import { Button, Card, Input, Space, Typography } from "antd";
import React, { useState } from "react";
import ImagesPreview from "../ImagesPreview/ImagesPreview";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./CartList.module.scss";
import { addNote } from "../../../stores/reducers/cart";
import { useDispatch } from "react-redux";

const CartList = ({ cart, add, remove }) => {
    const dispatch = useDispatch();

    const handleChange = (e, item) => {
        dispatch(addNote({ _id: item.menu._id, note: e.target.value }));
    };

    return (
        <div className={styles.cartList}>
            <Space direction="vertical" style={{ width: "100%" }}>
                {cart.items.map((item, i) => (
                    <Card key={i} size="small" style={{ width: "100%" }}>
                        <div className={styles.cartItem}>
                            <div className={styles.itemDescription}>
                                <ImagesPreview
                                    height={80}
                                    width="auto"
                                    productName={item.menu.name}
                                    productImages={item.menu.images}
                                />
                                <Space direction="vertical">
                                    <Typography.Text
                                        strong
                                        style={{ fontSize: "1.1rem" }}>
                                        {item.menu.name}
                                    </Typography.Text>
                                    <Typography.Text>
                                        {item.menu.price} €
                                    </Typography.Text>
                                </Space>
                            </div>
                            <div className={styles.itemAmount}>
                                <Space.Compact>
                                    <Button
                                        size="large"
                                        shape="circle"
                                        icon={
                                            item.amount <= 1 ? (
                                                <DeleteOutlined />
                                            ) : (
                                                <MinusOutlined />
                                            )
                                        }
                                        onClick={() => remove(item.menu)}
                                    />
                                    <div className={styles.amountText}>
                                        <Typography.Text>
                                            {item.amount}
                                        </Typography.Text>
                                    </div>
                                    <Button
                                        size="large"
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        onClick={() => add(item.menu)}
                                    />
                                </Space.Compact>
                            </div>
                        </div>
                        {item.menu.note ? (
                            <div className={styles.note}>
                                <Typography.Text strong type="danger">
                                    Please add note for this item:
                                </Typography.Text>
                                <Input.TextArea
                                    key={item.menu._id}
                                    placeholder={item.menu.note}
                                    onChange={(e) =>
                                        handleChange(e, item)
                                    }></Input.TextArea>
                            </div>
                        ) : (
                            ""
                        )}
                    </Card>
                ))}
            </Space>
        </div>
    );
};

export default CartList;
