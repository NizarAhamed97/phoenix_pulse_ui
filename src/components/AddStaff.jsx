import React from 'react';
import { addStaff } from '../services/api';
import CustomForm from './CustomForm';

const AddStaff = () => {
  const handleAddStaff = (formData) => {
    addStaff(formData)
      .then((response) => {
        alert('Staff added successfully!');
      })
      .catch((error) => {
        console.error('Error adding staff:', error);
        alert('Failed to add staff.');
      });
  };

  const staffFields = [
    { label: 'Name', name: 'Name', required: true },
    { label: 'Date of Birth', name: 'DOB', type: 'date', required: true },
    { label: 'Contact Number', name: 'ContactNo', type: 'tel', required: true },
    { label: 'Email', name: 'Email', type: 'email', required: true },
    { label: 'Role', name: 'Role', required: true },
  ];

  return (
    <CustomForm title="Add Staff" fields={staffFields} onSubmit={handleAddStaff} />
  );
};

export default AddStaff;
