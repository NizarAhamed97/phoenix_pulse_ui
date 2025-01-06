import React, { useState } from 'react';

const CustomForm = ({ title, fields, onSubmit }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} style={{ marginBottom: '10px' }}>
            <label>
              {field.label}:
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                style={{ marginLeft: '10px', padding: '5px' }}
              />
            </label>
          </div>
        ))}
        <button type="submit" style={{ padding: '5px 10px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomForm;
