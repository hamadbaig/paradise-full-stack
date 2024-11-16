"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const apiUrl = "http://localhost:8000";

const ManageShippingMethods = () => {
  const [shippingMethods, setShippingMethods] = useState([]);

  // Fetch all shipping methods
  useEffect(() => {
    fetch(`${apiUrl}/getShippingMethod`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setShippingMethods(data.Method);
        }
      })
      .catch((error) =>
        console.error("Error fetching shipping methods:", error)
      );
  }, []);

  // Delete a shipping method by ID
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/deleteShippingMethod/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: "Success",
          description: "Shipping method deleted successfully.",
        });
        setShippingMethods((prev) =>
          prev.filter((method) => method._id !== id)
        );
      } else {
        throw new Error(data.message || "Failed to delete shipping method.");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "Something went wrong.",
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `AED ${price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this shipping method?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <h2>Manage Shipping Methods</h2>
      <Table
        columns={columns}
        dataSource={shippingMethods}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />
    </div>
  );
};

export default ManageShippingMethods;
