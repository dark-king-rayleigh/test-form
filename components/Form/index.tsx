import React from "react";
import { Typography, Form, Input, Button, Select, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import classes from "./Form.module.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Address, CompanyDetails } from "../../typing";
import { useDispatch } from "react-redux";
import { companyActions } from "../../store/company/company-slice";
import { useRouter } from "next/router";
import Link from "next/link";

const { Title } = Typography;

// Interface Starts
interface FormInterface {
  companyName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  website: string;
  email: string;
  officeBranch: string;
  address: [] | Address[];
  phone: string;
  addressCode: string;
}

// Interface Ends

// Main Component starts

const FormData = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  //   Submitting the form
  const handleSubmit = (values: FormInterface) => {
    if (!values.address) {
      values.address = [];
    }

    setLoading(true);

    const mainAddress = {
      address1: values.address1,
      address2: values.address2,
      city: values.city,
      state: values.state,
      country: values.country,
      officeBranch: values.officeBranch,
      addressCode: values.addressCode,
    };
    const data = {
      id: new Date().getTime(),
      companyManager: {
        name: values.companyName,
        website: values.website,
        email: values.email,
        phone: values.phone,
      },
      companyAddress: [mainAddress, ...values.address],
    };

    try {
      dispatch(companyActions.addCompanyDetails(data));
      notification.info({
        message: `Success`,
        description: "Successfully added data",
        placement: "bottomRight",
        style: { borderLeft: "10px solid #4ee44e" },
      });
      setTimeout(() => {
        form.resetFields();
        setLoading(false);
        router.push("/");
      }, 2000);
    } catch (e) {
      notification.error({
        message: `Error`,
        description: "Error in adding data",
        placement: "bottomRight",
        style: { borderLeft: "10px solid red" },
      });
    }
  };

  return (
    <div className={classes.container}>
      <Title level={4} style={{ margin: "20px 0", color: "gray" }}>
        Company Details
      </Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className={classes["form-container"]}>
          <Form.Item
            label="Company Name"
            name="companyName"
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
          <Form.Item
            label="Office Branch"
            name="officeBranch"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Eg: HQ, Branch" />
          </Form.Item>

          <Form.Item label="Country" name="country">
            <Select defaultValue="USA">
              <Select.Option value="USA">USA</Select.Option>
              <Select.Option value="Nepal">Nepal</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Address 1"
            name="address1"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input placeholder="Address 1" />
          </Form.Item>
          <Form.Item label="Address 2" name="address2">
            <Input placeholder="Enter Website" />
          </Form.Item>
          <Form.Item label="Zip/Postal Code" name="addressCode">
            <Input placeholder="Enter Zip/Postal Code" />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input placeholder="Enter City" />
          </Form.Item>
          <Form.Item label="State" name="state">
            <Input placeholder="Enter State" />
          </Form.Item>
        </div>

        <Form.List name="address">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <Title level={5} style={{ margin: "15px 0" }}>
                    Address {key + 2}
                  </Title>

                  <MinusCircleOutlined onClick={() => remove(name)} />

                  <div className={classes["form-container"]}>
                    <Form.Item
                      label="Office Branch"
                      name={[name, "officeBranch"]}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input placeholder="Eg: HQ, Branch" />
                    </Form.Item>

                    <Form.Item label="Country" name={[name, "country"]}>
                      <Select defaultValue="USA">
                        <Select.Option value="USA">USA</Select.Option>
                        <Select.Option value="Nepal">Nepal</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Address 1"
                      name={[name, "address1"]}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input placeholder="Address 1" />
                    </Form.Item>
                    <Form.Item label="Address 2" name={[name, "address2"]}>
                      <Input placeholder="Enter Website" />
                    </Form.Item>
                    <Form.Item
                      label="Zip/Postal Code"
                      name={[name, "addressCode"]}
                    >
                      <Input placeholder="Enter Zip/Postal Code" />
                    </Form.Item>
                    <Form.Item label="City" name={[name, "city"]}>
                      <Input placeholder="Enter City" />
                    </Form.Item>
                    <Form.Item label="State" name={[name, "state"]}>
                      <Input placeholder="Enter State" />
                    </Form.Item>
                  </div>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <div className={classes["button-container"]}>
          <Form.Item>
            <Button
              type="primary"
              style={{ backgroundColor: "black" }}
              htmlType="submit"
              disabled={loading}
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Link href={"/"}>
              <Button type="ghost">Cancel</Button>
            </Link>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default FormData;
