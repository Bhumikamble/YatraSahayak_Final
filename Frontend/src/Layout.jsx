import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext.jsx";
import Navbar from "./components/Navbar/Navbar";

function Layout() {
  return (
    <>
      <UserContextProvider>
       <Navbar />
        <Outlet />
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Footer />
      </UserContextProvider>
    </>
  );
}

export default Layout;
