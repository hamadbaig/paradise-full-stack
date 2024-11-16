"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, notification } from "antd";
import styles from "./Methodtime.module.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const AddMethodTime = () => {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/getShippingMethod`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setShippingMethods(data.Method);
        } else {
          throw new Error("Failed to fetch shipping methods");
        }
      })
      .catch((error) => {
        console.error("Error fetching shipping methods:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch shipping methods.",
        });
      });
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/addMethodTime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: "Success",
          description: "Method time added successfully.",
        });
      } else {
        throw new Error(data.error || "Failed to add method time.");
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
      <h2 className={styles.heading}>Add Method Time</h2>
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Select Shipping Method"
          name="ShippingMethod"
          rules={[
            { required: true, message: "Please select a shipping method!" },
          ]}
        >
          <Select placeholder="Select a shipping method">
            {shippingMethods.map((method) => (
              <Select.Option key={method._id} value={method._id}>
                {method.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Time"
          name="Time"
          rules={[{ required: true, message: "Please input the time!" }]}
        >
          <Input placeholder="Enter time (e.g., 14:00 -- 19:00PM)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Time
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddMethodTime;
