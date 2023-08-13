import React from 'react';
import { useAddProductMutation } from '@/api/product';
import { Button,  Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';


const Add = () => {
    const navidate = useNavigate()
    const [add] = useAddProductMutation()
    const [messageApi , contextHolder] = message.useMessage()
    const onFinish = (values: any) => {
        add(values).unwrap().then(() =>{
            messageApi.open({
                type:'success',
                content:"Success",
            })
        }),setTimeout(() =>{
            navidate('/admin')
        })
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      
      type FieldType = {
        name?: string;
        price?: string;
      };
  return (
    <>
         <Form
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
      rules={[{ required: true, message: 'Please input your name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Price"
      name="price"
      rules={[{ required: true, message: 'Please input your price!' }]}
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
  )
}

export default Add