import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AddLead.css";

function AddLead() {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    source: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!lead.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!lead.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(lead.email)) {
      newErrors.email = "Valid email required";
    }
    
    if (!lead.source.trim()) {
      newErrors.source = "Source is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/leads",
        lead
      );

      alert(res.data.message || "Lead added successfully!");

      setLead({
        name: "",
        email: "",
        source: "",
      });
      setErrors({});
    } catch (error) {
      alert("Error adding lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="crm-container">
      <div className="overlay">
        {/* Header OUTSIDE the card - at the very top */}
        <div className="top-header">
          <h1>Mini CRM</h1>
          <Link to="/login">
            <button className="login-btn">
              Admin Login
            </button>
          </Link>
        </div>

        {/* White card - ONLY contains the form */}
        <div className="lead-card">
          <h2>Add Lead</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={lead.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={lead.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">📍</span>
                <input
                  type="text"
                  name="source"
                  placeholder="Lead Source"
                  value={lead.source}
                  onChange={handleChange}
                  className={errors.source ? "error" : ""}
                  disabled={isSubmitting}
                />
              </div>
              {errors.source && <span className="error-message">{errors.source}</span>}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              Add Lead
            </button>
          </form>
          
          <div className="focus-plan">
            FOCUS PLAN SUCCESS
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLead;