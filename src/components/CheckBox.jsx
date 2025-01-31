import React from "react";

const Checkbox = ({
  name,
  label,
  disabled = false,
  value = false,    // controls the checked state
  onChange,         // callback for checked changes
  className = "",
  description,
  error,
  ...props
}) => {
  const id = props.id || name;

  return (
    <div className={`form-check ${className}`}>
      {/* The Bootstrap checkbox input */}
      <input
        type="checkbox"
        className={`form-check-input ${error ? 'is-invalid' : ''}`}
        id={id}
        name={name}
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        {...props}
      />

      {/* Bootstrap label */}
      <label
        className="form-check-label"
        htmlFor={id}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
        {label}
      </label>

      {/* Optional descriptive text below the checkbox */}
      {description && (
        <small className="text-muted d-block">
          {description}
        </small>
      )}

      {/* Error text in Bootstrap's invalid-feedback style */}
      {error && (
        <div className="invalid-feedback" style={{ display: "block" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
