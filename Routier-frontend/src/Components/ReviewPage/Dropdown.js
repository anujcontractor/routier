import "./Dropdown.css";
import { useState } from "react";

function Dropdown() {
    const [selectedDate, setSelectedDate] = useState('');
  
    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };

  return (
    <div className='dropdown'>
        <div>
      <label htmlFor="datePicker">Select a Date:</label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
    </div>
  );

}

export default Dropdown;
