import React from "react";
import ActiveVsInactive from "./ActiveVsInactive";
import Membership from "./Membership";

const Dashboard = () => {
  return (
    <div className="container">

      {/* Center the component using Bootstrap row/column */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <ActiveVsInactive />
          <Membership />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
