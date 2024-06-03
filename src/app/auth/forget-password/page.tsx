"use client";

// types
import type { FC } from "react";
// components
import { Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
// icons
import { MailOutlined } from "@ant-design/icons";

// variables
const { Title, Text } = Typography;

const ForgetPasswordPage: FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <div className="p-14 shadow-2xl rounded-xl bg-white dark:bg-dark">
        <div className="mb-6">
          <Title level={3} className="mb-1">
            Forget Password
          </Title>
          <Text>Here is some subtext</Text>
        </div>

        <Form
          name="normal_forget_password"
          className="login-forget_password"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ width: 350 }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                htmlType="submit"
                className="password-form-button"
              >
                Submit
              </Button>
              <div>
                <Link href="/auth/register">register</Link>
              </div>
              <div>
                <Link href="/auth/login">login</Link>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
