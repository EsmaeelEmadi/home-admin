"use client";

// hooks
import { useCallback } from "react";
import { useSearch } from "@/components/utility/useSearch/UseSearch";
import useSWRMutation from "swr/mutation";

// helpers
import { useRouter } from "next/navigation";
import { createResidentialRentColumns } from "@/utils/tableSchemas/residentialRent";
import {
  residentialDelete,
  residentialGetAll,
} from "@/utils/axios/services/residential";

// components
import { Table, Pagination, notification } from "@/ant";
import PageTransition from "@/components/utility/transitions/PageTransition";

// types
import type { FC } from "react";
import type { IResidential } from "@/types/api/residential";
import type { IResponse } from "@/types/api/general";
import type { TListWithKey } from "@/types/utility";
import { AxiosError } from "axios";

const PropertyPage: FC = () => {
  const { push } = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const { trigger: triggerDelete } = useSWRMutation<any, any, string, number>(
    "residential/rent",
    residentialDelete,
  );

  const { data } = useSearch<IResponse<IResidential>>(
    "residential/rent",
    residentialGetAll,
  );

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

  const handleDelete = (id: number) => {
    triggerDelete(id)
      .then((d) => {
        notif("success", `Residential ${d} has been deleted`);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          notif("error", error.message);
        } else {
          notif("error", "Unexpected Error");
        }
      });
  };

  const handleEdit = (id: number) => {
    push(`/dashboard/property/${id}`);
  };

  return (
    <>
      {contextHolder}
      <PageTransition>
        <div className="h-full bg-white dark:bg-dark p-8 rounded-3xl px-4 flex flex-col">
          <div className="overflow-y-auto px-4 flex-1">
            {/**
             * I do need to add a key for eack item in the list
             * TODO: improve adding keys to list items
             */}
            <Table
              dataSource={
                data?.content
                  ? (data.content as TListWithKey<IResidential>).map((d) => {
                      d.key = d.id;
                      return d;
                    })
                  : []
              }
              columns={createResidentialRentColumns(handleDelete, handleEdit)}
              size="large"
              bordered
              pagination={false}
              scroll={{ scrollToFirstRowOnChange: true }}
            />
          </div>
          <div className="pt-6 flex justify-end">
            {data ? (
              <Pagination
                current={data?.pageable.pageNumber}
                pageSize={data?.pageable.pageSize}
                total={data?.totalElements}
              />
            ) : null}
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default PropertyPage;
