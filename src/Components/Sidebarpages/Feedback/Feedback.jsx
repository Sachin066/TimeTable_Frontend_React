import React, { useState, useEffect } from "react";
import "../Lecture/Lecture.css"; // Add the stylesheet

const days = [
  "Time",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const times = [
  "9:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 1:00",
  "2:00 - 3:00",
  "3:00 - 4:00",
];

// Mock Data
const mockLectureData = [
  {
    time: "9:00 - 10:00",
    day: "Monday",
    subject: "Mathematics",
    professor: { name: "Dr. John Doe" },
    room: "Room 101",
  },
  {
    time: "10:00 - 11:00",
    day: "Tuesday",
    subject: "Physics",
    professor: { name: "Dr. Jane Smith" },
    room: "Room 102",
  },
  {
    time: "11:00 - 12:00",
    day: "Wednesday",
    subject: "Chemistry",
    professor: { name: "Dr. Alan Turing" },
    room: "Room 103",
  },
  // Add more mock data as needed
];

const Lecture = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null); // Track which lecture is expanded

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setData(mockLectureData); // Replace with mock data
      setLoading(false);
    }, 1000); // Simulate 1 second delay
  }, []);

  const handleToggle = (key) => {
    setExpanded(expanded === key ? null : key); // Toggle expansion
  };

  const renderAccordion = (time, day, rowIdx, colIdx) => {
    const lecture = data.find(
      (lecture) => lecture.time === time && lecture.day === day
    );
    const key = `${rowIdx}-${colIdx}`;

    return lecture ? (
      <div
        key={`accordion-${key}`}
        onClick={() => handleToggle(key)}
        className={`lecture-box ${expanded === key ? "expanded" : ""}`}
      >
        {/* Display the subject name */}
        <div className="subject-name">
          <strong>{lecture.subject}</strong>
        </div>

        {/* Conditionally display professor and room number when expanded */}
        {expanded === key && (
          <div className="lecture-details">
            <div>{`Professor: ${lecture.professor.name}`}</div>
            <div>{`Room: ${lecture.room}`}</div>
          </div>
        )}
      </div>
    ) : (
      <div key={`empty-${key}`} className="no-lecture">
        No Lecture
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="timetable-grid">
      {/* First row with day names */}
      {days.map((day, idx) => (
        <div key={`day-${idx}`} className="header-cell">
          {day}
        </div>
      ))}

      {/* Timetable rows */}
      {times.map((time, rowIdx) => (
        <React.Fragment key={`row-${rowIdx}`}>
          {/* Time column */}
          <div key={`time-${rowIdx}`} className="time-cell">
            {time}
          </div>
          {/* Lecture columns with accordion-like dropdowns */}
          {days.slice(1).map((day, colIdx) => (
            <div key={`lecture-${rowIdx}-${colIdx}`} className="lecture-cell">
              {renderAccordion(time, day, rowIdx, colIdx)}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Lecture;
