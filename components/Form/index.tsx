import { Typography, Form, Input, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import classes from "./Form.module.css";

import React, { useState } from "react";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const { Title } = Typography;

const Home = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Values", values);
  };

  return (
    <div className={classes.container}>
      <Title level={4} style={{ margin: "20px 0", color: "gray" }}>
        Company Details
      </Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className={classes["form-container"]}>
          <Form.Item
            label="Company Name"
            name="company-name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            rules={[
              {
                pattern: new RegExp(
                  "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
                ),
                message: "Enter valid Website url",
                required: true,
              },
            ]}
          >
            <Input placeholder="eg: www.google.com" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                pattern: new RegExp(
                  "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
                ),
                message: "Enter valid Email",
                required: true,
              },
            ]}
          >
            <Input placeholder="eg: example@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter Phone" />
          </Form.Item>
        </div>

        <Title level={5} style={{ margin: "15px 0" }}>
          Address 1
        </Title>
        <div className={classes["form-container"]}>
          <Form.Item label="Company Name">
            <Input placeholder="Enter company name" />
          </Form.Item>
          <Form.Item label="Website">
            <Input placeholder="Enter Website" />
          </Form.Item>
          <Form.Item label="Company Name">
            <Input placeholder="Enter company name" />
          </Form.Item>
          <Form.Item label="Website">
            <Input placeholder="Enter Website" />
          </Form.Item>
          <Form.Item label="Website">
            <Input placeholder="Enter Website" />
          </Form.Item>
          <Form.Item label="Company Name">
            <Input placeholder="Enter company name" />
          </Form.Item>
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Home;
