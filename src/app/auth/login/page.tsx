"use client";

// types
import type { FC } from "react";
// components
import { Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
// icons
import { LockOutlined, UserOutlined } from "@ant-design/icons";

// variables
const { Title, Text } = Typography;

const LoginPage: FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <div className="p-14 shadow-2xl rounded-xl bg-white dark:bg-dark">
        <div className="mb-6">
          <Title level={3} className="mb-1">
            Login
          </Title>
          <Text>Here is some subtext</Text>
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ width: 350 }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex place-content-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link href="/auth/forget-password">Forgot password</Link>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <div>
                Or <Link href="/auth/register">register now!</Link>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
