import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance.js";

const validate = (values) => {
  const errors = {};
  if (!values.destination) {
    errors.destination = "Destination is required";
  }
  return errors;
};

const Main = () => {
  const [destinations, setDestinations] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/destination")
      .then((response) => setDestinations(response.data))
      .catch((error) => console.error("Error fetching destinations:", error));
  }, []);

  const onSubmit = async (values) => {
    try {
      setErrorMessage(null);
      const response = await axiosInstance.get("/hotels", {
        params: { city: values.destination },
      });

      if (response.status === 200) {
        navigate("/hotels", { state: { hotels: response.data } });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("No hotels found for the selected destination");
      } else {
        console.error("Error submitting form:", error);
        setErrorMessage(
          "An error occurred while fetching hotels. Please try again"
        );
      }
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {errorMessage && (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", width: "100%", color: "red" }}
        >
          {errorMessage}
        </Typography>
      )}
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field name="destination">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      select
                      label="Destination"
                      fullWidth
                      required
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    >
                      {destinations.map((dest) => (
                        <MenuItem key={dest.id} value={dest.label}>
                          {dest.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="checkIn">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      type="date"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="checkOut">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      type="date"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Field name="adults">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Adults"
                      type="number"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Field name="children">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Children"
                      type="number"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={submitting || pristine}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </Container>
  );
};

export default Main;
