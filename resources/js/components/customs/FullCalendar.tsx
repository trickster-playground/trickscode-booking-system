import { EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

interface CalendarProps {
    height?: number;
}

const events = [{ title: 'Meeting', start: new Date() }];

export function Calendar({ height = 400 }: CalendarProps) {
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

// a custom render function
function renderEventContent(eventInfo: EventContentArg) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}
