"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Select, notification } from "antd";
import styles from "./methodTime.module.css";

const { Option } = Select;

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const DeleteMethodTime = () => {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [methodTimes, setMethodTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingTimes, setFetchingTimes] = useState(false);

  // Fetch all shipping methods on load
  useEffect(() => {
    fetch(`${apiUrl}/getShippingMethod`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setShippingMethods(data.Method);
        } else {
          throw new Error("Failed to fetch shipping methods.");
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

  // Fetch method times for the selected shipping method
  const handleFetchMethodTimes = async (methodId) => {
    setFetchingTimes(true);
    try {
      const response = await fetch(`${apiUrl}/getMethodTime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ShippingMethod: [methodId] }),
      });

      const data = await response.json();

      if (response.ok) {
        setMethodTimes(data.time);
      } else {
        throw new Error(data.error || "Failed to fetch method times.");
      }
    } catch (error) {
      console.error("Error fetching method times:", error);
      notification.error({
        message: "Error",
        description: error.message || "Failed to fetch method times.",
      });
    } finally {
      setFetchingTimes(false);
    }
  };

  // Handle deletion of a method time
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/deleteMethodTime/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: "Success",
          description: "Method time deleted successfully.",
        });
        setMethodTimes((prev) => prev.filter((item) => item._id !== id));
      } else {
        throw new Error(data.error || "Failed to delete method time.");
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

  const columns = [
    {
      title: "Time",
      dataIndex: "Time",
      key: "Time",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          danger
          onClick={() => handleDelete(record._id)}
          loading={loading}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Method Times</h2>

      <div className={styles.selectContainer}>
        <Select
          placeholder="Select Shipping Method"
          onChange={(value) => {
            setSelectedMethod(value);
            handleFetchMethodTimes(value);
          }}
          style={{ width: "100%" }}
          loading={!shippingMethods.length}
        >
          {shippingMethods.map((method) => (
            <Option key={method._id} value={method._id}>
              {method.name}
            </Option>
          ))}
        </Select>
      </div>

      {selectedMethod && (
        <Table
          columns={columns}
          dataSource={methodTimes}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          loading={fetchingTimes}
        />
      )}
    </div>
  );
};

export default DeleteMethodTime;
