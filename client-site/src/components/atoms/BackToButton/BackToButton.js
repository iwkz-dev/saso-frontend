import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Router from "next/router";

const BackToButton = ({ targetURL, buttonText }) => {
    return (
        <Button
            type="link"
            onClick={() => Router.push(targetURL)}
            icon={<LeftOutlined />}
        >
            {buttonText}
        </Button>
    );
};

export default BackToButton;
