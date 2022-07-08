import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function FormError(props) {
  const { errors } = props;

  const renderErrors = () => {
    return Object.keys(errors).map((val, key) => {
      return (
        <Alert key={key} severity="error">
          {errors[val]}
        </Alert>
      );
    });
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {renderErrors()}
    </Stack>
  );
}

export default FormError;
