import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppointmentsByDay } from './Appointment';
import { sampleAppointments } from './sampleData';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AppointmentsByDay appointments={sampleAppointments} />
);