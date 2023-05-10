import React, { useState, useEffect } from 'react';

function AppointmentDoctorTable({doctorName}) {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        {/* fetch the apppointments assigned with specified doctorName */}
        fetch(`/api/appointments?doctor=${doctorName}`)
        .then(response => response.json())
        .then(data => setAppointments(data))
        .catch(error => console.error(error));
    }, [doctorName]);


    // view notes
    const handleNotes = (appointmentNumber) => {
        fetch(`/api/appointments/${appointmentNumber}/notes`)
        .then(response => response.json())
        .then(data => {
            console.log(`Notes for appointment ${appointmentNumber}: ${data.notes}`);
        })
        .catch(error => console.error(error));
    };
  
    return (
        <table className="govuk-table">
            <thead className="govuk-table__head">
                <tr class="govuk-table__row">
                    <th scope="col" className="govuk-table__header">Appointment Number</th>
                    <th scope="col" className="govuk-table__header">Date</th>
                    <th scope="col" className="govuk-table__header">Time</th>
                    <th scope="col" className="govuk-table__header">Patient</th>
                    <th scope="col" className="govuk-table__header">Doctor</th>
                </tr>
            </thead>
            <tbody className="govuk-table__body">
                {/* it takes information from the array to display in the table */}
                {appointments.map(appointment =>(
                    // 'key' is taking everything from the specific appointmentNumber*
                    <tr className="govuk-table__row" key={appointment.appointmentNumber}>
                        <td className="govuk-table__cell">{appointment.appointmentNumber}</td>
                        <td className="govuk-table__cell">{appointment.date}</td>
                        <td className="govuk-table__cell">{appointment.time}</td>
                        <td className="govuk-table__cell">{appointment.patientName}</td>
                        <td className="govuk-table__cell">{appointment.doctorName}</td>
                        <td className="govuk-table__cell">
                            {/* when clicked the appointment notes for that appointmentNumber will display */}
                            <button className="govuk-button" onClick={() => handleNotes(appointment.appointmentNumber)}>View Notes</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default AppointmentDoctorTable;