import dayjs from "dayjs";
import { Button, Space, Tag } from "@/ant";
import { IResidential } from "@/types/api/residential";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const createResidentialRentColumns = (
  handleDelete: (id: number) => void,
  handleEdit: (id: number) => void,
) => {
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Properties",
      dataIndex: "rentPrice",
      key: "rentPrice",
      render: (_: unknown, props: IResidential) => {
        const defaultValues = [];

        if (props.hasBalcony)
          defaultValues.push({ label: "Balcony", color: "cyan" });
        if (props.hasParking)
          defaultValues.push({ label: "Parking", color: "blue" });

        return defaultValues.map((v) => {
          return (
            <Tag color={v.color} key={`${Math.random()}`}>
              {v.label}
            </Tag>
          );
        });
      },
    },
    {
      title: "NOR",
      dataIndex: "numberOfRoom",
      key: "numberOfRoom",
    },
    {
      title: "Rent Price",
      dataIndex: "rentPrice",
      key: "rentPrice",
    },
    {
      title: "Date of Creation",
      dataIndex: "dateOfCreation",
      key: "dateOfCreation",
      render: (arg: number) => {
        return dayjs(arg).year();
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IResidential) => (
        <Space size="small">
          <Button
            icon={<DeleteOutlined />}
            danger
            type="link"
            onClick={() => handleDelete(record.id)}
          />
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => handleEdit(record.id)}
          />
        </Space>
      ),
    },
  ];
};
