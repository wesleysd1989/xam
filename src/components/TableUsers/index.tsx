import React, { memo } from "react";
import Table from "react-bootstrap/Table";
import { UserState } from "../../hooks/user";
import Button from "../Button";

import { Container } from "./styles";

interface TableUsersProps {
  users: UserState[];
  remove(id: number): void;
}

const TableUsers: React.FC<TableUsersProps> = ({users, remove}) => {
  return (
    <Container>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Branch ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: UserState, key: number) => (
            <tr key={key}>
            <td>{key}</td>
            <td>{user.branchId}</td>
            <td>{user.userName}</td>
            <td>{`${user.firstName} ${user.middleName.charAt(0)} ${user.lastName}`}</td>
            <td>{user.position}</td>
            <td><Button onClick={() => remove(user.branchId)}>REMOVE</Button></td>
          </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default memo(TableUsers);
