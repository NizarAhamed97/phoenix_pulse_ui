import React, { useEffect, useState } from 'react';
import { fetchMembers } from '../services/api';

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers()
      .then((data) => setMembers(data))
      .catch((error) => console.error('Error fetching members:', error));
  }, []);

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Members;
