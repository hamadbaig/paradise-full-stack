"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Updated import
import { Card, List, Typography } from "antd";
import styles from "./order.module.css";
const { Text } = Typography;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      fetch(`${apiUrl}/getOrderById/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrder(data.order);
          }
        })
        .catch((error) => console.error("Error fetching order:", error));
    }
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className={styles.orderDetailsContainer}>
      <h2 className={styles.orderTitle}>Order Details</h2>

      <Card title="Order Summary" className={styles.summaryCard}>
        <Text className={styles.textField}>Total Price:</Text> AED{" "}
        {order.totalPrice}
      </Card>

      {order.Data.map((data, index) => (
        <Card
          key={index}
          title={`Delivery ${index + 1}`}
          className={styles.deliveryCard}
        >
          <Text className={styles.textField}>Date:</Text> {data.date} <br />
          <Text className={styles.textField}>Time:</Text> {data.time} <br />
          <Text className={styles.textField}>City:</Text> {data.city} <br />
          <Text className={styles.textField}>Delivery Method:</Text>{" "}
          {data.method.name} ({data.method.price}) <br />
          <Card title="Address" className={styles.addressCard}>
            <Text className={styles.textField}>Name:</Text>{" "}
            {data.addresses[0].name} <br />
            <Text className={styles.textField}>Mobile:</Text>{" "}
            {data.addresses[0].mobile} <br />
            <Text className={styles.textField}>Address:</Text>{" "}
            {data.addresses[0].address} <br />
            <Text className={styles.textField}>City:</Text>{" "}
            {data.addresses[0].city} <br />
            <Text className={styles.textField}>Landmark:</Text>{" "}
            {data.addresses[0].landmark} <br />
            <Text className={styles.textField}>Address Type:</Text>{" "}
            {data.addresses[0].addressType} <br />
          </Card>
          {data.cartItems.length > 0 && (
            <Card title="Items" className={styles.itemsCard}>
              <List
                dataSource={data.cartItems}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={`${item.name} - ${item.price}`}
                      description={
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className={styles.itemImage}
                        />
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}
        </Card>
      ))}
    </div>
  );
};

export default OrderDetails;
