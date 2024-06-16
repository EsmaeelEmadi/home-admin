"use client";

// components
import { Button, Checkbox, Form, Input, Typography, notification } from "antd";
import Link from "next/link";

// hooks
import { useCallback } from "react";
import useSWRMutation from "swr/mutation";

// helpers
import { useRouter } from "next/navigation";
import { login } from "@/utils/axios/services/auth";
import { storeCredentials } from "@/utils/auth";

// icons
import { LockOutlined, UserOutlined } from "@ant-design/icons";

// types
import { AxiosError } from "axios";
import type { FC } from "react";
import type { ILoginRequest } from "@/types/api/auth";

// variables
const { Title, Text } = Typography;

const LoginPage: FC = () => {
  const { push } = useRouter();
  const [form] = Form.useForm<ILoginRequest>();
  const [api, contextHolder] = notification.useNotification();

  const values = Form.useWatch([], form);

  const { isMutating, trigger } = useSWRMutation<
    any,
    any,
    string,
    ILoginRequest
  >("auth/login", login);

  const notif = useCallback(
    (description: string) => {
      api.error({
        message: "Unable to Login",
        description,
        duration: 5,
        closable: true,
        placement: "bottomLeft",
      });
    },
    [api],
  );

  // handlers
  const onSubmit = () => {
    trigger({ username: values.username, password: values.password })
      .then((data) => {
        console.log({ data });
        storeCredentials(data);
        push("/dashboard");
      })
      .catch((error: unknown) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            notif(error.response?.data.error);
          } else {
            notif(error.message);
          }
        } else {
          console.error({ error });
          notif("Unexpected Error");
        }
      });
  };

  return (
    <>
      {contextHolder}
      <div>
        <div className="p-14 shadow-2xl rounded-xl bg-white dark:bg-dark">
          <div className="mb-6">
            <Title level={2} className="mb-1">
              Login
            </Title>
            <Text>Here is some subtext</Text>
          </div>

          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            style={{ width: 350 }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
                {
                  min: 5,
                  message: "username should include at least 5 characters",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                {
                  min: 5,
                  message: "username should include at least 5 characters",
                },
              ]}
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
                  loading={isMutating}
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
    </>
  );
};

export default LoginPage;
