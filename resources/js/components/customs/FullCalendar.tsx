import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventContentArg } from '@fullcalendar/core';

interface CalendarProps {
  height?: number;
  events: { id: string; title: string; start: string; end: string }[];
}

export function Calendar({ height = 400, events }: CalendarProps) {
  return (
    <div className="p-8">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        height={height}
        contentHeight={500}
        eventContent={renderEventContent}
        headerToolbar={{
          start: 'prev',
          center: 'title',
          end: 'today next',
        }}
      />
    </div>
  );
}

//Menampilkan event di kalender
function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div className="text-center">
      <b>{eventInfo.timeText}</b>
      <span className="ml-1">{`${eventInfo.event.title}`}</span>
    </div>
  );
}
