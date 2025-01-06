import React from 'react';
import { addMember } from '../services/api';
import CustomForm from './CustomForm';

const AddMember = () => {
  const handleAddMember = (formData) => {
    addMember(formData)
      .then((response) => {
        alert('Member added successfully!');
      })
      .catch((error) => {
        console.error('Error adding member:', error);
        alert('Failed to add member.');
      });
  };

  const memberFields = [
    { label: 'Name', name: 'Name', required: true },
    { label: 'Date of Birth', name: 'DOB', type: 'date', required: true },
    { label: 'Contact Number', name: 'ContactNo', type: 'tel', required: true },
    { label: 'Email', name: 'Email', type: 'email', required: true },
    { label: 'Added By', name: 'AddedBy', required: true },
  ];

  return (
    <CustomForm title="Add Member" fields={memberFields} onSubmit={handleAddMember} />
  );
};

export default AddMember;
