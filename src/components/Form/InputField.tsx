import React from "react";
import OrbitInputField from "@kiwicom/orbit-components/lib/InputField";
import { getIn } from "formik";

const InputField = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <OrbitInputField
      {...field}
      {...props}
      onChange={(ev) => {
        field.onChange(ev);
        if (props.onChange) {
          props.onChange(ev);
        }
      }}
      onBlur={(ev) => {
        field.onBlur(ev);
        if (props.onBlur) {
          props.onBlur(ev, field);
        }
      }}
      error={
        getIn(touched, field.name) &&
        getIn(errors, field.name) &&
        getIn(errors, field.name)
      }
    />
  );
};

export default InputField;
