// src/pages/Events.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';

// You'll need a US holidays iCal URL, e.g., Google Calendar's:
const US_HOLIDAYS_ICAL = 'https://calendar.google.com/calendar/ical/.../public/basic.ics';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(US_HOLIDAYS_ICAL)
      .then(res => res.text())
      .then(ics => {
        const parsed = parseICS(ics); // you'll need an ics parser
        setEvents(parsed);
      });
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={info => alert(info.dateStr)}
    />
  );
}
