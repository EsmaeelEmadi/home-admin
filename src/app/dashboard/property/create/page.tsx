"use client";

// hooks
import useSWRMutation from "swr/mutation";
import { useCallback, useRef } from "react";

// helpers
import { residentialPost } from "@/utils/axios/services/residential";

// components
import { Form, Typography, notification } from "antd";
import { ResidentialRentForm } from "@/features/forms/ResidentialRent";
import PageTransition from "@/components/utility/transitions/PageTransition";

// types
import type { FC } from "react";
import type { IResidentialPost } from "@/types/api/residential";
import { AxiosError } from "axios";
import { TextAreaRef } from "antd/es/input/TextArea";

// variables
const { Title, Text } = Typography;

const PropertyPage: FC = () => {
  const addressInputRef = useRef<TextAreaRef>(null);
  const [form] = Form.useForm<IResidentialPost>();
  const [api, contextHolder] = notification.useNotification();

  const { isMutating, trigger } = useSWRMutation<
    any,
    any,
    string,
    IResidentialPost
  >("residential/rent", residentialPost);

  const values = Form.useWatch([], form);

  const notif = useCallback(
    (method: "error" | "success", description: string) => {
      api[method]({
        message: "Unable to create new residential",
        description,
        duration: 5,
        closable: true,
        placement: "bottomLeft",
      });
    },
    [api],
  );

  // handler
  const onSubmit = () => {
    trigger(values)
      .then(() => {
        notif("success", "New residential has been created");
        form.resetFields();
        setTimeout(() => {
          if (addressInputRef.current) {
            addressInputRef.current.focus();
          } else {
            throw new Error("Unable to find address input field ref");
          }
        }, 0);
      })
      .catch((error: unknown) => {
        if (error instanceof AxiosError) {
          notif("error", error.message);
        } else {
          notif("error", "Unexpected Error");
        }
      });
  };

  return (
    <>
      {contextHolder}
      <PageTransition className="flex-1">
        <div className="flex flex-col h-full bg-white dark:bg-dark p-8 rounded-3xl">
          <div className="place-self-center">
            <div className="mb-8">
              <Title level={2} className="mb-1">
                Create New Residential
              </Title>
              <Text>Here is some subtext</Text>
            </div>
            <ResidentialRentForm
              ref={addressInputRef}
              isMutating={isMutating}
              form={form}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default PropertyPage;
