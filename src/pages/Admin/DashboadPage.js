import React, { useEffect, useState } from "react";
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
  const [backgroundColor, setBackgroundColor] = useState('#fafafa')

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo.isAdmin === false) navigate("/");
  }, []);

  return (
    <div className={classes["admin-page"]} style={{ backgroundColor: backgroundColor }}>
      <div className={classes["admin-page-left"]}>
        <SideNavbar />
      </div>
      <div className={classes["admin-page-right"]}>
        <div className="d-flex justify-content-start align-items-center w-100 p-4 mt-3 mb-0">
          <h1 className="txt--black font-family-secondary">DASHBOARD</h1>
          <div
            className={classes["change-color"]}
            style={{
              backgroundColor: "var(--bs-primary)",
              margin: "0 2px",
              marginLeft: "1.5rem",
            }}
            onClick={() => setBackgroundColor('var(--bs-primary)')}
          ></div>
          <div
            className={classes["change-color"]}
            style={{
              backgroundColor: "var(--bs-dark-blue)",
              margin: "0 2px",
            }}
            onClick={() => setBackgroundColor('var(--bs-dark-blue)')}
          ></div>
          <div
            className={classes["change-color"]}
            style={{
              backgroundColor: "#fafafa",
              margin: "0 2px",
            }}
            onClick={() => setBackgroundColor('#fafafa')}
          ></div>
        </div>
        <h2 className="txt--black font-family-secondary p-4 mt-3 mb-0">
          SUMMARY
        </h2>
        <TotalOrdersEarnings />
        <Accordion
          flush
          className="mt-4 "
          data-type="charts-collapse-btn"
          defaultActiveKey="0"
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h1
                className="txt--black font-family-secondary mb-0"
                style={{
                  alignSelf: "flex-start",
                  padding: "1rem",
                  paddingTop: "2rem",
                  textDecoration: "underline",
                }}
              >
                CHARTS
              </h1>
            </Accordion.Header>
            <Accordion.Body>
              <Charts />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default DashboadPage;
