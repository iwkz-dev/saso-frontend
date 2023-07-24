import React from 'react';
import style from './MyOrderContent.module.scss';
import { Layout, Space, Table, Typography } from 'antd';
import BackToButton from '../../atoms/BackToButton/BackToButton';

const MyOrderContent = () => {
    const { Content } = Layout;
    const columns = [
        {
          title: 'Invoice Nr.',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Status',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Download PDF',
          dataIndex: 'address',
          key: 'address',
          render: () => <a>Download</a>,
        },
        {
          title: 'Created At',
          dataIndex: 'name',
          key: 'name',
        },
      ];
      const data = [
        {
          key: 1,
          name: 'John Brown',
          age: "Paid",
          address: 'New York No. 1 Lake Park',
          description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
        {
          key: 2,
          name: 'Jim Green',
          age: "Paid",
          address: 'London No. 1 Lake Park',
          description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        },
        {
          key: 3,
          name: 'Not Expandable',
          age: "Wait for Confirmation",
          address: 'Jiangsu No. 1 Lake Park',
          description: 'This not expandable',
        },
        {
          key: 4,
          name: 'Joe Black',
          age: "Canceled",
          address: 'Sidney No. 1 Lake Park',
          description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        },
      ];
    return (
        <Content className={style.myOrderContent}>
             <div
                style={{
                    maxWidth: "1024px",
                    padding: "1rem",
                    margin: "1rem auto",
                }}
            >
                <Space
                    size="large"
                    direction="vertical"
                    style={{ width: "100%" }}
                >
                    <BackToButton
                        targetURL="/"
                        buttonText="Back to home"
                    />
                
                    <Typography.Title level={3} style={{ textAlign: "center" }}>
                        My order
                    </Typography.Title>
                    <Table
                        columns={columns}
                        expandable={{
                        expandedRowRender: (record) => (
                            <p
                            style={{
                                margin: 0,
                            }}
                            >
                                {record.description}
                            </p>
                        ),
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                        }}
                        dataSource={data}
                    />
                </Space>
            </div>
        </Content>
    );
};

export default MyOrderContent;