import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContestDates } from "../actions/contest";
import { TextField, Button, Grid } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Alert from '@mui/material/Alert';

const ContestDatesForm = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((state) => state.contest);
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setNewStartDate(startDate);
    setNewEndDate(endDate);
  }, [startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setContestDates(newStartDate,newEndDate));
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {showAlert && (
        <Alert severity="success" onClose={handleCloseAlert}>
          Contest dates set to {newStartDate.toLocaleString()} - {newEndDate.toLocaleString()}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="Start Date & Time"
              value={newStartDate}
              onChange={(date) => setNewStartDate(date)}
              ampm
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="End Date & Time"
              value={newEndDate}
              onChange={(date) => setNewEndDate(date)}
              ampm
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Set Contest Dates
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default ContestDatesForm;
