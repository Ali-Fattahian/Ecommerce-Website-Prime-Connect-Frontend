import React, { useEffect, useState } from "react";
import classes from "../pages/Admin/Admin.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const SideNavbar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const user = useSelector((state) => state.user)
  const { userInfo, logout } = user;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [pendingRequests, setPendingRequests] = useState(null)

  const navbarCollapaseHandler = () => {
    setCollapsed((prevState) => !prevState);
  };

  const fetchPendingOrders = async () => {
    const token = userInfo.token;
    try {
      const { data } = await axios.get('/products/get-all-pending-requests', {
        headers: {
          Authorization: `JWT ${token}`
        },
        baseURL: 'http://localhost:8000/api',
      })
      setPendingRequests(data)
    } catch(err) {
      setError(err)
    }
  }

  useEffect(() => {
    if (!userInfo) navigate('/login')
    if(userInfo.isAdmin)
      fetchPendingOrders()
  }, [])
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
        <div className={classes["navbar-links__section"]} onClick={() => navigate("/admin/dashboard/")}>
          <i className="fa fa-bar-chart"></i>
          <p>Dashboard</p>
        </div>
        <div className={classes["navbar-links__section"]} onClick={() => navigate(`/users/${userInfo.id}/edit/`)}>
          <i className="fa fa-address-card"></i>
          <p>Profile</p>
        </div>
        <div className={classes["navbar-links__section"]} onClick={() => navigate("/admin/user-list/")}>
          <i className="fa fa-users"></i>
          <p>Manage Users</p>
        </div>
        <div className={classes["navbar-links__section"]} onClick={() => navigate("/admin/product-list/")}>
          <i className="fa fa-shopping-bag"></i>
          <p>Manage Products</p>
        </div>
        <div className={classes["navbar-links__section"]} onClick={() => navigate("/admin/order-list/")}>
          <i className="fa fa-truck" style={{ position: 'relative' }}>{!error && pendingRequests > 0 && <span className={classes['pending-orders']}>{pendingRequests}</span>}</i>
          <p>Manage Orders</p>
        </div>
        <div className={classes["navbar-links__section"]} onClick={() => navigate('/admin/message-management')}>
          <i className="fa fa-comments"></i>
          <p>Messages</p>
        </div>
        <div className={classes["navbar-links__section"]} onClick={() => navigate("/")}>
          <i className="fa fa-globe"></i>
          <p>Back to Website</p>
        </div>
      </div>
      <div className={classes["navbar-bottom"]} onClick={() => dispatch(logout())}>
        <div>
          <i className="fa fa-sign-out"></i>
          <p>Log out</p>
        </div>
      </div>
    </section>
  );
};

export default SideNavbar;
