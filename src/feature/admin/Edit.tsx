import {
  useGetIdProductsQuery,
  useUpdateProductsMutation,
} from "@/api/product";
import { Button, Form, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { iProduct } from "@/interface/product";

const Edit = () => {
    const [form] = Form.useForm()
  const { id } = useParams();
  const navidate = useNavigate();
  const [updateProduct] = useUpdateProductsMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: productId } = useGetIdProductsQuery(id || "");

  useEffect(() => {
    form.setFieldsValue(productId);
  });

  const onFinish = (values: any) => {
    updateProduct({...values, id})
      .unwrap()
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Success",
        });
      }),
      setTimeout(() => {
        navidate("/admin");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    name?: string;
    price?: string;
  };
  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Edit;
