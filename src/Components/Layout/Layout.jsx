import React from "react";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <main className="min-h-screen bg-black/40 pt-12">
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
