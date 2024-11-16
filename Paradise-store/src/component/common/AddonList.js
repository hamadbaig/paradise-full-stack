"use client";
import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Popconfirm } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AddonApi } from "@/reduxToolKit/slice";
const AddonList = () => {
  const AddonList = useSelector((state) => state.AddonApiData);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState(AddonList);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setFilteredData(AddonList);
  }, [AddonList]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = AddonList.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (id) => {
    console.log(id);
    fetch(`${apiUrl}/deleteAddOnById/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {})
      .catch((error) => console.error("Error deleting product:", error));
  };

  useEffect(() => {
    dispatch(AddonApi());
  }, []);

  const handleEdit = (id) => {
    router.push(`/UpdateAddon?id=${id}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record._id)}
          />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Manage Products</h2>
      <Input
        placeholder="Search products"
        value={searchText}
        onChange={handleSearch}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 20, width: "300px" }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey={(record) => record._id}
      />
    </div>
  );
};

export default AddonList;
