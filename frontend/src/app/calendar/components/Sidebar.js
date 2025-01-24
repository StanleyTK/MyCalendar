"use client";

import {
  format,
  subMonths,
  addMonths,
  subYears,
  addYears,
  getDaysInMonth,
  startOfMonth,
  getDay,
} from "date-fns";

export default function Sidebar({
  currentMonth,
  setCurrentMonth,
  selectedDate,
  setSelectedDate,
}) {
  const handleMonthChange = (action) => {
    setCurrentMonth(
      action === "prev" ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1)
    );
  };

  const handleYearChange = (action) => {
    setCurrentMonth(
      action === "prev" ? subYears(currentMonth, 1) : addYears(currentMonth, 1)
    );
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  const firstDayOfMonth = getDay(startOfMonth(currentMonth));
  const daysInMonth = getDaysInMonth(currentMonth);

  return (
    <aside className="p-4 bg-gray-900 text-gray-300 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleYearChange("prev")}
          className="text-lg text-gray-400 hover:text-gray-200"
        >
          {"<<"}
        </button>
        <button
          onClick={() => handleMonthChange("prev")}
          className="text-lg text-gray-400 hover:text-gray-200"
        >
          {"<"}
        </button>
        <h2 className="text-xl font-bold tracking-wide">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={() => handleMonthChange("next")}
          className="text-lg text-gray-400 hover:text-gray-200"
        >
          {">"}
        </button>
        <button
          onClick={() => handleYearChange("next")}
          className="text-lg text-gray-400 hover:text-gray-200"
        >
          {">>"}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index} className="font-semibold text-gray-400 text-sm">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="invisible">
            x
          </div>
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            className={`p-2 w-10 h-10 rounded-md flex items-center justify-center text-sm transition-colors
              ${
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth.getMonth() &&
                selectedDate.getFullYear() === currentMonth.getFullYear()
                  ? "bg-blue-500 text-white font-bold"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </aside>
  );
}
