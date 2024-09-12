// src/App.js
import React from "react";
import {
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Jobs from "./components/jobs/Jobs";
import Bookmarks from "./components/bookmarks/Bookmarks";
import JobDetails from "./components/jobDetails/JobDetails";
import "./App.css";

const App = () => {
  return (
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Jobs />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/job/:id" element={<JobDetails />} />
          </Routes>
        </div>
        <nav className="bottom-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            end
          >
            Jobs
          </NavLink>
          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Bookmarks
          </NavLink>
        </nav>
      </div>
  );
};

export default App;
