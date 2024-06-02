"use client";

// components
import { Button, Form, Input, Typography } from "antd";
import Link from "next/link";
// icons
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { LogoTypeSvg } from "@/svgs";
// types
import type { FC } from "react";

// variables
const { Title, Text } = Typography;

const RegisterPage: FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <LogoTypeSvg className="ml-8 w-48 fill-blue-600 h-fit mb-4" />
      <div className="p-14 bg-white shadow-2xl rounded-xl bg-[url('/images/jpg/bg.jpg')]">
        <div className="mb-6">
          <Title level={3} className="mb-1">
            Register
          </Title>
          <Text>Here is some subtext</Text>
        </div>

        <Form
          name="normal_register"
          className="register-form"
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
            name="firstName"
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your Last Name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last Name"
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
            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                Register
              </Button>
              <div>
                Or <Link href="/auth/register">Login</Link> If you have an
                account
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
