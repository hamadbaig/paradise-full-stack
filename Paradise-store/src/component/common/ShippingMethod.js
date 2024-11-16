"use client";
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import styles from "./shippingMethod.module.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const AddShippingMethod = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Form instance to reset fields

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/addShippingMethod`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: "Success",
          description: "Shipping method created successfully.",
        });
        form.resetFields(); // Clear form fields after successful submission
      } else {
        throw new Error(data.error || "Failed to create shipping method.");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Shipping Method</h2>
      <Form
        form={form} // Attach the form instance
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Shipping Method Name"
          name="name"
          rules={[{ required: true, message: "Please input the method name!" }]}
        >
          <Input placeholder="Enter shipping method name" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input placeholder="Enter price (e.g., AED 49)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddShippingMethod;
