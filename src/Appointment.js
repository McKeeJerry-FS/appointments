import React from 'react';
export const Appointment = ({ customer }) => (
    <div>{customer.firstName}</div>
);

export const AppointmentsByDay = ({ appointments }) => (
    <div id="appointmentsDayView">
        <ol>
            {appointments.map((appointment, index) => (
                <li key={index}>{appointment.startsAt}</li>
            ))}
        </ol>
    </div>
);