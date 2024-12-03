import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AlbumTab() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div style={{ marginBottom: '20px' }}>
            <h3>Select Date Range</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <label>Start Date: </label>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
                <div>
                    <label>End Date: </label>
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
            </div>
        </div>
    );
}