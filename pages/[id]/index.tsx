import { Typography } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CompanyDetails } from "../../typing";
import classes from "./styles.module.css";

const DUMMY_DATA: CompanyDetails = {
  id: "abc",
  companyManager: {
    name: "Leapfrog",
    email: "leapfrog@gmail.com",
    phone: "9856023456",
    website: "www.leapfrog.com",
  },
  companyAddress: [
    {
      address1: "Kathmandu",
      address2: "",
      city: "Pokhara",
      state: "Gandaki",
      country: "Nepal",
      officeBranch: "Headquarter",
      addressCode: "33700",
    },
    {
      address1: "USA",
      address2: "MH",
      city: "California",
      state: "Unknown",
      country: "USA",
      officeBranch: "Headquarter",
      addressCode: "3700",
    },
  ],
};

const { Title, Paragraph } = Typography;

const CompanyData = () => {
  const router = useRouter();
  const [singleCompanyData, setSingleCompanyData] =
    useState<CompanyDetails>(DUMMY_DATA);

  const companyData = useSelector((state: any) => {
    return state.company.companyDetails;
  });

  useEffect(() => {
    if (!router.query.id) return;
    if (!companyData) return;

    const filteredData = companyData.find((company: CompanyDetails) => {
      return +company.id === +router.query.id!;
    });

    setSingleCompanyData(filteredData);
  }, [router.query.id, companyData]);

  return (
    <>
      <main
        style={{
          backgroundColor: "#fafafa",
          minHeight: "99vh",
          paddingTop: "2rem",
          height: "fit-content",
        }}
      >
        <div className={classes.container}>
          <Title level={3}>Company Details</Title>
          <div className={classes.displayContainer}>
            <div>
              <Title level={5} type="secondary">
                Company Name:
              </Title>
              <Paragraph type="secondary">
                {singleCompanyData?.companyManager?.name}
              </Paragraph>
            </div>
            <div>
              <Title level={5} type="secondary">
                Website:
              </Title>
              <Paragraph type="secondary">
                {singleCompanyData.companyManager.website}
              </Paragraph>
            </div>
            <div>
              <Title level={5} type="secondary">
                Email:
              </Title>
              <Paragraph type="secondary">
                {singleCompanyData.companyManager.email}
              </Paragraph>
            </div>
            <div>
              <Title level={5} type="secondary">
                Phone:
              </Title>
              <Paragraph type="secondary">
                {singleCompanyData.companyManager.phone}
              </Paragraph>
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
            {singleCompanyData?.companyAddress?.map((address, i) => {
              return (
                <div key={i} style={{ margin: "1rem 0" }}>
                  <Title level={5}>Address {i + 1}</Title>
                  <div className={classes.displayContainer}>
                    <div>
                      <Title level={5} type="secondary">
                        Office Type:
                      </Title>
                      <Paragraph type="secondary">
                        {address?.officeBranch || "-"}
                      </Paragraph>
                    </div>
                    <div>
                      <Title level={5} type="secondary">
                        Country:
                      </Title>
                      <Paragraph type="secondary">
                        {address?.country || "-"}
                      </Paragraph>
                    </div>
                    <div>
                      <Title level={5} type="secondary">
                        Address 1:
                      </Title>
                      <Paragraph type="secondary">
                        {address?.address1 || "-"}
                      </Paragraph>
                    </div>
                    <div>
                      <Title level={5} type="secondary">
                        Address 2:
                      </Title>
                      <Paragraph type="secondary">
                        {address?.address2 || "-"}
                      </Paragraph>
                    </div>
                    <div>
                      <Title level={5} type="secondary">
                        Zip/Postal Code:
                      </Title>
                      <Paragraph type="secondary">
                        {address?.addressCode || "-"}
                      </Paragraph>
                    </div>
                    <div>
                      <Title level={5} type="secondary">
                        City:
                      </Title>
                      <Paragraph type="secondary">
                        {address?.city || "-"}
                      </Paragraph>
                    </div>
                    <div>
                      <Title level={5} type="secondary">
                        State:
                      </Title>
                      <Paragraph type="secondary">
                        {address?.state || "-"}
                      </Paragraph>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Title level={3}></Title>
    </>
  );
};

export default CompanyData;
