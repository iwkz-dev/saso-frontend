import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDetailCategory } from "../../../../store/reducers/categoryReducer";
import { Form, Input, Button, Space, message } from "antd";
import Router from "next/router";

const EditCategoryForm = () => {
    const dispatch = useDispatch();
    const form = useRef();
    const category = useSelector((state) => state.category.detailCategory);
    const [showUploading, setShowUploading] = useState(false);

    const submitForm = (values) => {
        const text = confirm("Please confirm to add category");
        if (text) {
            setShowUploading(true);
            const editData = async () => {
                console.log(category._id, values);
                return dispatch(editDetailCategory(category._id, values));
            };
            editData()
                .then((r) => {
                    if (r?.status === "failed") {
                        setShowUploading(false);
                        message.error(r.message);
                    } else {
                        setShowUploading(false);
                        message.success(r.message);
                        Router.push("/category");
                    }
                })
                .catch((e) => {
                    setShowUploading(false);
                    message.error(e.message);
                });
        }
    };

    const onReset = () => {
        form.current?.resetFields();
    };

    return (
        <div>
            <Form
                ref={form}
                layout="vertical"
                name="category"
                onFinish={submitForm}>
                <Form.Item label="Name" name="name">
                    <Input placeholder="Name" defaultValue={category.name} />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={showUploading}>
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditCategoryForm;
