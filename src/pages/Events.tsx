// src/pages/Events.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import Holidays from 'date-holidays';

export default function Events() {
  const [events, setEvents] = useState<{ title: string; start: string }[]>([]);

  useEffect(() => {
    const hd = new Holidays('US');
    const year = new Date().getFullYear();
    const holidays = hd.getHolidays(year);
    const calendarEvents = holidays.map((h) => ({
      title: h.name,
      start: h.date, // already in YYYY-MM-DD format
      allDay: true,
    }));
    setEvents(calendarEvents);
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      height="auto"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      }}
    />
  );
}
