import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Change if backend is deployed

// API for Members
export const fetchMembers = async () => {
  return await axios.get(`${API_BASE_URL}/members`);
};

export const addMember = async (memberData) => {
  return await axios.post(`${API_BASE_URL}/members`, memberData);
};

// API for Staff
export const fetchStaff = async () => {
  return await axios.get(`${API_BASE_URL}/staff`);
};

export const addStaff = async (staffData) => {
  return await axios.post(`${API_BASE_URL}/staff`, staffData);
};
