"use client";
import { useState } from "react";
import styles from "./Admin.module.css";
import CreateProduct from "@/component/products/createProduct";
import ProductList from "@/component/common/ProductList";
import CreateAddon from "@/component/products/createAddon";
import AddonList from "@/component/common/AddonList";
import CreateCategory from "@/component/common/AddCategory";
import CreateSubCategory from "@/component/common/AddSubcat";
import OrdersList from "@/component/common/OrderList";
import AddShippingMethod from "@/component/common/ShippingMethod";
import ManageShippingMethods from "@/component/common/deleteShippingMethid";
import AddMethodTime from "@/component/common/MethodTime";
import DeleteMethodTime from "@/component/common/DeleteMethod";
const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isBlogMenuOpen, setIsBlogMenuOpen] = useState(false);
  const [isShippingMethod, setIsShippingOpen] = useState(false);
  const [isMethodTime, setIsTimeOpen] = useState(false);

  const renderComponent = () => {
    switch (activeComponent) {
      case "createProduct":
        return <CreateProduct />;
      case "updateProduct":
        return <ProductList />;
      case "addon":
        return <CreateAddon />;
      case "addonList":
        return <AddonList />;
      case "category":
        return <CreateCategory />;
      case "Subcategory":
        return <CreateSubCategory />;
      case "orders":
        return <OrdersList />;
      case "shippingmethod":
        return <AddShippingMethod />;
      case "managemethod":
        return <ManageShippingMethods />;
      case "methodtime":
        return <AddMethodTime />;
      case "deletemethodtime":
        return <DeleteMethodTime />;
      default:
        return <div>Select an option to manage products or blogs</div>;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <h1 className={styles.title}>Admin Dashboard</h1>

        <button
          onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
          className={styles.menuButton}
        >
          Product
        </button>
        {isProductMenuOpen && (
          <div className={styles.submenu}>
            <button
              onClick={() => setActiveComponent("createProduct")}
              className={`${styles.button} ${styles.buttonCreate}`}
            >
              Create Product
            </button>
            <button
              onClick={() => setActiveComponent("updateProduct")}
              className={`${styles.button} ${styles.buttonCreate}`}
            >
              Update Product
            </button>
          </div>
        )}

        {/* Add on Section */}
        <button
          onClick={() => setIsBlogMenuOpen(!isBlogMenuOpen)}
          className={styles.menuButton}
        >
          Add ON
        </button>
        {isBlogMenuOpen && (
          <div className={styles.submenu}>
            <button
              onClick={() => setActiveComponent("addon")}
              className={`${styles.button} ${styles.buttonCreate}`}
            >
              Add Product
            </button>
            <button
              onClick={() => setActiveComponent("addonList")}
              className={`${styles.button} ${styles.buttonCreate}`}
            >
              Update Add On
            </button>
          </div>
        )}
        <button
          onClick={() => setActiveComponent("category")}
          className={styles.menuButton}
        >
          Add Category
        </button>
        <button
          onClick={() => setActiveComponent("Subcategory")}
          className={styles.menuButton}
        >
          Add SubCategory
        </button>
        <button
          onClick={() => setActiveComponent("orders")}
          className={styles.menuButton}
        >
          Orders
        </button>
        <button
          onClick={() => setIsShippingOpen(!isShippingMethod)}
          className={styles.menuButton}
        >
          Shipping Method
        </button>
        {isShippingMethod && (
          <div className={styles.submenu}>
            <button
              onClick={() => setActiveComponent("shippingmethod")}
              className={`${styles.button} ${styles.buttonCreate}`}
            >
              Create Shipping Method
            </button>
            <button
              onClick={() => setActiveComponent("managemethod")}
              className={`${styles.button} ${styles.buttonCreate}`}
            >
              Delete Shipping Method
            </button>
          </div>
        )}
        <button
          onClick={() => setIsTimeOpen(!isMethodTime)}
          className={styles.menuButton}
        >
          Method Time
        </button>
        {isMethodTime && (
          <div className={styles.submenu}>
            <button
              onClick={() => setActiveComponent("methodtime")}
              className={`${styles.button} ${styles.buttonCreate}`}
            >
              Create Method Time
            </button>
            <button
              onClick={() => setActiveComponent("deletemethodtime")}
              className={`${styles.button} ${styles.buttonCreate}`}
            >
              Delete Method time
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>{renderComponent()}</div>
      <div className={styles.notAvailableMessage}>
        Not available on mobile or tablet.
      </div>
    </div>
  );
};

export default AdminDashboard;
