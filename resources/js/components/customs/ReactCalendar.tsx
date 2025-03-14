import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ReactCalendar() {
    const [date, setDate] = useState<Date | null>(null);

    return (
        <div className="p-4">
            <Calendar
                onChange={(selectedDate) => setDate(selectedDate as Date)}
                value={date}
                minDate={new Date()} 
            />
            {date && (
                <p className="mt-4 text-center">
                    Tanggal dipilih: <strong>{date.toLocaleDateString()}</strong>
                </p>
            )}
        </div>
    );
}
