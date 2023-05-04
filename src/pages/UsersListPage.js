import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { deleteUserProfile, getUserList } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import classes from "../pages/Admin/Admin.module.css";
import SideNavbar from "../components/SideNavbar";

const UsersListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { usersList, userInfo, error } = user;

  const deleteUserHandler = (id) => {
    const token = userInfo.token;
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserProfile({ id, token }));
      window.location.reload()
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList(userInfo.token));
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  return (
    <div className={classes["admin-page"]}>
      <div className={classes["admin-page-left"]}>
        <SideNavbar />
      </div>
      <div className={classes["admin-page-right"]} style={{ paddingTop: '2rem', paddingRight: '1rem' }}>
        <Container id="user-list__container" style={{ maxWidth: '900px'}}>
        <h1 className="font-family-secondary txt--black mt-2" style={{ alignSelf: 'flex-start' }}>USERS</h1>
          {error && (
            <Message variant="danger" className="m-2">
              {error}
            </Message>
          )}
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm mt-4"
            id="user-list-table"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i className="fa fa-check" style={{ color: "green" }}></i>
                    ) : (
                      <i className="fa fa-check" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {!user.isAdmin && <LinkContainer to={`/users/${user.id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i
                          className="fa fa-edit"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </Button>
                    </LinkContainer>}
                    {!user.isAdmin && (
                      <Button
                        style={{
                          color: "black",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        className="btn-sm"
                        type="submit"
                        onClick={() => {
                          deleteUserHandler(user.id);
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default UsersListPage;
