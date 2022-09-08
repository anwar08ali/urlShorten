import React, { useState, useContext } from "react";
import Scroll from "../Scroll/Scroll";
import { Button, Row, Col, Container } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import { isURL, notify } from "../../util/util";
import Form from "react-bootstrap/Form";
import ViewUrls from "../ViewUrls/ViewUrls";
import { UrlContext } from "../Context/ShortenUrlContext";
import styles from "./UrlShortener.module.css";

const UrlShortener = () => {
  const [urlInput, setUrlInput] = useState("");

  const { urlData, setUrlData } = useContext(UrlContext);
  const handleChange = (text) => {
    setUrlInput(text);
  };

  const submitHandler = async () => {
    try {
      if (!isURL(urlInput)) {
        notify({ type: "error", text: "Please enter a valid URL." });
      } else {
        const baseUrl = process.env.REACT_APP_BACKEND_URL + "genShortUrl";
        await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ longUrl: urlInput }),
        })
          .then((resp) => resp.json())
          .then((res) => {
            const obj = {
              longURL: urlInput,
              shortURL: res.shortUrl,
              clicks: 0,
            };
            const newData = [...urlData, obj];
            setUrlData(newData);
            notify({
              type: "success",
              text: `Successfully shorten the URL`,
            });
          })
          .catch((err) => {
            console.log("API calling error:", err);
          });
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const showUrlsData = () => {
    return (
      <Scroll>
        <ViewUrls />
      </Scroll>
    );
  };
  return (
    <div>
      <section className={styles.urlWrapper}>
        <Container fluid>
          <Row>
            <Col>
              <div className={styles.headingWraper}>
                <div className={styles.urlInput}>
                  <Form.Control
                    type="url"
                    id="inputText"
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="urls"
                  />{" "}
                  <div className={styles.btnWrapper}>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => submitHandler()}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {showUrlsData()}
        <ToastContainer />
      </section>
    </div>
  );
};

export default UrlShortener;
