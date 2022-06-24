import { Button, Divider, Input, Table, Typography } from "antd";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import qs from "qs";
import { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./Table.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import { CompanyDetails } from "../../typing";
import { useRouter } from "next/router";

interface DataInterface {
  companyName: string;
  website: string;
  phone: string;
  id: string;
}

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
    dataIndex: "action",
  },
];

const getRandomuserParams = (params: any) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const { Title, Paragraph } = Typography;

const CompanyTable = () => {
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [data, setData] = useState<[] | DataInterface[]>([]);

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const companyData = useSelector((state: any) => {
    return state.company.companyDetails;
  });

  // filtering data got from redux store
  const getData = useCallback((filteringData: CompanyDetails[]) => {
    if (!filteringData) return;
    const data = filteringData.map((company: any) => {
      return {
        companyName: company.companyManager.name,
        website: company.companyManager.website,
        phone: company.companyManager.phone,
        id: company.id,
      };
    });
    setData(data);
  }, []);

  useEffect(() => {
    getData(companyData);
  }, [getData, companyData]);

  const handleSearch = () => {
    if (searchKeyword === "") {
      getData(companyData);
      return;
    }

    const newData = companyData.filter((item: any) => {
      return item.companyManager.name
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    });
    if (!newData) {
      setData([]);
      return;
    }
    getData(newData);
  };

  return (
    <div className={classes["container"]}>
      <Title level={3} style={{ color: "gray", fontWeight: "400" }}>
        Company Curation
      </Title>
      <Divider />
      <div className={classes["container__upper-container"]}>
        <div>
          <Paragraph>Company Name</Paragraph>
          <div
            className={classes["container__upper-container__search-container"]}
          >
            <Input
              style={{ width: "100%", padding: "10px" }}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
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
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button
              onClick={() => setSearchKeyword("")}
              type="text"
              icon={<CloseCircleOutlined />}
            >
              Clear
            </Button>
          </div>
        </div>
        <Link href={"/add"}>
          <Button
            size="large"
            className={classes["btn-add"]}
            icon={<PlusOutlined />}
          >
            Add new Company
          </Button>
        </Link>
      </div>
      <Table
        style={{ cursor: "pointer" }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              router.push(`/${record.id}`);
            },
          };
        }}
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

export default CompanyTable;
