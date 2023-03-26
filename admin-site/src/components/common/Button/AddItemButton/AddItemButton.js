import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Button } from "antd";

const AddItemButton = ({ hrefLink, text }) => {
    return (
        <Link href={hrefLink}>
            <Button type="primary" icon={<PlusCircleOutlined />}>
                {text}
            </Button>
        </Link>
    );
};

export default AddItemButton;
