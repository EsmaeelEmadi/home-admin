"use client";

// hooks
import { useCallback, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

// helpers
import {
  residentialGetById,
  residentialPut,
} from "@/utils/axios/services/residential";

// components
import { Form, Typography, Spin, notification, Alert, Empty } from "@/ant";
import { ResidentialRentForm } from "@/features/forms/ResidentialRent";
import { LoadingOutlined } from "@ant-design/icons";
import PageTransition from "@/components/utility/transitions/PageTransition";

// types
import type { FC } from "react";
import type { IResidential, IResidentialPost } from "@/types/api/residential";
import { AxiosError } from "axios";
import dayjs from "dayjs";

interface IPropertyEdit {
  params: { id: string };
}

// variables
const { Title, Text } = Typography;

const PropertyEdit: FC<IPropertyEdit> = ({ params }) => {
  const [form] = Form.useForm<IResidentialPost>();
  const [api, contextHolder] = notification.useNotification();

  const { isLoading, data, error } = useSWR<IResidential>(
    `residential/rent/${params.id}`,
    residentialGetById,
  );

  const { isMutating, trigger } = useSWRMutation<
    any,
    any,
    string,
    IResidentialPost
  >("residential/rent", residentialPut);

  const values = Form.useWatch([], form);

  useEffect(() => {
    if (data) {
      form.setFieldValue("address", data.address);
      form.setFieldValue("numberOfRoom", data.numberOfRoom);
      form.setFieldValue("rentPrice", data.rentPrice);
      form.setFieldValue("dateOfCreation", dayjs(data.dateOfCreation));
      form.setFieldValue("hasParking", data.hasParking);
      form.setFieldValue("hasBalcony", data.hasBalcony);
    }
  }, [data, form]);

  const notif = useCallback(
    (method: "error" | "success", message: string, description: string) => {
      api[method]({
        message,
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
    trigger({ ...data, ...values })
      .then(() => {
        notif("success", "Success", "New residential has been created");
      })
      .catch((err: unknown) => {
        if (err instanceof AxiosError) {
          notif("error", "Error", err.message);
        } else {
          notif("error", "Error", "Unexpected Error");
        }
      });
  };

  return (
    <>
      {contextHolder}
      <PageTransition>
        <div className="flex flex-col h-full bg-white dark:bg-dark p-8 rounded-3xl">
          {isLoading ? (
            <div className="flex items-center self-center h-full">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
          ) : null}
          {/* TODO: manage error message */}
          {error ? (
            <Alert message="Error" description={error} type="error" showIcon />
          ) : null}
          {data ? (
            <div className="place-self-center">
              <div className="mb-8">
                <Title level={2} className="mb-1">
                  Edit Residential
                </Title>
                <Text>Here is some subtext</Text>
              </div>
              <ResidentialRentForm
                isMutating={isMutating}
                form={form}
                onSubmit={onSubmit}
              />
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </PageTransition>{" "}
    </>
  );
};

export default PropertyEdit;
