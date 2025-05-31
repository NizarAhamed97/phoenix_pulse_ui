import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingBlock from "../../components/LoadingBlock";

const Membership = () => {
  const [expirySoon, setExpirySoon] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/memberships`);
        setExpirySoon(res.data.expirySoon || []);
        setOverdue(res.data.overdue || []);
      } catch (error) {
        console.error("Error fetching membership data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembership();
  }, []);

  return (
    <div>
      <div className="card border-info mb-4 shadow-sm">
        <div className="card-header bg-dark text-white text-center">
          <h5 className="mb-0">Memberships</h5>
        </div>
        <div className="card-body d-flex" style={{ height: "300px" }}>
          {/* Expiry Soon */}
          <div className="w-50 pe-2 border-end overflow-auto">
            <h6 className="text-warning text-center mb-2 pb-2 border-bottom border-light">
              Expiry Soon
            </h6>
            {loading ? (
              <LoadingBlock message="Loading memberships..." />
            ) : expirySoon.length > 0 ? (
              <>
                <div className="d-flex justify-content-between fw-bold px-2 mb-1 border-bottom border-light">
                  <span className="text-center w-50">Name</span>
                  <span className="text-center w-50">Expires In</span>
                </div>
                {expirySoon.slice(0, 7).map((membership, index) => (
                  <div key={index} className="p-2 border rounded mb-2 bg-light">
                    <div className="d-flex justify-content-between">
                      <span className="w-50 text-center text-black fw-normal">{membership.Name}</span>
                      <span className="text-muted small w-50 text-center">
                        {membership.DaysExpired !== null
                          ? `${membership.DaysToBeExpired} days`
                          : "Coming Soon"}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center text-muted">No memberships expiring soon</div>
            )}
          </div>

          {/* Overdue */}
          <div className="w-50 ps-2 overflow-auto">
            <h6 className="text-danger text-center mb-2 pb-2 border-bottom border-light">
              Overdue
            </h6>
            {loading ? (
              <LoadingBlock message="Loading overdue memberships..." />
            ) : overdue.length > 0 ? (
              <>
                <div className="d-flex justify-content-between fw-bold px-2 mb-1 border-bottom border-light">
                  <span className="text-center w-50">Name</span>
                  <span className="text-center w-50">Expired</span>
                </div>
                {overdue.slice(0, 7).map((membership, index) => (
                  <div key={index} className="p-2 border rounded mb-2 bg-light">
                    <div className="d-flex justify-content-between">
                      <span className="w-50 text-center text-black fw-normal">{membership.Name}</span>
                      <span className="text-muted small w-50 text-center">
                        {membership.DaysSinceExpired} days ago
                      </span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center text-muted">No overdue memberships</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
