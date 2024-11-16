"use client";
import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`${apiUrl}/getOrders`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
          setFilteredData(data.orders); // Initialize filtered data
        }
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = orders.filter(
      (item) =>
        item._id.toLowerCase().includes(value) ||
        item.userId.toLowerCase().includes(value) ||
        item.totalPrice.toString().toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };
  const handleEdit = (id) => {
    router.push(`/OrderDetails?id=${id}`);
  };
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => a.userId.localeCompare(b.userId),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `AED ${price}`,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => handleEdit(record._id)}>View Details</Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Order List</h2>
      <Input
        placeholder="Search orders"
        value={searchText}
        onChange={handleSearch}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 20, width: "300px" }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />
    </div>
  );
};

export default OrdersList;
