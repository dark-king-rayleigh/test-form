import { Button, Divider, Input, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import qs from "qs";
import { useEffect, useState } from "react";
import classes from "./Table.module.css";

const columns = [
  {
    title: "Company Name",
    dataIndex: "companyName",
    sorter: true,
  },
  {
    title: "Website",
    dataIndex: "website",
    width: "20%",
    sorter: true,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    sorter: true,
  },
  {
    title: "Action",
  },
];

const getRandomuserParams = (params: any) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const { Title, Paragraph } = Typography;

const App = () => {
  const [data, setData] = useState([
    {
      companyName: "Clinch Tech",
      website: "www.google.com",
      phone: "1234567890",
    },
    {
      companyName: "Leap Frog",
      website: "www.leapfrog.com",
      phone: "1234567890",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  return (
    <div className={classes["container"]}>
      <Title level={3} style={{ color: "gray", fontWeight: "400" }}>
        Company Curation
      </Title>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 5px",
        }}
      >
        <div>
          <Paragraph>Company Name</Paragraph>
          <div style={{ display: "flex", columnGap: "20px" }}>
            <Input style={{ width: "100%" }} />
            <Button
              size="large"
              style={{
                backgroundColor: "black",
                color: "white",
                height: "auto",
                width: "100%",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              Search
            </Button>
            <Button></Button>
          </div>
        </div>
        <Button
          size="large"
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "10px 20px",
            height: "fit-content",
            borderRadius: "5px",
          }}
          icon={<PlusOutlined />}
        >
          Add new Company
        </Button>
      </div>
      <Table
        columns={columns}
        // rowKey={(record) => record?.login?.uuid}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        // onChange={handleTableChange}
      />
    </div>
  );
};

export default App;
