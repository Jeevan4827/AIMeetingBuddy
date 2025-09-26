import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaSignOutAlt, FaCheckCircle, FaBell, FaCog } from 'react-icons/fa';
import {useAuth} from '../context/AuthContext';
import '../App.css';

const Sidebar = () => {
  const { logout } = useAuth();
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
        <li className="nav-item logout-item">
          <button className="logout-button" onClick={logout}>
            <FaSignOutAlt />
            Logout
          </button>
        </li> 
      </ul>
    </nav>
  );
};

export default Sidebar;