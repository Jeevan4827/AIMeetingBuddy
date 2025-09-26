import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaCheckCircle, FaBell, FaCog } from 'react-icons/fa';
import '../App.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>AI Meeting Buddy</h3>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" end>
            <FaHome />
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/scheduler">
            <FaCalendarAlt />
            Scheduler
          </NavLink>
        </li>
        <li className="nav-item">
          <a href="#">
            <FaCheckCircle />
            Follow Ups
          </a>
        </li>
        <li className="nav-item">
          <a href="#">
            <FaBell />
            Reminders
          </a>
        </li>
        <li className="nav-item">
          <a href="#">
            <FaCog />
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;