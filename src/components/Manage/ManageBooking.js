
import React from 'react';
import { CSVLink } from "react-csv";
import ResultTableBooking from '../content/ResultTableBooking';

const ManageBooking = () => {
    return (
        <div className="container-fluid mt-2">
            <div className="content">
                <ResultTableBooking />
            </div>
        </div>
    )
}

export default ManageBooking
