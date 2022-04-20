import React from "react";

function Dashboard(props) {
  const handleSignOut = () => {
    localStorage.clear();
    window.location.assign("/");
  };
  return (
    <div>
      <div>dashboard</div>
      <input type="button" onClick={handleSignOut} value="Sign Out" />
    </div>
  );
}
 
export default Dashboard;
