import React from 'react';
import { FaHome, FaCalendarAlt, FaCheckCircle, FaBell, FaCog } from 'react-icons/fa';
import '../App.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>AI Meeting Buddy</h3>
      </div>
      <ul className="nav-list">
        <li className="nav-item active">
          <a href="#">
            <FaHome style={{ marginRight: '8px' }} />
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#">
            <FaCalendarAlt style={{ marginRight: '8px' }} />
            Scheduler
          </a>
        </li>
        <li className="nav-item">
          <a href="#">
            <FaCheckCircle style={{ marginRight: '8px' }} />
            Follow Ups
          </a>
        </li>
        <li className="nav-item">
          <a href="#">
            <FaBell style={{ marginRight: '8px' }} />
            Reminders
          </a>
        </li>
        <li className="nav-item">
          <a href="#">
            <FaCog style={{ marginRight: '8px' }} />
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;