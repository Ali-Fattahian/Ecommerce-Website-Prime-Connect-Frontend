import React, { useState } from "react";
import classes from "../pages/Admin/Admin.module.css";
import { useNavigate } from "react-router-dom";

const SideNavbar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const navbarCollapaseHandler = () => {
    setCollapsed((prevState) => !prevState);
  };

  const navigate = useNavigate()
  return (
    <section
      id={classes.navbar}
      className={`${collapsed && classes["navbar-collapsed"]}`}
    >
      <div
        id={classes["collapse-button"]}
        className={`${!collapsed && classes["uncollapsed-button"]}`}
        onClick={navbarCollapaseHandler}
      >
        {collapsed ? <i className="fa fa-arrow-right"></i> :  <i className="fa fa-arrow-left"></i>}
      </div>
      <div className={classes["navbar-top"]} style={{ cursor: "pointer" }} onClick={() => navigate('/')}>
        <h2>PrimeConnect</h2>
      </div>
      <div className={classes["navbar-middle"]}>
        <div className={classes["navbar-links__section"]}>
          <i className="fa fa-bar-chart"></i>
          <p>Dashboard</p>
        </div>
        <div className={classes["navbar-links__section"]}>
          <i className="fa fa-address-card"></i>
          <p>Profile</p>
        </div>
        <div className={classes["navbar-links__section"]}>
          <i className="fa fa-users"></i>
          <p>Manage Users</p>
        </div>
        <div className={classes["navbar-links__section"]}>
          <i className="fa fa-shopping-bag"></i>
          <p>Manage Products</p>
        </div>
        <div className={classes["navbar-links__section"]}>
          <i className="fa fa-truck"></i>
          <p>Manage Orders</p>
        </div>
        <div className={classes["navbar-links__section"]}>
          <i className="fa fa-comments"></i>
          <p>Messages</p>
        </div>
        <div className={classes["navbar-links__section"]}>
          <i className="fa fa-globe"></i>
          <p>Back to Website</p>
        </div>
      </div>
      <div className={classes["navbar-bottom"]}>
        <div>
          <i className="fa fa-sign-out"></i>
          <p>Log out</p>
        </div>
      </div>
    </section>
  );
};

export default SideNavbar;
