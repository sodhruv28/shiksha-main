import React, { useState } from 'react';

function DateField() {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <label htmlFor="date">Select a date:</label>
      <input 
        type="date" 
        id="date" 
        name="date" 
        value={selectedDate} 
        onChange={handleDateChange} 
      />
      {selectedDate && <p>Selected Date: {selectedDate}</p>}
    </div>
  );
}

export default DateField;
