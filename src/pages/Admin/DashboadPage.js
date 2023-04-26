import React, { useEffect } from "react";
import SideNavbar from "../../components/SideNavbar";
import { useSelector } from "react-redux";
import classes from "../Admin/Admin.module.css";
import { useNavigate } from "react-router-dom";
import Charts from "../../components/Charts/Charts";
import TotalOrdersEarnings from "../../components/Charts/TotalOrdersEarnings";
import Accordion from "react-bootstrap/Accordion";

const DashboadPage = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo.isAdmin === false) navigate('/')
  }, []);

  return (
    <div className={classes["admin-page"]}>
      <div className={classes["admin-page-left"]}>
        <SideNavbar />
      </div>
      <div className={classes["admin-page-right"]}>
        <h1
          className="txt--black font-family-secondary p-4 mt-3 mb-0"
          style={{ alignSelf: "flex-start" }}
        >
          SUMMARY
        </h1>
        <TotalOrdersEarnings />
        <Accordion flush className="mt-4 " data-type='charts-collapse-btn'>
          <Accordion.Header>
            <h1
              className="txt--black font-family-secondary mb-0"
              style={{
                alignSelf: "flex-start",
                padding: "1rem",
                paddingTop: "2rem",
                textDecoration: 'underline'
              }}
            >
              STATISTICS
            </h1>
          </Accordion.Header>
          <Accordion.Body>
            <Charts />
          </Accordion.Body>
        </Accordion>
      </div>
    </div>
  );
};

export default DashboadPage;
