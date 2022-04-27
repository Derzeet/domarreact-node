import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "../calendar.css";


export default function () {
    return (
        <section>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                />
        </section>
    )

}