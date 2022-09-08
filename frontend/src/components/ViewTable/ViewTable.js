import React from "react";
import Table from "react-bootstrap/Table";

const ViewTable = ({ urlData }) => {
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Long Url</th>
          <th>Short Url</th>
          <th>Clicks</th>
        </tr>
      </thead>
      <tbody>
        {urlData.map((url, indx) => {
          return (
            <tr key={indx}>
              <td>{indx}</td>
              <td>{url.longURL}</td>
              <td>{url.shortURL}</td>
              <td>{url.clicks}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ViewTable;
