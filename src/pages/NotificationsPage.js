import React from 'react';
import { useAuth } from '../context/AuthContext';

const NotificationsPage = () => {
  const { user, notifications } = useAuth();

  // Filter to get only the notifications for the current user
  const userNotifications = notifications.filter(n => n.recipient === user.type);

  return (
    <>
      <header className="app-header">
        <h2 className="page-subtitle">Your Notifications</h2>
      </header>
      <div className="notifications-container">
        {userNotifications.length > 0 ? (
          <ul className="notification-list">
            {userNotifications.map(notification => (
              <li key={notification.id} className="notification-item">
                <h4>{notification.message}</h4>
                <p>{notification.details.replace(/\n/g, ' | ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no new notifications.</p>
        )}
      </div>
    </>
  );
};

export default NotificationsPage;