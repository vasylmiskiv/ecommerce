import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { listUsers, deleteUser } from "../actions/userActions";
import useAppSelector from "../hooks/useAppSelector";

import Loader from "../components/Loader";
import Message from "../components/Message";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { userList, userLogin, userDelete } = useAppSelector((state) => ({
    userList: state.userList,
    userLogin: state.userLogin,
    userDelete: state.userDelete,
  }));

  const { loading, error, users } = userList;
  const { userInfo } = userLogin;
  const { success } = userDelete;

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, success, userInfo]);

  const deleleteHandler = (id) => {
    if (window.confirm("Do u confirm it?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>TOOLS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                {user.isAdmin ? (
                  <td>
                    <p style={{ color: "red" }}>{user.name} </p>
                  </td>
                ) : (
                  <td>{user.name}</td>
                )}
                <td>
                  <a href={`mailto: ${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  {!user.isAdmin ? (
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        deleleteHandler(user._id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        deleleteHandler(user._id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
