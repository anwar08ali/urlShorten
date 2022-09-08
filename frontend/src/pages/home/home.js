import React from "react";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

import UrlShortener from "../../components/UrlShortener/UrlShortener";
import styles from "./home.module.css";

const Home = () => {
  return (
    <>
      <header>
        <div className={styles.heading}>URL Shortener App</div>
      </header>
      <ErrorBoundary>
        <UrlShortener />
      </ErrorBoundary>
    </>
  );
};

export default Home;
