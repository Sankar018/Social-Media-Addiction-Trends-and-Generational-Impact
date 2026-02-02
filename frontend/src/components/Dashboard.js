import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="container">
      <h2>📊 Your Addiction Insights</h2>
      <p>Here’s how your addiction level compares with others.</p>

      {/* Power BI Dashboard Embed */}
      <iframe
        title="Addiction Analysis Dashboard"
        className="dashboard-iframe"
        src="https://app.powerbi.com/view?r=eyJrIjoiNDNlM2IzNmUtOWRkNy00MGUyLWIxMTktMDFjZjg3OTFjNmJlIiwidCI6ImY3NzUzZmEzLWNlZTYtNGQ3My1iMzNiLWI0YzhkY2NjYWZiMyJ9"
        allowFullScreen={true}
      ></iframe>

      <div className="dashboard-buttons">
        <button onClick={() => (window.location.href = "/areavisual")}>📊 Compare to My Area</button>
      </div>
    </div>
  );
};

export default Dashboard;
