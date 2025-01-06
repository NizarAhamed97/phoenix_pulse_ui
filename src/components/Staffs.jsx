import React, { useEffect, useState } from 'react';
import { fetchStaffs } from '../services/api';

const Staffs = () => {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    fetchStaffs()
      .then((data) => setStaffs(data))
      .catch((error) => console.error('Error fetching staffs:', error));
  }, []);

  return (
    <div>
      <h2>Staffs</h2>
      <ul>
        {staffs.map((staff) => (
          <li key={staff.id}>{staff.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Staffs;
