import React, { useEffect, useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import { UrlContext } from "../Context/ShortenUrlContext";
import ViewTable from "../ViewTable/ViewTable";
import styles from "./ViewUrls.module.css";

const ViewUrls = () => {
  const { urlData, setUrlData, isLoading, setIsLoading } =
    useContext(UrlContext);
  const getUrlsAPIData = async () => {
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL + "getAllUrls";

      setIsLoading(true);
      await fetch(baseUrl)
        .then((resp) => resp.json())
        .then((res) => {
          setUrlData(res.urls);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("API calling error:", err);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.log("error:", error);
    }
  };
  useEffect(() => {
    getUrlsAPIData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Spinner animation="border" role="status" />
      </div>
    );
  } else {
    if (urlData && urlData.length > 0) {
      return (
        <div className={styles.tableWrapper}>
          <ViewTable urlData={urlData} />
        </div>
      );
    } else {
      return <h3 style={{ textAlign: "center" }}>No Urls to show</h3>;
    }
  }
};

export default ViewUrls;
