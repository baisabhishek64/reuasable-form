import { useState } from "react";
import "./UserForm.css";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  country: "",
  city: "",
  password: "",
  confirmPassword: "",
};

export default function UserForm() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      ...(name === "password" ? { confirmPassword: "" } : {}),
    }));

    setSubmitted(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!/^\+?[0-9\s()-]{7,20}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number";

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    else if (formData.dateOfBirth > new Date().toLocaleDateString("en-CA"))
      newErrors.dateOfBirth = "Date of birth cannot be in the future";

    if (!formData.gender) newErrors.gender = "Please select a gender";

    if (!formData.country) newErrors.country = "Please select a country";

    if (!formData.city.trim()) newErrors.city = "City is required";

    if (formData.password.length < 8)
      newErrors.password = "Password must contain at least 8 characters";

    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);

      // Replace with your API request.
      console.log("Form submitted:", {
        ...formData,
        password: "[REDACTED]",
        confirmPassword: "[REDACTED]",
      });
    }
  };

  const renderError = (field) =>
    errors[field] ? (
      <span className="field-error" role="alert">
        {errors[field]}
      </span>
    ) : null;

  return (
    <div className="form-page">
      <form className="user-form" onSubmit={handleSubmit} noValidate>
        <div className="form-header">
          <h1>Create Account</h1>
          <p>Fill in your details to get started.</p>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
            />
            {renderError("firstName")}
          </div>

          <div className="form-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
            />
            {renderError("lastName")}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
            />
            {renderError("email")}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
            />
            {renderError("phone")}
          </div>

          <div className="form-field">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              max={new Date().toLocaleDateString("en-CA")}
              value={formData.dateOfBirth}
              onChange={handleChange}
              aria-invalid={!!errors.dateOfBirth}
            />
            {renderError("dateOfBirth")}
          </div>

          <div className="form-field">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              aria-invalid={!!errors.gender}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {renderError("gender")}
          </div>

          <div className="form-field">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              aria-invalid={!!errors.country}
            >
              <option value="">Select country</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            {renderError("country")}
          </div>

          <div className="form-field">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              autoComplete="address-level2"
              aria-invalid={!!errors.city}
            />
            {renderError("city")}
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
            />
            {renderError("password")}
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
            />
            {renderError("confirmPassword")}
          </div>
        </div>

        {submitted && (
          <p className="success-message" role="status">
            Form submitted successfully!
          </p>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="reset-button"
            onClick={() => {
              setFormData(initialValues);
              setErrors({});
              setSubmitted(false);
            }}
          >
            Reset
          </button>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
