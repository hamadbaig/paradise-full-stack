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
import { productApi } from "@/reduxToolKit/slice";
const UpdateAndDeleteProduct = () => {
  const productList = useSelector((state) => state.productApiData);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState(productList);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setFilteredData(productList);
  }, [productList]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = productList.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value) ||
        item.subcategory.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (id) => {
    console.log(id);
    fetch(`${apiUrl}/deleteProductById/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        // Refresh product list or update state after deletion
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  useEffect(() => {
    dispatch(productApi());
  }, []);

  const handleEdit = (id) => {
    router.push(`/UpdateProduct?id=${id}`);
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "SubCategory",
      dataIndex: "SubCategory",
      key: "SubCategory",
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

export default UpdateAndDeleteProduct;
