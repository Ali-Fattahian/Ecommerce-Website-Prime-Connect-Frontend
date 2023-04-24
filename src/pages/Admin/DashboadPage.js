import React, { useEffect } from 'react'
import SideNavbar from '../../components/SideNavbar'
import { useSelector } from "react-redux";
import classes from "../Admin/Admin.module.css";
import { useNavigate } from 'react-router-dom';
import Charts from '../../components/Charts/Charts';

const DashboadPage = () => {
  const user = useSelector((state) => state.user)
  const { userInfo } = user;
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) navigate('/login')
    if (userInfo && !userInfo.isAdmin) navigate('/')
  }, [])

  return (
    <div className={classes.dashboard}>
      <SideNavbar />
      <Charts />
    </div>
  )
}

export default DashboadPage