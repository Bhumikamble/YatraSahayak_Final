import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import About from "./Pages/About/About.jsx";
import User from "./components/User/User.jsx";
import Login from "./components/Auth/Login/Login.jsx";
import Signup from "./components/Auth/Signup/Signup.jsx";
import Home from "./Pages/Home/Home.jsx";
import Hotels from "./Pages/SubSections/Hotels.jsx";
import ProfilePage from "./Pages/Profile/UserProfile.jsx";
import AllPosts from "./Pages/SubSections/AllPosts.jsx";
import Itinerary from "./Pages/Itinerary/Itinerary.jsx";
import ItineraryPage from "./Pages/Itinerary/ItineraryPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="programs/hotels" element={<Hotels />} />

      <Route path="profile" element={<ProfilePage />} />
      <Route path="about" element={<About />} />
      <Route path="/allposts" element={<AllPosts  />} />


      {/* <Route path='user/' element={<User />}>
        <Route path=':userid' element={<User />} />
      </Route> */}
      <Route path="programs/" />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="Itinerary" element={<Itinerary />} />
      <Route path="ItineraryPage" element={<ItineraryPage />} />
      <Route
        path="*"
        element={<h1 className="text-center text-3xl text-bold">Not Found</h1>}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />

    <RouterProvider router={router} />
  </React.StrictMode>
);
