import React from "react";
import { useField } from "formik";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../lib/utils";

/**
 * A Radix Switch integrated with Formik, styled via Bootstrap utilities.
 */
const SwitchFormik = React.forwardRef(({ label, className, ...props }, ref) => {
  const [field, meta, helpers] = useField(props);

  // Toggle the boolean value in Formik
  const handleChange = () => {
    helpers.setValue(!field.value);
  };

  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <SwitchPrimitives.Root
        id={props.id || props.name}
        checked={!!field.value}
        onCheckedChange={handleChange}
        ref={ref}
        // Merge any custom classes with our Bootstrap-based classes
        className={cn(
          "d-inline-flex align-items-center position-relative rounded-pill",
          // Toggle background color based on checked state
          field.value ? "bg-primary" : "bg-secondary",
          className
        )}
        // A bit of inline styling to define size/shape
        style={{
          width: "2.5rem",
          height: "1.25rem",
          border: "none", // Remove default border
          cursor: "pointer",
        }}
        {...props}
      >
        <SwitchPrimitives.Thumb
          className="rounded-circle bg-white position-absolute"
          style={{
            width: "1rem",
            height: "1rem",
            left: field.value ? "calc(100% - 1.2rem)" : "0.25rem",
            transition: "left 0.2s",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        />
      </SwitchPrimitives.Root>

      {label && (
        <label htmlFor={props.id || props.name} className="ms-2">
          {label}
        </label>
      )}

      {/* Show any Formik validation error */}
      {meta.touched && meta.error && (
        <div className="text-danger small ms-2">{meta.error}</div>
      )}
    </div>
  );
});

SwitchFormik.displayName = "SwitchFormik";

export { SwitchFormik as Switch };
