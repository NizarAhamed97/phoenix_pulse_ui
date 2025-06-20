import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingBlock from "../../components/LoadingBlock"; // Make sure this path is correct

const ActiveVsInactive = () => {
  const [activeMembers, setActiveMembers] = useState([]);
  const [inactiveMembers, setInactiveMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/activity`);
        setActiveMembers(res.data.activeMembers || []);
        setInactiveMembers(res.data.inactiveMembers || []);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  return (
    <div>
      <div className="card border-success mb-4 shadow-sm">
        <div className="card-header bg-dark text-white text-center">
          <h5 className="mb-0">Active vs Inactive</h5>
        </div>

        <div className="card-body d-flex" style={{ height: "300px" }}>
          {/* Active Members Section */}
          <div className="w-50 pe-2 border-end overflow-auto">
            <h6 className="text-success text-center mb-2 pb-2 border-bottom border-light">
              Active Members
            </h6>

            {loading ? (
              <LoadingBlock message="Loading active members..." />
            ) : activeMembers.length > 0 ? (
              <>
                <div className="d-flex justify-content-between fw-bold px-2 mb-1 border-bottom border-light">
                  <span className="text-center w-50">Name</span>
                  <span className="text-center w-50">Last CheckIn</span>
                </div>
                {activeMembers.map((member, index) => (
                  <div key={index} className="p-2 border rounded mb-2 bg-light">
                    <div className="d-flex justify-content-between">
                      <span className="w-50 text-center text-black fw-normal">{member.Name}</span>
                      <span className="text-success small w-50 text-center">{member.LastCheckIn} days ago</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                <p className="text-center text-muted">No active members</p>
              </div>
            )}
          </div>

          {/* Inactive Members Section */}
          <div className="w-50 ps-2 overflow-auto">
            <h6 className="text-danger text-center mb-2 pb-2 border-bottom border-light">
              Inactive Members
            </h6>

            {loading ? (
              <LoadingBlock message="Loading inactive members..." />
            ) : inactiveMembers.length > 0 ? (
              <>
                <div className="d-flex justify-content-between fw-bold px-2 mb-1 border-bottom border-light">
                  <span className="text-center w-50">Name</span>
                  <span className="text-center w-50">Last CheckIn</span>
                </div>
                {inactiveMembers.map((member, index) => (
                  <div key={index} className="p-2 border rounded mb-2 bg-light">
                    <div className="d-flex justify-content-between">
                      <span className="w-50 text-center text-black fw-normal">{member.Name}</span>
                      <span className="text-success small w-50 text-center">{member.LastCheckIn} days ago</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                <p className="text-center text-muted">No inactive members</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveVsInactive;
