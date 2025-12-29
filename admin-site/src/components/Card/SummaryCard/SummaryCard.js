import { Card, Statistic, Tooltip } from "antd";

const SummaryCard = ({ title, value, suffix, valueStyle, tooltip }) => {
    const content = (
        <Statistic
            title={title}
            value={value}
            suffix={suffix}
            valueStyle={{
                fontSize: 18,
                fontWeight: 700,
                ...valueStyle,
            }}
        />
    );

    return (
        <Card
            size="small"
            bordered={false}
            style={{
                minWidth: 160,
                borderRadius: 12,
                background: "#F6F9FF",
                boxShadow: "none",
            }}
            bodyStyle={{
                padding: "12px 14px",
            }}>
            {tooltip ? <Tooltip title={tooltip}>{content}</Tooltip> : content}
        </Card>
    );
};

export default SummaryCard;
