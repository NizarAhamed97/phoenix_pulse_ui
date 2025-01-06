import React, { useState } from 'react';
import Members from './Members';
import Staffs from './Staffs';
import AddMember from './AddMember';
import AddStaff from './AddStaff';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('members');

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <button
          onClick={() => setActiveTab('members')}
          style={{
            padding: '10px',
            marginRight: '5px',
            backgroundColor: activeTab === 'members' ? '#ddd' : '#fff',
          }}
        >
          Members
        </button>
        <button
          onClick={() => setActiveTab('staffs')}
          style={{
            padding: '10px',
            backgroundColor: activeTab === 'staffs' ? '#ddd' : '#fff',
          }}
        >
          Staffs
        </button>
      </div>
      <div>
        {activeTab === 'members' ? (
          <>
            <Members />
            <AddMember />
          </>
        ) : (
          <>
            <Staffs />
            <AddStaff />
          </>
        )}
      </div>
    </div>
  );
};

export default Tabs;
