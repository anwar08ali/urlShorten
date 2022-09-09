import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import { UrlContext } from "../Context/ShortenUrlContext";
import styles from "./ViewTable.module.css";

const ViewTable = () => {
  const { urlData, setUrlData } = useContext(UrlContext);
  const handleRedirect = (shortUrl) => {
    const temp = [...urlData];
    temp.forEach((element, indx) => {
      if (element.shortURL === shortUrl) {
        element.clicks++;
      }
    });

    setUrlData(temp);
    const newWindow = window.open(
      process.env.REACT_APP_BACKEND_URL + shortUrl,
      "_blank", // <- This is what makes it open in a new window.
      "noopener,noreferrer" //It instructs the browser to navigate to the target resource without granting the new browsing context access to the document that opened it.
    );
    newWindow.opener = null; //for security purpose.
  };
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
              <td>{++indx}</td>
              <td>{url.longURL}</td>
              <td>
                <span
                  title="Click to open the original url"
                  className={styles.sub}
                  onClick={() => handleRedirect(url.shortURL)}
                >
                  {process.env.REACT_APP_BACKEND_URL + url.shortURL}
                </span>
              </td>
              <td>{url.clicks}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ViewTable;
