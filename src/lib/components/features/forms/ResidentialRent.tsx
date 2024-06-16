import { forwardRef } from "react";

// components
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Card,
  DatePicker,
} from "antd";
import { FormInstance } from "antd/es/form/Form";
import { TextAreaRef } from "antd/es/input/TextArea";

interface IResidentialFormProps {
  isMutating: boolean;
  form: FormInstance;
  onSubmit: () => void;
}
// : FC<IResidentialFormProps>
export const ResidentialRentForm = forwardRef<
  TextAreaRef,
  IResidentialFormProps
>(({ isMutating, form, onSubmit }, ref) => {
  return (
    <Form
      form={form}
      name="create_new_residential"
      onFinish={onSubmit}
      style={{ width: 500 }}
    >
      <Form.Item
        name="address"
        rules={[{ required: true, message: "Please enter Address!" }]}
      >
        <Input.TextArea placeholder="Address" autoSize ref={ref} />
      </Form.Item>

      <Form.Item
        name="numberOfRoom"
        rules={[{ required: true, message: "Please enter Number of Room!" }]}
      >
        <InputNumber min={0} placeholder="Number of Rooms" className="w-full" />
      </Form.Item>

      <Form.Item
        name="rentPrice"
        rules={[{ required: true, message: "Please enter Rent Price!" }]}
      >
        <InputNumber
          min={0}
          addonAfter="$"
          placeholder="Rent Price"
          className="w-full"
        />
      </Form.Item>

      <Form.Item
        name="dateOfCreation"
        rules={[{ required: true, message: "Please enter Date of Creation!" }]}
      >
        <DatePicker picker="year" />
      </Form.Item>

      <Card className="w-fit">
        <div className="flex flex-row flex-wrap gap-4">
          <Form.Item name="hasBalcony" valuePropName="checked" noStyle>
            <Checkbox>Has Balcony</Checkbox>
          </Form.Item>

          <Form.Item name="hasParking" valuePropName="checked" noStyle>
            <Checkbox>Has Parking</Checkbox>
          </Form.Item>
        </div>
      </Card>

      <Form.Item className="mt-5">
        <Button type="primary" htmlType="submit" loading={isMutating}>
          submit
        </Button>
      </Form.Item>
    </Form>
  );
});
