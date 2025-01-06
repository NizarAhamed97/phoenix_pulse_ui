import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Replace with your backend base URL

// Get all members
export const fetchMembers = async () => {
  const response = await axios.get(`${BASE_URL}/members`);
  return response.data;
};

// Add a new member
export const addMember = async (memberData) => {
  const response = await axios.post(`${BASE_URL}/members`, memberData);
  return response.data;
};

// Get all staff
export const fetchStaffs = async () => {
  const response = await axios.get(`${BASE_URL}/staff`);
  return response.data;
};

// Add a new staff
export const addStaff = async (staffData) => {
  const response = await axios.post(`${BASE_URL}/staff`, staffData);
  return response.data;
};
