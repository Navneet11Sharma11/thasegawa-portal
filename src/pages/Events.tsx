// src/pages/Events.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import Holidays from 'date-holidays';
import { useTheme } from '../context/ThemeContext';
import './Events.scss';

export default function Events() {
  const { theme } = useTheme(); // Get current theme
  const [events, setEvents] = useState<{ title: string; start: string }[]>([]);

  useEffect(() => {
    const hd = new Holidays('US');
    const year = new Date().getFullYear();
    const holidays = hd.getHolidays(year);
    const calendarEvents = holidays.map((h) => ({
      title: h.name,
      start: h.date, // already in YYYY-MM-DD format
      allDay: true,
      className: 'fc-holiday-event',
    }));
    setEvents(calendarEvents);
  }, []);

  // Custom render for events (holidays)
  function renderEventContent(eventInfo: any) {
    const iconMap: Record<string, string> = {
      "New Year's Day": '🎆',
      "Martin Luther King Jr. Day": '🧑🏾‍⚖️',
      "Presidents' Day": '🇺🇸',
      "Memorial Day": '🪖',
      "Independence Day": '🎇',
      "Labor Day": '⚒️',
      "Columbus Day": '🧭',
      "Veterans Day": '🪖',
      "Thanksgiving Day": '🦃',
      "Day after Thanksgiving Day": '🦃',
      "Christmas Day": '🎄',
      "Halloween": '🎃',
    };
    const icon = iconMap[eventInfo.event.title] || '🎉';

    // No extra div or style, just the content
    return (
      <span>
        {icon} {eventInfo.event.title}
      </span>
    );
  }

  function dayCellClassNames(arg: any) {
    // Check if this date has a holiday event
    const isHoliday = events.some(ev => ev.start === arg.dateStr);
    return isHoliday ? ['fc-holiday-cell'] : [];
  }

  const calendarBg = theme === 'dark' ? '#181818' : '#f6faff';
  const calendarText = theme === 'dark' ? '#fff' : '#213547';

  return (
    <div
      style={{
        background: calendarBg,
        color: calendarText,
        padding: 24,
        borderRadius: 12,
        transition: 'background 0.3s, color 0.3s',
        height: '80vh',
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        dayCellClassNames={dayCellClassNames}
        eventDisplay="block" // <-- Add this line
        height="100%"
        dayCellDidMount={(arg) => {
          const hasHoliday = arg.el.querySelector('.fc-holiday-event');

          if (hasHoliday) {
            const frame = arg.el.querySelector('.fc-daygrid-day-frame');
            frame?.classList.add('fc-holiday-frame'); // Apply custom background class
          }
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridYear',
        }}
        buttonText={{
          today: 'Today',
          month: 'Month',
          year: 'Year',
        }}
        views={{
          dayGridYear: {
            type: 'dayGrid',
            duration: { years: 1 },
            buttonText: 'Year',
          },
        }}
        dayMaxEventRows={2}
        fixedWeekCount={false}
        aspectRatio={1.4}
      />
    </div>
  );
}
