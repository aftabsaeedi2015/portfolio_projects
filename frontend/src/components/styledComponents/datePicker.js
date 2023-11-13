import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
function MyDatePicker() {
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select a date"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }

  export default MyDatePicker;
