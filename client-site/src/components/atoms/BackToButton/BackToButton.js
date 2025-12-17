import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";

const BackToButton = ({ buttonText, to }) => {
    const router = useRouter();

    const handleBack = () => {
        if (to) {
            router.push(to);
            return;
        }

        const pathParts = router.asPath.split("/").filter(Boolean);
        pathParts.pop();
        const newPath = "/" + pathParts.join("/");

        router.push(newPath || "/");
    };

    return (
        <Button type="link" onClick={handleBack} icon={<LeftOutlined />}>
            {buttonText}
        </Button>
    );
};

export default BackToButton;
