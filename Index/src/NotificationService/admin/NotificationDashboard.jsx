import React, { useState } from 'react';
// import { databases } from '../appwrite/config';
import { databases } from '../../appwriteConfig';
import './NotificationDashboard.css';

const NotificationDashboard = () => {
  const [notification, setNotification] = useState({
    title: '',
    body: '',
    type: 'broadcast',
    segment: 'all'
  });
  const [isSending, setIsSending] = useState(false);
  const [stats, setStats] = useState(null);

  const sendNotification = async () => {
    setIsSending(true);
    try {
      const response = await fetch(process.env.REACT_APP_BROADCAST_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notification)
      });

      const result = await response.json();
      setStats(result);
      alert(`Sent! Successful: ${result.successful}, Failed: ${result.failed}`);
      
      // Reset form
      setNotification({ title: '', body: '', type: 'broadcast', segment: 'all' });
    } catch (error) {
      alert('Error sending notification');
    } finally {
      setIsSending(false);
    }
  };

  const sendReminder = async (reminderType, customMessage = '') => {
    try {
      const response = await fetch(process.env.REACT_APP_REMINDER_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reminderType, customMessage })
      });

      const result = await response.json();
      alert(`Reminder sent to ${result.totalTargeted} users. Successful: ${result.successful}`);
    } catch (error) {
      alert('Error sending reminder');
    }
  };

  const getSubscriberStats = async () => {
    try {
      const subscriptions = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_SUBSCRIPTIONS_COLLECTION,
        ['isActive=true']
      );
      
      alert(`Active subscribers: ${subscriptions.total}`);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="notification-dashboard">
      <h2>Notification Center</h2>
      
      <div className="dashboard-stats">
        <button onClick={getSubscriberStats} className="stats-btn">
          Check Subscriber Count
        </button>
      </div>

      <div className="broadcast-section">
        <h3>Send Broadcast</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Notification Title"
            value={notification.title}
            onChange={(e) => setNotification({...notification, title: e.target.value})}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Notification Message"
            value={notification.body}
            onChange={(e) => setNotification({...notification, body: e.target.value})}
            rows="3"
          />
        </div>
        <button 
          onClick={sendNotification}
          disabled={isSending || !notification.title || !notification.body}
          className="send-btn"
        >
          {isSending ? 'Sending...' : 'Send to All Subscribers'}
        </button>
      </div>

      <div className="reminders-section">
        <h3>Quick Reminders</h3>
        <div className="reminder-buttons">
          <button onClick={() => sendReminder('welcome')} className="reminder-btn">
            Send Welcome Reminder
          </button>
          <button onClick={() => sendReminder('inactive')} className="reminder-btn">
            Send Inactive User Reminder
          </button>
          <button onClick={() => sendReminder('newFeature')} className="reminder-btn">
            New Feature Announcement
          </button>
        </div>
      </div>

      {stats && (
        <div className="results">
          <h4>Last Send Results</h4>
          <p>Successful: {stats.successful}</p>
          <p>Failed: {stats.failed}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationDashboard;